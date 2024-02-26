Doctorpedia
===

This is a boilerplate starter theme for White Canvas Wordpress projects SPA.  It is not meant to be used as is, but as a starting point for custom themes
for each client.  There are several pre defined modules available after installation and an ACF sync.  This theme was originally based off of [underscores](https://underscores.me).

* Module starting point and examples - ACF fields, html template, SASS, Webpack, Barba JS.
* Commonly needed third party scripts - [Barba JS](https://barba.js.org/), [Waypoints](http://imakewebthings.com/waypoints/), [Anime JS](https://animejs.com/), [Slick](https://kenwheeler.github.io/slick/)
* Organized SASS and JS files to quickly get started with custom designs


Theme Name
---------------

Clone from gitlab. Copy the theme or upload it through WP in your local environment and then rename the folder to the project name.
Then it is recommended to find/replace particular strings within the theme to make it client specific.  It is important to make sure you are matching on case.

1. Search for: `doctorpedia` and replace with: `custom-theme-name`.  This should catch text domain and filter/actions
2. Search for: `doctorpedia_` and replace with: `custom_theme_name_`.  This should catch all function declarations
3. Search for: `Doctorpedia` and replace with: `CustomThemeName`.  This should catch all class declarations.
4. Search for: `DOCTORPEDIA` and replace with: `CUSTOM_THEME_NAME`.  This should catch all constants.
5. Search for: `Doctorpedia` and replace with: `Custom Theme Name`.  This should catch all strings and titles.
6. Rename any files that have Doctorpedia in the name.  Languages/doctorpedia.pot.

After the optional renaming, these steps will get the theme ready for you to start developing.

# Getting started

## Dev Enviroment

1. Go into the theme directory and run `npm install` (Make sure to have node.js).
2. Setup your local proxy to use browser sync, copy and plaste the file `.env-webpack` and rename it as `.env`, inside this file change `LOCAL_SERVER_URL` var value with your virtualhost (read all comments).
3. Startup webpack with `npm run dev`
4. Enable Advanced Custom Fields, Gravity Forms and Classic Editor.
5. Activate your theme.
6. Go into Custom Fields and sync all fields. 

## Prod enviroment
1. Go into the theme directory and run `npm install` (Make sure to have node.js).
2. Startup webpack with `npm run build`
4. Enable Advanced Custom Fields, Gravity Forms, Yoast SEO, and Classic Editor.
5. Activate your theme.
6. Go into Custom Fields and sync all fields. 

# Javascript Structure

The first thing that we must take into account is that it is a modular structure and that is why it is necessary that we work with javascript classes for each new module.
Inside the `assets/js` directory we are going to find several folders, below I detail what each one does:

* `/app/usefull`: Core js to make it works, this files shouldn't be modified.
* `/app/modules/`: Inside this folder the modules that we want to use in the front end will be added
* `/pages/`: In this file we will add js class of each module.
  
## How should we work with modules?
We must take into account two aspects to be able to make our javascript work, on the one hand the css class and on the other the class of the js file that we need for operation.

### PHP structure:
This files should be in `template-parts/modules`
```
<div class="m-module-name"> <!-- CSS Class! -->
.
.
.
</div>
```

### JS structure:
This files should be in `assets/js/app/modules`
```
class ModuleName { //JS class Name!
    constructor(module) {
        this.module = module;
    }

    init() {
        // Your scripts
    }
}

export default ModuleName; // Export our js class
```
#### Methods:

* `init()`: This is the most important method, from here the module will trigger.
* `constructor()`: This is the constructor of the class, where we must host our global variables.

#### Considerations:

* Within the constructor we will have the module as such as an argument. `constructor(module)`.
* To access elements of the module we must use `module.querySelector(YOUR-ELEMENT)`.
Let's avoid using `document.querySelector(YOUR-ELEMENT)` if it's not necessary. This prevents errors between modules or even if we add the same module more than once on the same page. For Example:
```
class ModuleName {
    constructor(module) {
        this.module = module;
        this.title = module.querySelector('.title');
    }
.
.
.
```

### Tigger modules on the frontend:

Once we have created our php and our js, we are going to include it in the `assets/js/pages/page-template.js` file so that they are dynamically triggered as required by the page.
For this we are going to add an object with values ​​inside the modules array. For example:

```
//Modules imports
import ModuleName from './module_name.js';

//JSON modules for dynamic init
const modules = [
    {
    domModule: '.m-module-name', // CSS Class name!
    classModule: ModuleName // JS Class name!
    },
    .
    .
    .
];


export default modules;
```
Where:
* `domModule`: Is the css class of the module.
* `classModule`: Is the js class of the module.