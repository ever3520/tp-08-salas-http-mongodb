const mongoose = require("mongoose");
const { leerUriMongo } = require("./entorno");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function conectarBaseDatos() {
    await mongoose.connect(leerUriMongo(), {
        serverSelectionTimeoutMS: 5000,
    });
}

async function desconectarBaseDatos() {
    await mongoose.disconnect();
}

module.exports = { conectarBaseDatos, desconectarBaseDatos };