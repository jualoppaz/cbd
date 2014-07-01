##Español
La base de este proyecto fue tomada de https://github.com/braitsch/node-login .

Puedes probar la aplicación en: http://cbd.herokuapp.com

###Temática
En este proyecto puedes loguearte como alumno de un colegio y ver las excursiones disponibles por realizar.
Si te gusta alguna excursión podrás apuntarte, ver los alumnos que acudirán, borrarte o incluso comentar las excursiones     una vez que hayan transcurrido.

###Tecnologías
En este proyecto he usado las siguientes tecnologías: 

* <b>MongoDB</b>: como base de datos de la aplicación.
* <b>NodeJS</b>: para la implementación del servidor.
* <b>AngularJS</b>: para el cliente.
* <b>Jade</b>: para la simplificación de las plantillas HTML.


###Casos de uso
Como usuario podemos:

* Registrarnos en la aplicación.
* Loguearnos en la aplicación.
* Listar todas las excursiones disponibles.
* Buscar excursiones por palabras contenidas en el título o en la descripción.
* Consultar la información asociada a una excursión.
* Inscribirnos en una excursión que aún no se ha realizado.
* Comentar una excursión que ya ha sido realizada.

###Estructura del proyecto
El proyecto está estructurado de la siguiente forma:

* app: carpeta con el código fuente de la aplicación
  * public: archivos estáticos de la aplicación
    * css: hojas de estilo.
      * bootstrap-theme.css
      * bootstrap.css
      * font-awesome.css
      * starter-template.css
      * style.css
      * style.styl
    * fonts: fuentes de font-awesome para el uso de los iconos.
      * fontawesome-webfont.eot
      * fontawesome-webfont.svg
      * fontawesome-webfont.ttf
      * fontawesome-webfont.woff
    * img: imágenes usadas en la aplicación.
    * js: código javascript de la aplicación.
      * angular: controladores de angular para las plantillas.
        * angularDiagrams.js
        * angularIndex.js
        * angularTrip.js
      * controllers: controladores de jQuery para las plantillas.
        * diagramController.js
        * homeController.js (sustituido por indexController.js)
        * indexController.js
        * loginController.js
        * signupController.js
        * tripController.js
      * form-validators: funciones de validación en jQuery.
        * accountValidator.js
        * emailValidator.js
        * loginValidator.js
        * resetValidator.js
      * views: llamada a las funciones jQuery de las vistas.
        * diagram.js
        * home.js
        * index.js
        * login.js
        * reset.js
        * singup.js
        * trip.js
      * angular.js: librería AngularJS.
    * vendor: css y javascript inicial. Sobreescrito por las versiones de la carpeta "css".
      * bootstrap-modal.js
      * bootstrap-transition.js
      * bootstrap.min.css
      * jquery.form.js
      * jquery.min.js
  * server: archivos del servidor.
    * modules: módulos definidos para funcionalidades concretas.
      * account-manager.js
      * country-list.js (no se usa en esta aplicación)
      * data-base-manager.js (gestor de conexiones con la base de datos. Aquí se definen las consultas)
      * email-dispatcher.js: gestor de emails de la aplicación.
      * email-settings.js: archivo de configuración con las credenciales del email de la aplicación.
    * views: vistas de la aplicación.
      * modals: modales de la aplicación.
        * alert.jade
        * confirm.jade
        * form-errors.jade
        * lost-password.jade
        * reset-password.jade
      * 404.jade
      * account.jade
      * diagrams.jade
      * home.jade (no usado actualmente)
      * index.jade
      * layout.jade
      * login.jade
      * print.jade
      * reset.jade
      * signup.jade
      * trip.jade
    * router.js: rutas de la aplicación y de la API REST
* Procfile: archivo necesario para el despliegue en Heroku.
* README.md: este fichero.
* app.js: archivo para la creación del servidor.
* package.json: dependencias de nuestro proyecto Node.js.

##English##
This project was forked by https://github.com/braitsch/node-login .

You can try the app in: http://cbd.herokuapp.com

###Subject
In this project you can log in as a school user and you can see the avaible school trips. If you like any trip you could sign up for the trip, see all the attendants, delete from the trip or comment it.

###Technologies
In this project I have used:

* <b>MongoDB</b>: as the database to storage the application data.
* <b>NodeJS</b>: for the server implementation.
* <b>AngularJS</b>: for the client side.
* <b>Jade</b>: for make the templates easier than HTML.

###User cases
As user we can:

* Create an account.
* Log in the application.
* Retrieve all the avaible trips.
* Search for any trip that contains the specified word in the title or description.
* See all the related information about the selected trip.
* Sign up in a no finished trip.
* Comment a finished trip.
