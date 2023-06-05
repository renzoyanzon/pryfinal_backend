# Nombre del Proyecto

Ecommerce Coderhouse - Proyecto Final

## Contenido

- [Descripción del proyecto](#descripción-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints](#api)
- [Librerías] (#librerías)
- [Licencia](#licencia)

## Descripción del Proyecto

Este proyecto es mi primera Aplicación Node.js sobre un sitio web ecommerce que forma parte del proyecto final de Coderhouse. Incluye la creación y autenticación de usuarios, selección de productos para comprar y la gestión de carritos de compra. 
Está construido en base a una arquitectura en capas que sigue las mejores prácticas de desarrollo de aplicaciones Node.js. Las capas incluidas en la arquitectura son:
- **Router**: Maneja las rutas y solicitudes HTTP entrantes.
- **Controller**: Gestiona la lógica de negocio y coordina las acciones dentro de la aplicación.
- **Repository Factory**: Proporciona una abstracción para acceder a los datos y manejar la persistencia.
- **DAOs**: Data Access Objects, que interactúan directamente con la base de datos.
- **Middlewares**: Funciones que se ejecutan entre la solicitud y la respuesta para agregar funcionalidades adicionales. En el proyecto incluimos un middleware de autenticación de usuario y uno de manejo de errores.
- **Services**: Contienen la lógica de negocio principal.
- **Utils**: Proporciona funciones de utilidad y herramientas comunes utilizadas en todo el proyecto.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las credenciales en el archivo `.env`.
4. Ejecuta `npm start` para iniciar la aplicación.

## Configuración

Antes de ejecutar el proyecto, asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

- `ENVIRONMENT`: Especifica el entorno de ejecución del proyecto (por ejemplo, "development" o "production").
- `PORT`: El puerto en el que se ejecutará el servidor.
- `MONGO_URI`: La URI de conexión a la base de datos MongoDB.
- `MONGO_DB_NAME`: El nombre de la base de datos MongoDB que se utilizará.
- `MONGO_USER`: El usuario de MongoDB para la autenticación.
- `MONGO_PASSWORD`: La contraseña del usuario de MongoDB.
- `MONGO_HOST`: El host de MongoDB (por ejemplo, "localhost").
- `MONGO_QUERY`: Opciones de consulta adicionales para la conexión a MongoDB.
- `DATACORE`: La conexión a la base de datos de proyectos, ya sea mediante File System o MongoDB.
- `DATA_STORAGE`: La conexión a la base de datos para la persistencia de usuarios, , ya sea mediante File System o MongoDB
- `COOKIE_SECRET`: La clave secreta utilizada para firmar las cookies de sesión.
- `EMAIL`: La dirección de correo electrónico utilizada para el servicio de NodeMailer y Twilio.

Asegúrate de proporcionar los valores correctos para cada una de estas variables de entorno según tu configuración de proyecto.
Para mayor información y ayuda al completar las variables ver archivo .env.example

## Uso

1. Abre la aplicación en tu navegador.
2. Registra un nuevo usuario ingresando a la pestaña "Register" que vemos en el NavBar.
3. Ingresa los datos necesarios y inserta el boton "Submit" para registrar el usuario
4. Ingresa a la pestaña "Products" para visualizar los productos del ecommerce.
5. La aplicación generará un listado de 10 productos random usando la libreria Faker. Si deseas personalizar tus productos deben ingresarlo mediante la Aplicación de Postman utilizando la API POST http://localhost:PORT/api/products/
6. Puedes agregar los productos seleccionados al carrito, visualizar los mismos en la pestaña "Cart", borrarlos y comprarlos.

## API

- `GET /` : Recupera la pagina de inicio. Requiere autenticación
- `GET /cart` : Recupera el carrito del usuario. Requiere autenticación
- `GET /signin` : Recupera la pagina para iniciar sesión
- `GET /signup` : Recupera la pagina para registrarse
- `GET /signout` : Recupera la pagina para iniciar sesión.

- `GET /api/products`: Obtiene todos los productos.
- `GET /api/products/:id`: Obtiene los detalles de un producto específico.
- `POST /api/products`: Crea un nuevo producto.
- `PUT /api/products/:id`: Actualiza los detalles de un producto existente.
- `DELETE /api/products/:id`: Elimina un producto.

- `GET /api/cart`: Obtiene todos los carritos.
- `POST /api/cart/:productId`: Agrega productos al carrito.
- `POST /api/cart/buyCart/:cartId`: Compra el carrito.
- `POST /api/cart/delete/:cartId`: Elimina un producto especifico del carrito.

## Librerías

### Dependencias de desarrollo
- **@graphql-yoga/plugin-sofa**:  Un plugin para GraphQL Yoga que proporciona herramientas adicionales para trabajar con el esquema GraphQL y las resolvers.
- **nodemon**:  Una herramienta de desarrollo que ayuda a reiniciar automáticamente la aplicación Node.js cuando se detectan cambios en los archivos del proyecto. 
### Dependencias de producción

- **argon2**: Una librería para el hashing de contraseñas utilizando el algoritmo Argon2.
- **axios**: Una librería para realizar solicitudes HTTP desde Node.js.
- **compression**: Un middleware de Express para comprimir las respuestas HTTP, lo que reduce el tamaño de los datos enviados al cliente y mejora el rendimiento.
- **connect-mongo**: Un middleware de Express que permite utilizar MongoDB como almacenamiento de sesiones para Express sessions.
- **cookie-parser**: Un middleware de Express que analiza y firma las cookies en las solicitudes entrantes.
- **cors**: Un middleware de Express que habilita el acceso a recursos del servidor desde diferentes dominios y permite el intercambio de datos entre diferentes orígenes.
- **dotenv**: Una librería que carga variables de entorno desde un archivo .env en el proyecto. Esto permite configurar fácilmente las variables de entorno utilizadas en el proyecto.
- **ejs**: Un motor de plantillas que permite generar vistas HTML dinámicas basadas en datos proporcionados por el servidor.
- **express**: Un framework web rápido y minimalista para Node.js que facilita la creación de aplicaciones web y APIs.
- **express-session**: Un middleware de Express que permite el manejo de sesiones de usuario en la aplicación web.
- **fs**: Un módulo de Node.js que proporciona métodos para trabajar con el sistema de archivos, como leer y escribir archivos.
- **graphql**: Una librería que permite crear y ejecutar consultas y mutaciones GraphQL en Node.js.
- **graphql-yoga**: Un framework GraphQL completo basado en Express.js que incluye un servidor GraphQL listo para usar y características adicionales para facilitar el desarrollo de APIs GraphQL.
- **http-status**: Una librería que proporciona un conjunto de códigos de estado HTTP predefinidos para facilitar el manejo de respuestas HTTP en Node.js.
- **lodash**: Una librería de utilidades que proporciona funciones útiles para manipular y operar con datos de manera más eficiente.
- **md5**: Una función de hashing que se utiliza comúnmente para generar el hash de una cadena de texto, como contraseñas o identificadores únicos.
- **mongoose**: Una librería de modelado de objetos de MongoDB para Node.js que proporciona una interfaz sencilla y flexible para interactuar con la base de datos MongoDB.
- **morgan** Un middleware de Express que registra las solicitudes HTTP entrantes en la consola, lo que facilita el seguimiento y la depuración.
- **nodemailer**: Una librería de Node.js para enviar correos electrónicos desde una aplicación.
- **passport**: Un middleware de autenticación para Express que facilita la autenticación de usuarios utilizando diferentes estrategias, como el inicio de sesión local, OAuth, entre otros.
- **passport-local**: Una estrategia de autenticación para Passport que permite autenticar a los usuarios utilizando credenciales de inicio de sesión locales (usuario y contraseña).
- **pino**: Un registrador de logs rápido y seguro para Node.js.
- **pino-http**: Módulo que extiende el registrador de logs Pino para proporcionar un middleware de registro de solicitudes y respuestas HTTP en Express.
- **pino-pretty**: Módulo que proporciona una salida legible y bien formateada para los registros generados por Pino
- **session**: Una librería que proporciona middleware de gestión de sesiones en Express. Facilita el almacenamiento y recuperación de datos de sesión para usuarios en la aplicación.
- **supertest**:  Una librería que proporciona una interfaz sencilla para realizar pruebas de integración de APIs en Node.js.
- **twilio**: Permite enviar mensajes SMS y realizar llamadas telefónicas desde la aplicación.
- **uuid**: Una librería que genera identificadores únicos (UUIDs) de manera confiable

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más información.
