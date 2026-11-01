const express = require("express");
const { validarReserva } = require("../middleware/reservas");

function crearRutasReservasApi(controlador) {
    const router = express.Router();
    
    router.get("/", controlador.listarApi);
    router.get("/:id", controlador.mostrarDetalleApi);
    router.post("/", validarReserva, controlador.crearApi);
    return router;
}

module.exports = { crearRutasReservasApi }