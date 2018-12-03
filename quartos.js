var express = require('express');
var router = express.Router();


//  Listar Todos os Quartos
router.get('/listaQuartos', function(req, res, next){
    req.getConnection( function( err, connection ){
        // var query = connection.query( "SELECT C.ID as ID, C.Preco as Preco, CQ.ID_Quarto as Quarto FROM Camas C, CamasQuarto CQ WHERE C.ID = CQ.ID_Cama", function(err, rows){
        var query = connection.query( "SELECT * FROM Quartos", function(err, rows){
            if( err )
                res.json({ status:'ERROR', data: err });
            else
                res.json({ status:'OK', data: rows });
        });
        if( err )
        res.json({ status:'ERROR', data: err });
    });
});

//  Recupera as Informações de um Dado Quarto
router.get('/listaQuarto', function(req, res, next){
    var query   = `SELECT * FROM Quartos WHERE ID=${req.query.ID}`;
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

//  Edita Quarto
router.post('/editaQuarto', function (req, res, next) {
    var input = req.body;
    var id    = req.query.ID;

    req.getConnection(function (err, connection) {
    var query = connection.query("UPDATE Quartos SET ? WHERE ID = ?", [input,id], function (err, rows) {
            if (err)
                res.json({ status: 'ERROR', data: + err });
            else
                res.json({ status: 'OK', data: 'Alterado com sucesso!' });
            });
    });
});

//  Insere Quarto
router.post('/insere', function (req, res, next) {
    var input = req.body;
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Quartos SET ? ", input, function (err, rows) {
                if (err)
                    res.json({ status: 'ERROR', data: + err });
                else
                    res.json({ status: 'OK', data: 'Incluído com sucesso!' });
                });
        });
});


module.exports = router;
