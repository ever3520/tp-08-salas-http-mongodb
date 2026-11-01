const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema(
    {
        estudiante: { type: String, required: true, trim: true },
        email: {
            type: String, required: true, trim: true, match: /@/
        },
        sala: {
            type: String, enum: {
                values: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
                message: "Sala no válida"
            }
        },
        fecha: {
            type: String, required: true, trim: true, validate: {
                validator: (valor) => valor.length > 0,
                message: "La fecha no puede estar vacía"
            }
        },
        turno: {
            type: String, enum: {
                values: ["Mañana", "Tarde", "Noche"],
                message: "Turno no válido"
            }
        },
        personas: {
            type: Number, required: true, min: 1, max: 6, validate: {
                validator: Number.isInteger,
                message: "La cantidad de personas debe ser un número entero entre 1 y 6"
            }
        },
        estado: { type: String, enum: { values: ["pendiente", "confirmada"] }, default: "pendiente" }
    },
    { collection: "reservas" }
)

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = { Reserva };