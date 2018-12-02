var express = require('express');
var router = express.Router();

// router.get('/lista', function(req, res, next){
//             req.getConnection( function( err, connection ){
//                 var query = connection.query( "SELECT * FROM cliente", function(err, rows){
//                     if( err )
//                         res.json({ status:'ERROR', data: err });
//                     else
//                         res.json({ status:'OK', data: rows });
//                 });
//                 if( err )
//                 res.json({ status:'ERROR', data: err });
//             });
//         });

router.get('/lista', function (req, res, next) {
        var query   =   "SELECT ID, Nome, Cpf, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email, Telefone FROM Clientes";
        if (req.session.logado)
        {
            req.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else
                res.json({ status: 'OK', data: rows });
            });
            if (err)
                res.json({ status: 'ERRO', data: + err });
            });
        }
        else
        {
            res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
        }
    });

    router.get('/listaCliente', function(req, res, next){
        // var query   = "SELECT ID, Nome, Cpf, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email, Telefone, Motivo FROM Clientes ID = ?";
        // var id      = req.query.id;
        var query   = `SELECT ID, Nome, Cpf, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email, Telefone FROM Clientes WHERE ID=${req.query.ID}`;
        req.getConnection( function( err, connection ){
            // var conn = connection.query( query, id, function(err, rows){
            var conn = connection.query( query, function(err, rows){
                if( err )
                    res.json({ status:'ERROR', data: err });
                else
                    res.json({ status:'OK', data: rows });
            });
            if( err )
            res.json({ status:'ERROR', data: err });
        });
    });

    router.get('/verifCliente', function(req, res, next){
        var query   = `SELECT ID, Nome, Cpf FROM Clientes WHERE Cpf=${req.query.CPF}`;
        req.getConnection( function( err, connection ){
            var conn = connection.query( query, function(err, rows){
                if( err )
                    res.json({ status:'ERROR', data: err });
                else
                    res.json({ status:'OK', data: rows });
            });
            if( err )
            res.json({ status:'ERROR', data: err });
        });
    });

router.post('/deleta', function(req, res, next){
    var id = req.query.id;  //  Recupera o Valor passado durante requisição
    req.getConnection( function( err, connection ){
        var query = connection.query( "DELETE FROM Clientes WHERE id = " + id, function(err, rows){
            if( err )
                res.json({ status:'ERROR', data: err });
            else
                res.json({ status:'OK', data: "Excluído com Sucesso" });
        });
        if( err )
        res.json({ status:'ERROR', data: err });
    });
});

router.post('/insere', function (req, res, next) {
    var input = req.body;
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Clientes SET ? ", input, function (err, rows) {
                if (err)
                    res.json({ status: 'ERROR', data: + err });
                else
                    res.json({ status: 'OK', data: 'Incluído com sucesso!' });
                });
        });
    });

router.post('/altera', function (req, res, next) {
    var input = req.body;
    var id    = req.query.ID;

    req.getConnection(function (err, connection) {
        var query = connection.query("UPDATE Clientes SET ? WHERE ID = ?", [input,id], function (err, rows) {
                if (err)
                    res.json({ status: 'ERROR', data: + err });
                else
                    res.json({ status: 'OK', data: 'Alterado com sucesso!' });
                });
        });
    });

module.exports = router;
