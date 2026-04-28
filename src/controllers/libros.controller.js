const LibroModel = require('../models/libro.model');
const response = require('../helpers/response');

exports.findAll = (req, res) => {
    LibroModel.getAll((err, data) => {
        if (err) {
            return response.error(res, err.message || JSON.stringify(err), 500, 'ERROR_INTERNO');
        }
        return response.success(res, data, 'Libros obtenidos exitosamente.');
    });
};

exports.findOne = (req, res) => {
    const isbn = req.params.isbn;

    LibroModel.findByISBN(isbn, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                return response.error(res, `Libro con ISBN ${isbn} no encontrado.`, 404, 'RECURSO_NO_ENCONTRADO');
            return response.error(res, `Error al obtener el libro con ISBN ${isbn}.`, 500, 'ERROR_INTERNO');
        }
        return response.success(res, data, 'Libro obtenido exitosamente.');
    });
};

exports.create = (req, res) => {
    if (!req.body) return response.error(res, 'El cuerpo de la solicitud no puede estar vacío.', 400, 'DATOS_INVALIDOS');

    const libro = new LibroModel({
        isbn: req.body.isbn,
        autor: req.body.autor,
        titulo: req.body.titulo,
        precio: req.body.precio,
    });

    LibroModel.create(libro, (err, data) => {
        if (err) return response.error(res, 'Ha ocurrido un error al crear el libro.', 500, 'ERROR_INTERNO');
        return response.success(res, data, 'Libro creado exitosamente.', 201);
    });
};

exports.update = (req, res) => {
    const isbn = req.params.isbn;
    if (!req.body) return response.error(res, 'El cuerpo de la solicitud no puede estar vacío.', 400, 'DATOS_INVALIDOS');

    LibroModel.updateByISBN(isbn, new LibroModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                return response.error(res, `Libro con ISBN ${isbn} no encontrado.`, 404, 'RECURSO_NO_ENCONTRADO');
            return response.error(res, `Error al actualizar el libro con ISBN ${isbn}.`, 500, 'ERROR_INTERNO');
        }
        return response.success(res, data, 'Libro actualizado exitosamente.');
    });
};

exports.delete = (req, res) => {
    const isbn = req.params.isbn;

    LibroModel.remove(isbn, (err) => {
        if (err) {
            if (err.kind === 'not_found')
                return response.error(res, `Libro con ISBN ${isbn} no encontrado.`, 404, 'RECURSO_NO_ENCONTRADO');
            return response.error(res, `Error al eliminar el libro con ISBN ${isbn}.`, 500, 'ERROR_INTERNO');
        }
        return res.status(204).send();
    });
};
