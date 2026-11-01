const mongoose = require('mongoose');
const { Reserva } = require('../modelos/reserva');

function representarReserva(reserva) {
    const formatoReserva = {
        id: reserva._id.toString(),
        estudiante: reserva.estudiante,
        email: reserva.email,
        sala: reserva.sala,
        fecha: reserva.fecha,
        turno: reserva.turno,
        personas: reserva.personas,
        estado: reserva.estado
    }
    return formatoReserva;
}

function crearServicioReservasMongo() {
    async function listar(sala, turno) {
        const filtroReserva = {};
        if (sala !== undefined) {
            if (typeof sala !== "string" || !sala.trim()) {
                const error = new Error("Sala no válida");
                error.codigo = "FILTRO_INVALIDO";
                throw error;
            }
            filtroReserva.sala = sala.trim();
        }

        if (turno !== undefined) {
            if (typeof turno !== "string" || !turno.trim()) {
                const error = new Error("Turno no válido");
                error.codigo = "FILTRO_INVALIDO";
                throw error;
            }
            filtroReserva.turno = turno.trim();
        }
        const documentos = await Reserva.find(filtroReserva).lean();
        return documentos.map(representarReserva);
    }

    function listarReservasPermitidas() {
        return ["Sala Norte", "Sala Sur", "Sala Multimedia"];
        
    }

    function listarTurnosPermitidos() {
        return ["Mañana", "Tarde", "Noche"];
    }

    async function contar() {
        return await Reserva.countDocuments({});
    }

    async function obtenerPorId(id) {
        if (!mongoose.isObjectIdOrHexString(id)) {
            const error = new Error("Identificador no válido");
            error.codigo = "ID_INVALIDO";
            throw error;
        }
        const documento = await Reserva.findById(id).lean();
        return documento ? representarReserva(documento) : null;
    }

    async function crear(datos) {
        const documento = await Reserva.create({
            estudiante: datos.estudiante,
            email: datos.email,
            sala: datos.sala,
            fecha: datos.fecha,
            turno: datos.turno,
            personas: datos.personas,
            estado: datos.estado
        });
        return representarReserva(documento);
    }
    return { listar, listarReservasPermitidas, listarTurnosPermitidos, contar, obtenerPorId, crear };
}

module.exports = { crearServicioReservasMongo }