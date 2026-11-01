const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");
const {
    identificarSolicitud,
    medirDuracion,
} = require("./middleware/solicitudes");
const { crearManejadorErrores } = require("./middleware/errores");
const { crearControladorReservas } = require("./controladores/reservas");
const { crearRutasReservas } = require("./rutas/reservas");
const { crearRutasReservasApi } = require("./rutas/reservas-api");
function crearApp({ servicioReservas, formatoRegistro }) {
    const app = express();
    const controlador = crearControladorReservas(servicioReservas);
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));
    app.set("layout", "layouts/main");
    app.use(morgan(formatoRegistro));
    app.use(identificarSolicitud);
    app.use(medirDuracion);
    app.use(expressLayouts);
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.get("/", (req, res) => {
        res.render("inicio", { titulo: "Salas de estudio" });
    });
    app.use("/api/reservas", crearRutasReservasApi(controlador));
    app.use("/reservas", crearRutasReservas(controlador));
    app.use((req, res) => {
        if (req.path.startsWith("/api/")) {
            return res.status(404).json({ error: "Ruta no encontrada." });
        }
        res.status(404).render("no-encontrado", {
            titulo: "Página no encontrada",
            mensaje: "La dirección solicitada no existe.",
        });
    });
    app.use(
        crearManejadorErrores({
            vistaFormulario: "reservas/nueva",
            tituloFormulario: "Nueva reserva",
        }),
    );
    return app;
}
module.exports = { crearApp };