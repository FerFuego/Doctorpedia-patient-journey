# WP Create Node App

## Introducción

> Se trata de una aplicación desarrollada en node js que tiene como finalidad simplificar, automatizar y prevenir errores a la hora de crear módulos, componentes o custom post types.

## Instalación

>Para utilizarlo debemos navegar a la raiz de nuestro tema:
```console
$ cd wp-content/themes/my-custom-theme
```
Previo a ejecutar la app necesitamos instalar las dependencias de node:
```console
$ npm install
```
Para ejecutar la app basta con pegar el siguiente comando en la ruta anteriormente especificada:
```console
$ node wp-create
```


## Utilización

>Una vez iniciada la app se nos abrirá en la consola un menú navegable en el cual encontraremos las opciones disponibles de creación:
```console
=======================================
Welcome to wordpress file generator!
=======================================
 Select an option (Use arrow keys)
  1. Module 
  2. Component 
  3. Custom Post Type 
  Exit 
```
## Modulos
### Creacion
>
Para la creación de módulos debemos ingresar a la opción modulo y allí se nos mostrara otra ventana con los módulos disponibles (Templates).
>
Una vez seleccionado un modulo nos preguntara si deseamos re nombrarlo o dejarlo con el nombre de su template, si lo re nombramos automáticamente se cambiara el nombre del archivo y sus correspondientes clases, si el archivo q quiere crear ya existe entonces no dejara que cree un archivo con el mismo nombre y le pedirá que intente con otro nombre.
>
La app crea automáticamente un archivo php en la ruta:
```console
my-custom-theme/template-parts/modules/module-name_module.php
```
Lo mismo para su correspondiente hoja de estilos, que ademas se importa a los estilos generales ("_all.scss"):
```console
my-custom-theme/assets/modules/_name_module.scss
```
De existir un archivo JavaScript en el Template lo creara (reemplazando o no el nombre según la opción seleccionada) y remplazara la clase necesaria para su funcionamiento en la ruta:
```console
my-custom-theme/assets/js/modules/name_module.js
```
También de existir un JSON de Advanced Custom Fields la app lo pegara en la ruta de los mismos, y podrá darle a sync en el admin de wordpress.
>
>
### Agregar templates
Es muy sencillo agregar nuevos templates, solo necesitamos ir a la ruta:
```console
my-custom-theme/file_creator/themes/modules
```
Y allí podremos dejar nuestro template con todos sus archivos necesarios, pero hay que seguir una estructura para que la app realice su trabajo correctamente:
- **PHP**: En cuanto al nombre del archivo, sus palabras deben estar separadas por "_", por ejemplo; "name_module.php". También la nomenclatura de sus clases seria "m-name-module", procure siempre usar el nombre del archivo como clase ya q esa es la referencia que toma la app para realizar los cambios, ademas, deja nuestra estructura mas limpia y accesible. Si el archivo en cuestión utilizara JavaScript es importante que en el primer div coloque el atributo has-js="true", esto habilitara la carga dinámica de js por pagina de Barba JS.
- **SCSS**: El nombre del archivo debería ser como, siguiendo el ejemplo anterior, "name_module.scss" y sus clases idénticas a las del archivo PHP.
- **JS**: El nombre del archivo debería ser como, siguiendo el ejemplo anterior, "name_module.js" y sus clases o atributos para funcionamiento idénticas al PHP, es importante que no utilice "window.addEventListener('load')" ya que Barba JS se encarga de eso. También es recomendable que cree su js utilizando un forEach por modulo, ya que si repetimos el modulo en una misma pagina esto prevendrá posibles errores o funcionamientos extraños.
- **ACF (JSON)**: Puede crear su acf desde el admin de wordpres y luego copiarlo y pegarlo en la carpeta correspondiente, **es muy importante que ponga el mismo nombre que los demás archivos** ejemplo: "name_module.json" ya que la app se encargara de renombrar si es necesaria y de agregarle id's para que ACF no tenga problemas.

## Componentes
### Creación
>
Para la creación de componentes debemos ingresar a la opción components y allí se nos mostrara otra ventana con los componentes disponibles (Templates).
>
Una vez seleccionado un modulo nos preguntara si deseamos re nombrarlo o dejarlo con el nombre de su template, si lo re nombramos automáticamente se cambiara el nombre del archivo y sus correspondientes clases, si el archivo que quiere crear ya existe entonces no dejara que cree un archivo con el mismo nombre y le pedirá que intente con otro nombre.
>
La app crea automáticamente un archivo php en la ruta:
```console
my-custom-theme/template-parts/components/component-name_module.php
```
Lo mismo para su correspondiente hoja de estilos, que ademas se importa a los estilos generales ("_all.scss"):
```console
my-custom-theme/assets/components/_name_module.scss
```
### Agregar templates
Es muy sencillo agregar nuevos templates, solo necesitamos ir a la ruta:
```console
my-custom-theme/file_creator/themes/components
```
Y allí podremos dejar nuestro template con todos sus archivos necesarios, pero hay que seguir una estructura para que la app realice su trabajo correctamente:
- **PHP**: En cuanto al nombre del archivo, sus palabras deben estar separadas por "_", por ejemplo; "name_component.php". También la nomenclatura de sus clases seria "c-name-component", procure siempre usar el nombre del archivo como clase ya que esa es la referencia que toma la app para realizar los cambios, ademas, deja nuestra estructura mas limpia y accesible.
- **SCSS**: El nombre del archivo deberia ser como, siguiendo el ejemplo anterior, "name_module.scss" y sus clases identicas a las del archivo PHP.

## Custom Post Types
### Creacion
Sencillamente seleccionamos la opción Custom Post Types y la app nos hará una serie de preguntas para saber como queremos configurar nuestro CPT, para información sobre las preguntas podes ingresar a: https://developer.wordpress.org/reference/functions/register_post_type/
>
La configuración esta limitada para que no sea muy largo pero, si desea agregar o cambiar algo, puede hacerlo desde el archivo:
```console
my-custom-theme/inc/optional/custom-post-types.php
```
También si lo especifica, se creara una single page para el CPT en cuestión en la raíz de nuestro tema.