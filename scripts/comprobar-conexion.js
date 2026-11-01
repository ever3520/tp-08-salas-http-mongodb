const { conectarBaseDatos, desconectarBaseDatos } = require("../src/config/base-datos");

async function main() {
    try {
        await conectarBaseDatos();
        console.log("Conexión a la base de datos establecida correctamente.");
    } finally {
        await desconectarBaseDatos();
    }
}

main().catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
    console.error("Revisar MONGODB_URI, servidor, red y los permisos");
    process.exitCode = 1;
})