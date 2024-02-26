const moduleCaller = (modules) => {
    //JSON
    modules.forEach(module => {
        const modulesDom = document.querySelectorAll(module.domModule);
        //EACH of json
        modulesDom.forEach(singleModule => {
            const classInstance = new module.classModule(singleModule);
            classInstance.init();
        })
    });
}

export default moduleCaller;