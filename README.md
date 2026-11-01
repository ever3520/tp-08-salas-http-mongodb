# Trabajo práctico 08
Este trabajo práctico fue desarrollado a partir del TP 07. Se reutilizó la estructura general del proyecto y se realizaron las modificaciones necesarias para incorporar persistencia de datos utilizando MongoDB Atlas.
## Versiones utilizadas
* Node.js
* npm
* Express
* MongoDB Atlas
* MongoDB Driver
* Postman para la api
## Preparación de MongoDB Atlas
1. Crear una cuenta en MongoDB Atlas.
2. Crear un Cluster gratuito (Free Tier).
3. Crear una base de datos para el proyecto.
4. Crear un usuario con permisos de lectura y escritura.
5. Autorizar la IP desde Network Access.
6. Obtener la cadena de conexión.
7. Reemplazar usuario, contraseña y nombre de base de datos en la variable de entorno correspondiente.

Por ejemplo:

MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/reservas
## Variables de entorno
Crear un archivo .env en la raíz del proyecto.

Por ejemplo:

PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/reservas
## DNS
Durante la configuración de Atlas fue necesario verificar que la conexión DNS permitiera resolver correctamente el dominio del cluster.

Por ejemplo:

cluster0.xxxxx.mongodb.net
## Instalación del proyecto
Instalar dependencias

npm install
## Comando de inicio
Comando para arrancar la aplicación

npm start

La aplicación queda disponible en http://localhost:3000
## Estructura del proyecto
src
│
├── config
│   └── mongodb.js
│
├── controllers
│   └── reservas.js
│
├── middleware
│   └── reservas.js
│
├── models
│   └── reserva.js
│
├── repositories
│   └── reservasMongo.js
│
├── routes
│   ├── reservas.js
│   └── reservasApi.js
│
├── services
│   └── reservasService.js
│
└── index.js

Responsabilidad de cada capa

Capa
Routes: Define endpoints
Controllers: Recibe solicitudes HTTP
Services: Aplica reglas de negocio
Repositories: Accede a la base de datos
Models: Define estructura de datos
Middleware: Validaciones
Config: Conexión a MongoDB
## Tabla de endpoints
GET /api/reservas Obtener reservas

GET /api/reservas/:id Obtener una reserva

POST /api/reservas Crear reserva
## JSON de ejemplos (sin secretos)
{
  "estudiante": "Juan Armando",
  "email": "juanarmando@gmail.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-30",
  "turno": "Mañana",
  "personas": 3
}

Respuesta exitosa

{
  "id": "67223f1b8a55f3f7b2a12345",
  "estudiante": "Juan Armando",
  "email": "juanarmando@gmail.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-30",
  "turno": "Mañana",
  "personas": 3
}
## Matriz de resultados
Crear reserva válida Datos correctos 201 Created OK
Crear reserva incompleta Falta nombre 400 Bad Request OK
Buscar reserva existenteID válido 200 OK OK
Buscar reserva inexistenteID inexistente 404 Not Found OK
## Prueba de reinicio
Para verificar la persistencia de datos:

1. Crear una reserva.
2. Confirmar que existe en MongoDB Atlas.
3. Detener el servidor.
4. Reiniciar la aplicación.
5. Consultar nuevamente las reservas.

Resultado:

Los datos permanecen almacenados porque se guardan en MongoDB Atlas y no en memoria.
## Limites de validación
Se implementaron validaciones para evitar datos inválidos:

estudiante	Obligatorio
sala	Obligatorio
fecha	Obligatoria
turno	Obligatoria
personas	Mayor que 0
id	Debe existir para actualizar o eliminar

Ejemplos rechazados:

JSON
{
"nombre": "",
"sala": "Sala A"
}

{
  "cantidadPersonas": -1
}
## Comparación con TP 07
Aspecto                         TP 07         TP 08
Persistencia                    Memoria RAM   MongoDB Atlas
Datos después del reinicio      Se pierden    Se conservan
Base de datos                   No            Sí
Repositorio Mongo               No            Sí
Variables de entorno            Opcional      Necesarias
Escalabilidad                   Baja          Mayor
Conexión externa                No            Sí
## Matriz de pruebas
Listado vacío si la base es nueva: devuelve 200 y []

Creación válida: devuelve 201 y la dirección para buscar el recurso

Consulta por ID creado: devuelve 200 y el recurso que se acaba de crear

Consulta tras reiniciar: devuelve 200 y el mismo recurso

ID "1": devuelve 400

ID válido inexistente: devuelve 404

Estudiante vacío o email sin @: devuelve 400 y el arreglo con los recursos que ya tenia cargados

Sala o turno no permitido: devuelve 400 y el arreglo con los recursos cargados previamente

Fecha vacía: devuelve 400

Personas 0: devuelve 400

Personas 7: devuelve 400

Personas 2.5: devuelve 400

Personas "abc": devuelve 400

Personas true: devuelve 400

Personas arreglo: devuelve 400

Personas objeto: devuelve 400

POST sin cuerpo o JSON mal formado: devuelve 400

Campos extra estado o _id: Se ignora el _id enviado por el cliente, MongoDB genera el _id

Filtro exacto por sala: cuando hay coincidencias muestra los recursos que coinciden con el filtro y sino muestra un arreglo vacío

Sala repetida como parámetro: devuelve 400

Listar dos veces: La cantidad es estable

Formulario válido / inválido: El válido me redirecciona a la página de listado y el inválido me indica error para completar con datos válidos

## Conclusión
El TP 08 mejora al TP 07 incorporando persistencia real mediante MongoDB Atlas. Esto permite mantener la información almacenada incluso después de reiniciar el servidor y acerca el proyecto a una arquitectura similar a la utilizada en aplicaciones reales.