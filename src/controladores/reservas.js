function crearControladorReservas(servicioReservas) {
    async function listar(req, res) {
        const salasDeEstudio = await servicioReservas.listar();
        res.render("reservas/lista", {
            titulo: "Salas de estudio",
            salasDeEstudio,
        });
    }

    function mostrarFormulario(req, res) {
        res.render("reservas/nueva", {
            titulo: "Nueva reserva",
            error: null,
            valores: {},
            salasPermitidas: servicioReservas.listarReservasPermitidas(),
            turnosPermitidos: servicioReservas.listarTurnosPermitidos(),
        });
    }

    async function mostrarDetalle(req, res) {
        const sala = await servicioReservas.obtenerPorId(req.params.id);
        if (!sala) {
            return res.status(404).render("no-encontrado", {
                titulo: "Reserva no encontrada",
                mensaje: "No existe una reserva con ese identificador.",
            });
        }
        res.render("reservas/detalle", { titulo: sala.nombre, sala });
    }

    async function mostrarDetalleApi(req, res) {
        const sala = await servicioReservas.obtenerPorId(req.params.id);

        if (!sala) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.json(sala);
    }

    async function crear(req, res) {
        await servicioReservas.crear(req.reservaValidada);
        res.redirect("/reservas");
    }

    async function estado(req, res) {
        const cantidad = await servicioReservas.contar();
        res.json({
            estado: "activo",
            inscripciones: cantidad,
            solicitudId: res.locals.solicitudId
        });
    }

    async function crearApi(req, res) {
        const reserva = await servicioReservas.crear(req.reservaValidada);
        res.location(`/api/reservas/${reserva.id}`).status(201).json(reserva);
    }

    async function listarApi(req, res) {
        const { sala, turno } = req.query;

        const reservas = await servicioReservas.listar(sala, turno);

        res.json(reservas);
    }

    return {
        listar,
        mostrarFormulario,
        mostrarDetalle,
        mostrarDetalleApi,
        crear,
        estado,
        crearApi,
        listarApi,
    };
}
module.exports = { crearControladorReservas };