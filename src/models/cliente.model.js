const sql = require('../config/database');

const Cliente = function(cliente) {
    this.idcliente = cliente.idcliente;
    this.nombre = cliente.nombre;
    this.apellido = cliente.apellido;
    this.direccion = cliente.direccion;
    this.ciudad = cliente.ciudad;
};

Cliente.getAll = (result) => {
    sql.query("SELECT * FROM clientes", (err, results) => {
        if (err) { result(err, null); return; }
        result(null, results);
    });
};

Cliente.findById = (id, result) => {
    sql.query("SELECT * FROM clientes WHERE idcliente = ?", [id], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.length) { result(null, res[0]); return; }
        result({ kind: "not_found" }, null);
    });
};

Cliente.create = (newCliente, result) => {
    sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
        if (err) { result(err, null); return; }
        newCliente.idcliente = res.insertId;
        result(null, { ...newCliente });
    });
};

Cliente.updateById = (id, cliente, result) => {
    sql.query(
        "UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, ciudad = ? WHERE idcliente = ?",
        [cliente.nombre, cliente.apellido, cliente.direccion, cliente.ciudad, id],
        (err, res) => {
            if (err) { result(err, null); return; }
            if (res.affectedRows == 0) { result({ kind: "not_found" }, null); return; }
            result(null, { idcliente: id, ...cliente });
        }
    );
};

Cliente.remove = (id, result) => {
    sql.query("DELETE FROM clientes WHERE idcliente = ?", [id], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.affectedRows == 0) { result({ kind: "not_found" }, null); return; }
        result(null, res);
    });
};

module.exports = Cliente;
