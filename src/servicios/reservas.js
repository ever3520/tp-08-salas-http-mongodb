function crearServicioReservas(reservasIniciales, reservasPermitidas, turnosPermitidos) {
    const reservas = [...reservasIniciales];
    const salasPermitidas = [...reservasPermitidas];
    const turnosAceptados = [...turnosPermitidos];

    function listar() {
        return reservas;
    }

    function listarReservasPermitidas() {
        return salasPermitidas;
    }

    function listarTurnosPermitidos() {
        return turnosAceptados;
    }

    function contar() {
        return reservas.length;
    }

    function buscarPorId(id) {
        return reservas.find(reserva => reserva.id === id);
    }

    function crear(datosValidados) {
        const ultimoId = reservas.length > 0 ? reservas[reservas.length - 1].id : 0;
        const nuevaReserva = { id: ultimoId + 1, ...datosValidados };
        reservas.push(nuevaReserva);
        return nuevaReserva;
    }

    return { listar, listarReservasPermitidas, listarTurnosPermitidos, contar, buscarPorId, crear };
}

module.exports = { crearServicioReservas };