const inquirer = require('inquirer');
require('colors');
const fs = require('fs');

//Iquierer menu
const {
    yesNoMenu
} = require('../inquirer');

class Ctp {
    _options = {
        name: '',
        singularName: '',
        single: true,
        icon: '',
        hasArchive: true,
        public: true,
        publiclyQueryable: true

    };
    _cptTemplate = '';
    _singleTemplate = '';
    _sassPath = './assets/scss/single/';
    _phpPath = './';
    _templatePath = './file_creator/templates/cpt/';

    async init() {
        //Get cpt data
        await this.getOptions();
        //Build CPT template
        await this.createCptTemplate();
        //Add CPT to inc/optional/custom-post-types.php
        await this.addCpt();
        //add Single if it is nedded
        if(this._options['single']){
            await this.createSingleTemplate();
            await this.addSingle();
        }
    }

    async getOptions() {
        let options = {
            name: await this.question('Please enter the name of the Custom Post Type'),
            singularName: await this.question('Please enter the name in singular'),
            single: await this.booleanQuestion('Do you need it to have a single page?'),
            icon: await this.question('Select the dashicon you prefer and paste your shortcode\nYou can search for them at https://developer.wordpress.org/resource/dashicons'),
            hasArchive: await this.booleanQuestion('Has Archive?'),
            public: await this.booleanQuestion('Its public?'),
            publiclyQueryable: await this.booleanQuestion('Its publicly queryable?')
        };

        //Get lowercase
        Object.keys(options).forEach(option => {
            if (typeof (options[option]) == 'string') {
                options[option] = options[option].toLowerCase();
            }
        });

        this._options = options;

        return options;
    }

    async question(ask) {
        return new Promise(resolve => {
            console.clear();
            console.log('====================================='.green);
            console.log(ask.green);
            console.log('=====================================\n'.green);

            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readline.question('Enter data: ', (data) => {
                readline.close();
                resolve(data);
            });
        })
    }

    async booleanQuestion(ask) {
        console.clear();
        console.log('====================================='.green);
        console.log(ask.green);
        console.log('=====================================\n'.green);
        const data = await yesNoMenu();

        return data;
    }

    async templateFinder(type, extension) {
        return new Promise(resolve => {
            fs.readFile(this._templatePath + `${type}.${extension}`, 'utf8', function (err, data) {
                resolve(data);
            });
        })
    }

    async createCptTemplate() {
        //Custom Post Type Structure
        const template = await this.templateFinder('cpt', 'txt');

        //Replace values
        //Name
        const search = 'CPT-NAME';
        const replacer = new RegExp(search, 'g');

        let modifyTemplate = template.replace(replacer, this._options['name'].charAt(0).toUpperCase() + this._options['name'].slice(1))
            .replace('CPT-TAG', this._options['name'].split(' ').join('_'))
            .replace('CPT-SINGULARNAME', this._options['singularName'].charAt(0).toUpperCase() + this._options['singularName'].slice(1))
            .replace('CPT-ARCHIVE', this._options['hasArchive'])
            .replace('CPT-PUBLIC', this._options['public'])
            .replace('CPT-ICON', this._options['icon'])
            .replace('CPT-PUBLICITY', this._options['publiclyQueryable']);

        this._cptTemplate = modifyTemplate;

        return modifyTemplate;
    }

    async addCpt() {
        return new Promise(resolve => {
            console.clear();

            //Find and write over line 3
            const data = fs.readFileSync('./inc/optional/custom-post-types.php').toString().split("\n");
            data.splice(3, 0, this._cptTemplate);
            const text = data.join("\n");
            const name = this._options['name'].charAt(0).toUpperCase() + this._options['name'].slice(1);
            fs.writeFile('./inc/optional/custom-post-types.php', text, function (err, res) {
                if (err) throw err;
                console.log(`Custom Post Type ${name} has been created!`.green);
                resolve(res)
            });
        })
    }

    async createSingleTemplate() {
        //Custom Single Structure
        const template = await this.templateFinder('single', 'php');

        //Replace values
        //Name
        const search = 'CPT-NAME';
        const replacer = new RegExp(search, 'g');

        let modifyTemplate = template.replace(replacer, this._options['name'].charAt(0).toUpperCase() + this._options['name'].slice(1))
            .replace('CPT-CLASSNAME', this._options['name'].split(' ').join('-'))

        this._singleTemplate = modifyTemplate;

        return modifyTemplate;
    }

    async addSingle() {
        const name = this._options['name'];

        return new Promise(resolve=>{
            fs.appendFile(`./single-${name}.php`, this._singleTemplate, function (err, res) {
                if (err) throw err;
                console.log(`Single page for ${name.charAt(0).toUpperCase() + name.slice(1)} has been created!`.green);
                resolve(res)
            });
        })
    }

}

module.exports = Ctp;