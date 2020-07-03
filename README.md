# jupiter-app

Ir a jupiter https://jupiter-app.herokuapp.com/

Jupiter-app es una APP REST desarrollada en Node.js, su funcionalidad es la busqueda de productos publicados en proveedores web. 

## Proveedores
    - zara
    - dexter

jupiter-app constan de dos aplicaciones, cada una cumple los siguientes roles...

## Ganymede
    - Expone todos los "endpoints" donde podemos realizar las busquedas y obtener dichos resultados. 
    - Las busqueda pueden tardar algunos minutos, por lo cual "Ganymede" necesita una URL(callback) para notificarte cuando la busqueda alla terminado.
    - Se cual sea el resutado de la busqueda, recibiras una notificacion a esa URL.
    - Persiste todas las busquedas que se realizan, y tambien el resultado, para que en cualquier momento puedas obtener nuevamente esa informacion. 

## Themisto
    - Es el encargado del trabajo presado de "Jupiter-app", se encarga de realizar todas las busquedas en los diferentes proveedores web.

## Despliegue 📦

Desplegado en https://www.heroku.com/platform

## Principales Tecnologias,Lenguajes y librerias Utilizadas 🛠️

* [node.js](https://nodejs.org/en/) - Entorno de ejecucion
* [mongoDB](https://www.mongodb.com/es/) - Base de datos NoSQL
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/) - Lenguaje de programacion
* [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programacion

## Autor ✒️

* **Abbul Rodriguez** - *Todo* - [abbulrodriguez](https://www.linkedin.com/in/abbul-rodriguez/)