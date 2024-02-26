//Dependences
const inquirer = require('inquirer');
require('colors');

//******************************************************************** */
//General menu options
//******************************************************************** */
const questions = [{
    type: 'list',
    name: 'option',
    message: 'Select an option',
    choices: [{
            value: 'module',
            name: '1. Module'
        },
        {
            value: 'component',
            name: '2. Component'
        },
        {
            value: 'cpt',
            name: '3. Custom Post Type'
        },
        {
            value: '0',
            name: 'Exit'
        }
    ]
}]

//General menu generator
const inquirerMenu = async () => {
    console.clear();
    console.log('====================================='.green);
    console.log('Welcome to wordpress file generator!'.green);
    console.log('=====================================\n'.green);

    const {
        option
    } = await inquirer.prompt(questions);

    return option;
}


//******************************************************************** */
//Yes/No Menu
//******************************************************************** */
const yesNo = [{
    type: 'list',
    name: 'option',
    message: 'Select an option',
    choices: [{
            value: true,
            name: 'Yes'
        },
        {
            value: false,
            name: 'No'
        },
    ]
}]

//Yes/No menu generator
const yesNoMenu = async () => {
    const {
        option
    } = await inquirer.prompt(yesNo);

    return option;
}


module.exports = {
    inquirerMenu,
    yesNoMenu
}