function leerConfiguracion(entorno = process.env) {
    const puerto = Number(entorno.PORT ?? 3000);

    if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
        throw new Error("PORT debe ser un número entero entre 1 y 65535");
    }

    const formatoRegistro = entorno.NODE_ENV === "production" ? "combined" : "dev";

    return { puerto, formatoRegistro };
}

function leerUriMongo(entorno = process.env) {
    const uri = entorno.MONGODB_URI?.trim();

    if (!uri) {
        throw new Error("MONGODB_URI no está definido o es una cadena vacía");
    }
    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
        throw new Error("MONGODB_URI debe comenzar con 'mongodb://' o 'mongodb+srv://'");
    }

    return uri;
}

module.exports = { leerConfiguracion, leerUriMongo };