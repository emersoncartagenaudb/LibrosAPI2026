const sql = require('../config/database');

const Libro = function(libro) {
    this.isbn = libro.isbn;
    this.autor = libro.autor;
    this.titulo = libro.titulo;
    this.precio = libro.precio;
};

Libro.getAll = (result) => {
    sql.query("SELECT * FROM libros ORDER BY titulo ASC", (err, results) => {
        if (err) { result(err, null); return; }
        result(null, results);
    });
};

Libro.findByISBN = (isbn, result) => {
    sql.query("SELECT * FROM libros WHERE isbn = ?", [isbn], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.length) { result(null, res[0]); return; }
        result({ kind: "not_found" }, null);
    });
};

Libro.create = (newLibro, result) => {
    sql.query("INSERT INTO libros SET ?", newLibro, (err, res) => {
        if (err) { result(err, null); return; }
        result(null, { ...newLibro });
    });
};

Libro.updateByISBN = (isbn, libro, result) => {
    sql.query(
        "UPDATE libros SET autor = ?, titulo = ?, precio = ? WHERE isbn = ?",
        [libro.autor, libro.titulo, libro.precio, isbn],
        (err, res) => {
            if (err) { result(err, null); return; }
            if (res.affectedRows == 0) { result({ kind: "not_found" }, null); return; }
            result(null, { isbn, ...libro });
        }
    );
};

Libro.remove = (isbn, result) => {
    sql.query("DELETE FROM libros WHERE isbn = ?", [isbn], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.affectedRows == 0) { result({ kind: "not_found" }, null); return; }
        result(null, res);
    });
};

module.exports = Libro;
