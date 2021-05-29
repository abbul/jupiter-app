# jupiter-app

jupiter-app es una APP REST desarrollada en Node.js, su funcionalidad es la busqueda de productos publicados en proveedores web. 

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
    - Es el encargado del trabajo pesado de "jupiter-app", se encarga de realizar todas las busquedas en los diferentes proveedores web.

## Instalación en entorno local 🔧

Ejecuta los siguientes pasos desde tu consola de comandos.

1. clonar el proyecto

```
git clone https://github.com/abbul/jupiter-app.git
```

2. Navega por la consola hasta el directorio del proyecto.

```
cd jupiter-app/
```

3. Instala todas la dependencias del projecto.

```
npm run install:all
```

> Nota: Instalara las dependencias globales,las de ganymede y de Themisto.

4. Configura las variables de entorno

```
npm run init:env
```

> Nota: Deberas indicar los valores de tus variables de entorno. Todo se almacenara en el archivo '.env'.

5. Acondicionamiento de la Base de Datos.

```
...
```

6. Ejecuta el proyecto.

```
cd ganymede
npm run dev
```
## Entornos 📦

* Entorno DEV  -  http://localhost:3000
* Entorno QA   -  https://jupiter-app.herokuapp.com/
* Entorno PROD -  ...

## Principales Tecnologias,Lenguajes y librerias Utilizadas 🛠️

* [node.js](https://nodejs.org/en/) - Entorno de ejecucion
* [mongoDB](https://www.mongodb.com/es/) - Base de datos NoSQL
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/) - Lenguaje de programacion
* [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programacion

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/abbul/aremesas/tags).
## Autor ✒️

* **Abbul Rodriguez** - *Todo* - [abbulrodriguez](https://www.linkedin.com/in/abbul-rodriguez/)