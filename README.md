# jupiter-app

Jupiter-app es una APP REST desarrollada en Node.js, su funcionalidad es la busqueda de productos publicados en proveedores web. 
Constan de dos aplicaciones, cada una cumple los siguientes roles...

## Ganymede
    - Expone todos los "endpoints" donde podemos realizar las busquedas y obtener dichos resultados. Las busqueda pueden tardar algunos minutos, por lo cual "Ganymede" necesita de un callback para notificar cuando la busqueda alla terminado, se cual sea el resutado de la misma, recibiras una notificacion.

    - Persiste todas las busquedas que se realizan, y tambien el resultado, para que en cualquier momento puedas obtener nuevamente esa informacion. 

## Themisto

    - Es el encargado del trabajo presado de "Jupiter-app", se encarga de realizar todas las busquedas en los diferentes proveedores web.


Ir a probarla https://jupiter-app.herokuapp.com/