const ClienteModel = require('../models/cliente.model');
const response = require('../helpers/response');

const parseId = (param) => {
    const id = parseInt(param, 10);
    return isNaN(id) || id <= 0 ? null : id;
};

exports.findAll = (req, res) => {
    ClienteModel.getAll((err, data) => {
        if (err) return response.error(res, 'Ha ocurrido un error al obtener los clientes.', 500, 'ERROR_INTERNO');
        return response.success(res, data, 'Clientes obtenidos exitosamente.');
    });
};

exports.findOne = (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return response.error(res, 'El id debe ser un número entero positivo.', 400, 'PARAMETRO_INVALIDO');

    ClienteModel.findById(id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                return response.error(res, `Cliente con id ${id} no encontrado.`, 404, 'RECURSO_NO_ENCONTRADO');
            return response.error(res, `Error al obtener el cliente con id ${id}.`, 500, 'ERROR_INTERNO');
        }
        return response.success(res, data, 'Cliente obtenido exitosamente.');
    });
};

exports.create = (req, res) => {
    if (!req.body) return response.error(res, 'El cuerpo de la solicitud no puede estar vacío.', 400, 'DATOS_INVALIDOS');

    const cliente = new ClienteModel({
        idcliente: 0,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
    });

    ClienteModel.create(cliente, (err, data) => {
        if (err) return response.error(res, 'Ha ocurrido un error al crear el cliente.', 500, 'ERROR_INTERNO');
        return response.success(res, data, 'Cliente creado exitosamente.', 201);
    });
};

exports.update = (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return response.error(res, 'El id debe ser un número entero positivo.', 400, 'PARAMETRO_INVALIDO');
    if (!req.body) return response.error(res, 'El cuerpo de la solicitud no puede estar vacío.', 400, 'DATOS_INVALIDOS');

    ClienteModel.updateById(id, new ClienteModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                return response.error(res, `Cliente con id ${id} no encontrado.`, 404, 'RECURSO_NO_ENCONTRADO');
            return response.error(res, `Error al actualizar el cliente con id ${id}.`, 500, 'ERROR_INTERNO');
        }
        return response.success(res, data, 'Cliente actualizado exitosamente.');
    });
};

exports.delete = (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return response.error(res, 'El id debe ser un número entero positivo.', 400, 'PARAMETRO_INVALIDO');

    ClienteModel.remove(id, (err) => {
        if (err) {
            if (err.kind === 'not_found')
                return response.error(res, `Cliente con id ${id} no encontrado.`, 404, 'RECURSO_NO_ENCONTRADO');
            return response.error(res, `Error al eliminar el cliente con id ${id}.`, 500, 'ERROR_INTERNO');
        }
        return res.status(204).send();
    });
};
