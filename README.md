Insttrucciones de Instalación.

CREACIÓN DEL BACKEND:

Creamos una carpeta con el nombre de nuestro Proyecto.
Dentro de esta carpeta crearemos otra carpeta llamada “backend”
Damos click derecho en la carpeta backend y utilizamos la opción: “abrir en un terminal”
Utilizamos el comando:

npm init -y
- Declarará que se inicia un proyecto Node y creará un package.json, que es un archivo necesario para el manejo de las dependencias que instalaremos a continuación; el “-y” le otorga valores predeterminados.

Una vez creado el package.json, empezaremos a instalar nuestras principales dependencias, utilizando los siguientes comandos:

npm install express
- Express lo utilizaremos para la creación, gestión y configuración de servidores y definición de respuesta a las solicitudes HTTP. 
npm install mongoose
- MongoDB lo utilizaremos para la base de datos.
npm install cors
- Cors servirá para facilitar y gestionar la comunicación entre el backend y el frontend.
npm install dotenv
- Dotenv gestionará las variables de entorno.
npm install bcrypt 
-Bcrypt lo utilizaremos para encriptar las contraseñas.
npm install jsonwebtoken
-JsonWebToken lo utilizaremos para la autenticación de los usuarios.

Se pueden instalar todas en una sola línea de código, de este modo: 
npm install express mongoose cors dotenv bcrypt jsonwebtoken

Durante el desarrollo de este proyecto también se utilizaron las siguientes dependencias (opcionales): 

npm install -D nodemon
- Nodemon eliminará la necesidad de reiniciar el servidor cada que se haga un cambio; el “-D” especificará que sólo lo utilizaremos en la fase de desarrollo.

Una vez terminen las instalaciones, utilizaremos los siguientes comandos:

git init
- Creará un repositorio de Git que nos permitirá usar el control de versiones, entre otras cosas.
npx create-gitignore node
- Creará el archivo .gitignore que deja claro qué archivos no debe añadir al control de versiones ni rastrear. 

Crearemos el archivo .env en la carpeta backend. Aquí especificaremos cuál será nuestro puerto para el servidor (PORT), la variable de nuestro JWT y el URI de conexión con Mongo (En mi caso utilicé MongoAtlas).
Dentro de la carpeta backend creamos la carpeta src.
Dentro de la carpeta src crearemos el archivo: server.js
Dentro de la carpeta src crearemos las carpetas: controllers, middleware, models, routes, utils
Dentro de la carpeta controller se crean los archivos: userController.js, productController.js y atenticationController
Dentro de la carpeta middleware se crean el archivo: middlewareAutentication.js 
Dentro de la carpeta models se crean los archivos: User.js y Product.js
Dentro de la carpeta routes se crean los archivos: autenticationRoutes.js, productRoutes.js y userRoutes.js
Dentro de la carpeta utils se crea el archivo: db.js
Levantaremos servicio en la base de datos abriendo una terminal y escribiendo el comando: “mongodb”
(Si se usa MongoAtlas no es necesario levantar servicio, sólo tener bien vinculada la cuenta de MongoAtlas en el archivo .env)
Iniciamos el servidor utilizando el comando “npm start”
Si todo está bien, tendremos un mensaje en la consola que nos dirá en qué puerto se está ejecutando el servidor y si la conexión con Mongo se realizó exitosamente.
Se prueban y verifican las funciones CRUD mediante la aplicación PostMan.

CREACIÓN DEL FRONTEND:

Abriremos la carpeta de nuestro proyecto en un terminal y ejecutaremos los comandos: 

npm create vite@latest frontend
-Creará una carpeta llamada frontend en nuestra carpeta de proyecto donde se instalarán todas las dependencias necesarias, también creará un proyecto en React utilizando una plantilla predefinida. 

Seleccionaremos las opciones de React y JavaScript. Luego utilizamos el npm install.

Ahora añadiremos las dependencias necesarias para trabajar con React.

npm install react-dom
-React-Dom se utiliza para la renderización de los componentes en la página. 
npm install react-router-dom
- React-Router-Dom lo utilizaremos para manejar la navegación y las rutas de la página.
npm install @fortawesome/react-fontawesome
- FontAwesome lo utilizaremos para utilizar íconos como componentes en nuestro proyecto.
npm install @fortawesome/free-brands-svg-icons
-Es una extensión de FontAwesome que lo que hace es permitirnos usar algunos de los íconos de marcas.
npm install axios
- Axios nos permitirá hacer solicitudes HTTP desde el navegador. 

Se pueden instalar todas en una sola línea de código, de este modo: 
npm install react-dom react-router-dom npm install @fortawesome/react-fontawesome npm install @fortawesome/free-brands-svg-icons axios 

Dentro de la carpeta frontend, crearemos la carpeta: src
Dentro de la carpeta src, crearemos la carpeta: components
Dentro de la carpeta components, crearemos los archivos: AuthForm.jsx, Footer.jsx, ProductForm.jsx, ProductList.jsx, Products.jsx
También dentro de components, 
Editamos los archivos App.jsx, para configurar la página utilizando los componentes creados anteriormente. 
Editamos el archivo main.jsx.
