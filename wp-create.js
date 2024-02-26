require('colors');
const {
    inquirerMenu,
    yesNoMenu
} = require('./file_creator/inquirer');

//Classes
const Module = require('./file_creator/classes/module');
const Component = require('./file_creator/classes/component');
const Cpt = require('./file_creator/classes/cpt');

console.clear();

const main = async () => {
    //Select type of element
    let opt='';
    let pause = true;
    
    do{
        opt = await inquirerMenu();

        switch (opt) {
            case 'module':
                //Select type of module
                console.clear();
                const module = new Module;
                await module.init();
                break;
            case 'component':
                console.clear();
                const componet = new Component;
                await componet.init();
                break;
            case 'cpt':
                console.clear()
                const cpt = new Cpt;
                await cpt.init();
                break;
            case 0:
                console.clear();
                console.log('Bye!'.yellow);
                break;
            default:
                console.clear();
                console.log('Bye!'.yellow);
                break;
        }

        if(opt != 0){
            console.log('\nBack to main menu?'.yellow)
            pause = await yesNoMenu();
            console.clear()

            if(pause == false){
                console.log('Bye'.yellow);
            }
        }

    }while(opt != 0 && pause == true)
}

main();