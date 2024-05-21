# <FONT COLOR = 'red'>**Trabajo Final - Primera Mitad ApliWeb**</FONT>
_______________________________________________________________________________________________

El repositorio denominado como ***ApliWeb_Final_FrontEnd*** es propiedad de *Edwin Andrés Samboní Ortiz*,
dentro del mismo se reconoce la participación y la propiedad intelectual compartida con *Humberto Aldemir
Fajardo Castaño* y *Pablo Cesar Garzón Benítez* como colabores activos del proyecto.

El repositorio cuenta con tres secciones divididas en carpetas:

1. **Carpeta denominada "backend"**: Corresponde a la carpeta donde se encuntra toda la conexión con la base
 de datos, así como también los respectivos *End-Point* para consultar desde el frontend a través de la API REST.
 El contenido de la misma se realizo con con **NodeJS** y el framework **Express** bajo una arquitectura de
 controladores de aplicación.
3. **Carpeta denominada "db"**: Contiene el *script* necesario para tener la base de datos base y poder utilizar
 la aplicación web en condiciones, es importante tener en cuenta que la base de datos SQL relacional.
5. **Carpeta denominada "frontend"**: Corresponde a la carpeta donde se encuentra toda la presentación de la
 aplicación web, se genero el proyecto utilizando el gestor de proyectos **Vite** con **ReactJS**, **TypeScript**
 y **Tailwind CSS** como framework de hojas de estilo. El frontend fue maquetado bajo el modelo de *composición de
 componentes* y la arquitectura *MVC*.

> [!IMPORTANT]
> Como requerimientos fundamentales se tienen:
> 1. Tener NodeJS instalado en su versión ```Node.js v20.12.1``` o superior.
> 2. Tener instalado un gestor de bases de datos SQL, algunos de los cuales son: MySQL Workbench, XAMPP, Laragon, etc.



# <FONT COLOR = 'blue'>***PASOS A SEGUIR PARA UTILIZAR EL REPOSITORIO CORRECTAMENTE***</FONT>
_______________________________________________________________________________________________

Para tener una correcta ejecución del proyecto es importante iniciar con su clonación con ayuda del comando:
```
git clone https://github.com/AndresSamboni/ApliWeb_Final_FrontEnd.git
```

> [!IMPORTANT]
> Luego de clonar el repositorio es importante acceder al archivo *db_gestion.sql* que se encuentra en la carpeta ***db***
> y copiar el script dentro del gestor de base de datos o en su defecto importar el script en el mismo.

> [!NOTE]
> En la ruta *'./backend/src/connection'* se debe abrir el archivo ***dbConnection.ts*** y modificar las credenciales utilizadas
> por los usuarios en el gestor de bases de datos y el puerto utilizado (Así como el nombre en caso de haberlo cambiado).
> ```
> //...
> const DB_CONFIG ={
>   HOST: 'localhost',
>   USER: 'root',  //<--CAMBIAR POR EL USUARIO UTILIZADO
>   PASSWORD: '',  //<--CAMBIAR POR LA CONTRASEÑA UTILIZADA
>   DATABASE: 'db_gestion',
>   PORT: 3306    //<--CAMBIAR POR EL PUERTO DE LANZAMIENTO DE MySQL
> };
> //...
> ```

Una vez realizada la clonación del reposito es importante abrir una terminal de consola y acceder a la carpeta *backend* para ejecutar el comando:
```
npm i
```
O también el comando:
```
npm install
```
Con el fin de que se instalen todas las dependencias correspondientes al *backend*. Luego ejecutar el comando:
```
npm run dev
```
O también el comando:
```
npm run start
```
Para lanzar el *servidor backend*, si todo salió bien, dentro del navegador se debería de poder visitar el *[End-Point base](http://localhost:3000/)* con la ruta:
```
http://localhost:3000/
```
Donde se debe visualizar un JSON como señal de que todo funciona correctamente.

![image](https://github.com/AndresSamboni/ApliWeb_Final_FrontEnd/assets/142060151/00d4eaf3-ed0c-4ce5-a23a-f4e57a57855c)


Posteriormente es importante por medio de una terminal de consola acceder a la carpeta *frontend* para ejecutar el comando:
```
npm i
```
O también el comando
```
npm install
```
Con el fin de que se instalen todas las dependencias correspondientes al *frontend*. Luego ejecutar el comando:
```
npm run dev
```
Para lanzar el *servidor frontend*, si todo salió bien, dentro del navegador se debería de poder visitar la *[ruta base]([http://localhost:5173/])* con la ruta:
```
http://localhost:5173/
```
En la cual se deberá de ver una interfaz de LogIn.

![image](https://github.com/AndresSamboni/ApliWeb_Final_FrontEnd/assets/142060151/023dd85b-5798-408e-a3d4-5640f8e17b54)

> [!IMPORTANT]
> El LogIn permite el acceso como **"SUPER ADMINISTRADOR"** y como **"USUARIO"** por defecto.
> 1. **Acceso como "SUPER ADMINISTRADOR"**: Es necesario utilizar las credenciales:
> ```
>{
>  user_name: "admin",
>  password: "admin"
>}
> ```
>
> 2. **Acceso como "USUARIO"**: Es necesario utilizar las credencia
> ```
> {
>   user_name: "user1",
>   password: "contraseña2"
> }
> ```
