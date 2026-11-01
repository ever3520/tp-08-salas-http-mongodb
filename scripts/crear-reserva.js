const { conectarBaseDatos, desconectarBaseDatos } = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reserva");

async function main() {
    try {
        await conectarBaseDatos();
        const nuevaReserva = await Reserva.create({
            estudiante: "Roman Martinez",
            email: "romanmartinez25@gmail.com",
            sala: "Sala Multimedia",
            fecha: "2026-10-15",
            turno: "Noche",
            personas: 3
        });
        console.log("Reserva creada. _id:", nuevaReserva._id.toString());
    } finally {
        await desconectarBaseDatos();
    }
}

main().catch((error)=> {
    console.error("No se pudo crear la reserva:", error.message);
    if (error.errors) {
        console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
    }
    console.error("Revisar datos, configuración y disponibilidad de MongoDB");
    process.exitCode = 1;
})