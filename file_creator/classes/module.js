const inquirer = require('inquirer');
require('colors');
const fs = require('fs');

//Iquierer menu
const {
    yesNoMenu
} = require('../inquirer');

//Usefull Functions
const {
    capitalize,
    replacerSmall,
    replacerBig,
    randHex,
    requireAcf
} = require('../usefull');

class Module {
    _name = '';
    _option = '';
    _sassPath = './assets/scss/modules/';
    _phpPath = './template-parts/modules/';
    _jsPath = './assets/js/modules/';
    _acfPath = './acf-json/';
    _phpTemplatePath = './file_creator/templates/modules/php/';
    _sassTemplatePath = './file_creator/templates/modules/scss/';
    _jsTemplatePath = './file_creator/templates/modules/js/';
    _acfTemplatePath = './templates/modules/acf/'

    async init() {
        //Check available templates in templates/php folder.
        const modules = await this.modulesAvailables();
        //Module Selector
        await this.typeOfModule(modules);
        if (this._option != 0) {
            //Module Name
            await this.moduleName();
            //File creator
            await this.buildModule();
        }
    }

    async modulesAvailables() {
        let choices = [{
            value: 'empty',
            name: '0. Empty'
        }];
        return new Promise(resolve => {
            fs.readdir(this._phpTemplatePath, function (err, files) {
                //handling error
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
                //listing all files using forEach
                let conter = 1;
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    if (file.replace('.php', '') != 'empty') {
                        let name = replacerSmall(file.replace('.php', ''), '_', ' ');
                        choices.push({
                            value: file.replace('.php', ''),
                            name: `${conter}. ${capitalize(name)}`
                        })
                    }
                    conter++;
                });

                //Go back option
                choices.push({
                    value: 0,
                    name: 'Exit'.brightMagenta
                });

                resolve(choices)
            });
        })
    }

    async typeOfModule(choices) {
        const moduleOptions = [{
            type: 'list',
            name: 'option',
            message: 'Select an option',
            choices: choices
        }];

        console.log('Select which module you want\n'.green);
        this._option = await inquirer.prompt(moduleOptions);
        this._option = this._option.option;
        console.clear();
    }

    async moduleName() {
        if (this._option == 'empty') {
            return await this.setName()
        } else {
            let optionName = replacerSmall(this._option, '_', ' ');
            optionName = capitalize(optionName);
            console.log(`Do you want to rename this "${optionName.green}" module?\n`);
            const opt = await yesNoMenu();
            if (opt) {
                return await this.setName()
            } else {
                this._name = this._option;
            }
        }
    }

    async setName() {
        return new Promise(resolve => {
            console.clear();
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readline.question('Enter the name of the module: ', (name) => {
                const theName = replacerSmall(name.toLowerCase(), ' ', '_');
                readline.close();
                resolve(this._name = theName);
            });
        });
    }

    async templateFinder(path, extension, empty = false) {
        if (!empty) {
            return new Promise(resolve => {
                fs.readFile(path + `${this._option}.${extension}`, 'utf8', function (err, data) {
                    resolve(data);
                });
            })
        } else {
            return new Promise(resolve => {
                fs.readFile(path + `empty.${extension}`, 'utf8', function (err, data) {
                    resolve(data);
                });
            })
        }
    }

    async buildModule() {
        console.clear();
        if (await this.phpBuldier() != false) {
            await this.acfBuldier();
        }
        await this.sassBuldier();
        await this.jsBuldier();
    }

    async phpBuldier() {
        //Template name remplace
        const template = await this.templateFinder(this._phpTemplatePath, 'php');
        const name = capitalize(replacerSmall(this._name, '_', ' '));
        const className = replacerSmall(this._name, '_', '-');
        const modifytemplate = replacerBig(template, `${replacerSmall(this._option, '_', '-')}`, className);

        //Final path
        const path = this._phpPath + 'module-' + this._name + '.php';

        //Verify if file exist
        if (!fs.existsSync(path)) {
            return new Promise(resolve => {
                fs.appendFile(path, modifytemplate, function (err, res) {
                    if (err) throw err;
                    console.log(`Module "${name}" has been created! (php file)`.green);
                    resolve(res);
                });
            })
        } else {
            console.log('This php file already exists, please try again with another name.'.red);
            return false;
        }
    }

    async sassBuldier() {
        //Template name remplace
        let template = await this.templateFinder(this._sassTemplatePath, 'scss');
        let search = `m-${replacerSmall(this._option, '_', '-')}`;
        let replacer = new RegExp(search, 'g');

        //if template modulo no has scss file
        if (!template) {
            template = await this.templateFinder(this._sassTemplatePath, 'scss', true);
            search = `m-empty`;
            replacer = new RegExp(search, 'g');
        }

        const path = this._sassPath + '_' + this._name + '.scss';
        const importPath = this._sassPath + '_all.scss';
        const name = replacerSmall(capitalize(this._name), '_', ' ');
        if (!fs.existsSync(path)) {
            return new Promise(resolve => {
                fs.appendFile(path, template.replace(replacer, `m-${replacerSmall(this._name, '_', '-')}`), function (err, res) {
                    if (err) throw err;
                    console.log(`Module "${name}" has been created! (sass file)`.green);
                    resolve(res);
                });

                fs.appendFile(importPath, `\n@import '${this._name}';`, function (err) {
                    if (err) throw err;
                });
            });
        } else {
            console.log('This sass file already exists, please try again with another name.'.red);
            return false;
        }
    }

    async jsBuldier() {
        //Template name remplace
        const template = await this.templateFinder(this._jsTemplatePath, 'js');
        const name = capitalize(replacerSmall(this._name, '_', ' '));
        const className = replacerSmall(this._name, '_', '-');
        const modifytemplate = replacerBig(template, `${replacerSmall(this._option, '_', '-')}`, className);

        //Final path
        const path = this._jsPath + this._name + '.js';

        if (fs.existsSync(this._jsTemplatePath + this._option + '.js')) {

            //Verify if file exist
            if (!fs.existsSync(path)) {
                return new Promise(resolve => {
                    fs.appendFile(path, modifytemplate, function (err, res) {
                        if (err) throw err;
                        console.log(`Module "${name}" has been created! (js file)`.green);
                        resolve(res);
                    });
                })
            } else {
                console.log('This php file already exists, please try again with another name.'.red)
            }
        }

    }

    async acfBuldier() {
        return new Promise(resolve => {
            //Set template
            let template = requireAcf(this._acfTemplatePath + this._option + '.json');
            if (template != false) {
                const randomHex = randHex();
                template['title'] = `Module: ${capitalize(replacerSmall(this._name, '_', ' '))}`;
                template['key'] = `group_${replacerSmall(this._name, '_', '') + randomHex}`;

                //Save ACF
                const name = capitalize(replacerSmall(this._name, '_', ' '))
                const finalPath = `${this._acfPath}group_${replacerSmall(this._name, '_', '') + randomHex}.json`;
                fs.writeFile(finalPath, JSON.stringify(template), (err, res) => {
                    if (err) {
                        return (err);
                    }
                    console.log(`Module "${name}" has been created! (acf file)`.green);
                    resolve(res)
                });
            }else{
                resolve(true)
            }
        })


    }

}

module.exports = Module;