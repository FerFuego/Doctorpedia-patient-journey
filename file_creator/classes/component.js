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

class Component {
    _name = '';
    _option = '';
    _sassPath = './assets/scss/components/';
    _phpPath = './template-parts/components/';
    _acfPath = './acf-json/';
    _phpTemplatePath = './file_creator/templates/components/php/';
    _sassTemplatePath = './file_creator/templates/components/scss/';
    _acfTemplatePath = './templates/components/acf/'

    async init() {
        //Check available templates in templates/php folder.
        const components = await this.componentsAvailables();
        //Component Selector
        await this.typeOfComponent(components);

        if (this._option != 0) {
            //Component Name
            await this.componentName();
            //File creator
            await this.buildComponent();
        }
    }

    async componentsAvailables() {
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
                })

                resolve(choices)
            });
        })
    }

    async typeOfComponent(choices) {
        const componentOptions = [{
            type: 'list',
            name: 'option',
            message: 'Select an option',
            choices: choices
        }];

        console.log('Select which component you want\n'.green);
        this._option = await inquirer.prompt(componentOptions);
        this._option = this._option.option;
        console.clear();
    }

    async componentName() {
        if (this._option == 'empty') {
            return await this.setName()
        } else {
            console.log(`Do you want to rename this "${this._option.green}" component?\n`);
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

            readline.question('Enter the name of the component: ', (name) => {
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

    async buildComponent() {
        console.clear();
        if(await this.phpBuldier() != false){
            await this.acfBuldier();
        }
        await this.sassBuldier();
    }

    async phpBuldier() {
        //Template name remplace
        const template = await this.templateFinder(this._phpTemplatePath, 'php');
        const name = capitalize(replacerSmall(this._name, '_', ' '));
        const className = replacerSmall(this._name, '_', '-');
        const modifytemplate = replacerBig(template, `${replacerSmall(this._option, '_', '-')}`, className);

        //Final path
        const path = this._phpPath + 'component-' + this._name + '.php';

        //Verify if file exist
        if (!fs.existsSync(path)) {
            return new Promise(resolve => {
                fs.appendFile(path, modifytemplate, function (err, res) {
                    if (err) throw err;
                    console.log(`Component "${name}" has been created! (php file)`.green);
                    resolve(res);
                });
            })
        } else {
            console.log('This php file already exists, please try again with another name.'.red)
            return false;
        }
    }

    async sassBuldier() {
        //Template name remplace
        let template = await this.templateFinder(this._sassTemplatePath, 'scss');
        let search = `c-${replacerSmall(this._option, '_', '-')}`;
        let replacer = new RegExp(search, 'g');

        //if template component no has scss file
        if (!template) {
            template = await this.templateFinder(this._sassTemplatePath, 'scss', true);
            search = `c-empty`;
            replacer = new RegExp(search, 'g');
        }

        const path = this._sassPath + '_' + this._name + '.scss';
        const importPath = this._sassPath + '_all.scss';
        const name = replacerSmall(capitalize(this._name), '_', ' ');
        if (!fs.existsSync(path)) {
            return new Promise(resolve => {
                fs.appendFile(path, template.replace(replacer, `c-${replacerSmall(this._name, '_', '-')}`), function (err, res) {
                    if (err) throw err;
                    console.log(`Component "${name}" has been created! (sass file)`.green);
                    resolve(res);
                });

                fs.appendFile(importPath, `\n@import '${this._name}';`, function (err) {
                    if (err) throw err;
                });
            });
        } else {
            console.log('This sass file already exists, please try again with another name.'.red)
            return false;
        }
    }

    async acfBuldier() {
        return new Promise(resolve=>{
            //Set template
            let template =requireAcf(this._acfTemplatePath + this._option + '.json')

            if(template != false){
                const randomHex = randHex();
                template['title'] = `Component: ${capitalize(replacerSmall(this._name, '_', ' '))}`;
                template['key'] = `group_${replacerSmall(this._name, '_', '') + randomHex}`;
        
                //Save ACF
                const name = capitalize(replacerSmall(this._name, '_', ' '))
                const finalPath = `${this._acfPath}group_${replacerSmall(this._name, '_', '') + randomHex}.json`;
                fs.writeFile(finalPath, JSON.stringify(template), (err, res) => {
                    if (err) {
                        return (err);
                    }
                    console.log(`Component "${name}" has been created! (acf file)`.green);
                    resolve(res)
                });
            }else{
                resolve(true)
            }
        })

    }

}

module.exports = Component;