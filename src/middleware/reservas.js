function prepararSalas(req, res, next) {
    res.locals.seccion = "Reservas de salas";
    next();
}

function validarReserva(req, res, next) {
    const valores = req.body ?? {};
    const estudiante =
        typeof valores.estudiante === "string" ? valores.estudiante.trim() : "";
    const email =
        typeof valores.email === "string" ? valores.email.trim() : "";
    const sala =
        typeof valores.sala === "string" ? valores.sala.trim() : "";
    const fecha =
        typeof valores.fecha === "string" ? valores.fecha.trim() : "";
    const turno =
        typeof valores.turno === "string" ? valores.turno.trim() : "";
    const personasRecibido = valores.personas;
    const tipoPersonasValido =
        typeof personasRecibido === "number" ||
        (typeof personasRecibido === "string" && personasRecibido.trim() !== "");
    const personas = tipoPersonasValido ? Number(personasRecibido) : NaN;
    if (
        !estudiante ||
        !email ||
        !sala ||
        !fecha ||
        !turno ||
        !Number.isFinite(personas) ||
        personas < 1
    ) {
        if (req.baseUrl === "/api/reservas") {
            return res.status(400).json({
                error: "Completá los campos con una cantidad de personas mayor o igual a 1.",
            });
        }
        return res.status(400).render("reservas/nueva", {
            titulo: "Nueva reserva",
            error: "Completá los campos con una cantidad de personas mayor o igual a 1.",
            valores,
            salasPermitidas: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
            turnosPermitidos: ["Mañana", "Tarde", "Noche"]
        });
    }
    req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
    next();
}

module.exports = { prepararSalas, validarReserva };