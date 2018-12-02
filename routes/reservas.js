var express = require('express');
var router = express.Router();

router.get('/lista', function (req, res, next) {
    var query   =   "SELECT * FROM Estadia";
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

// COD, ID_Cliente, ID_Quarto, DataEntrada, PrevSaida, Motivo
router.get('/listaReserva', function(req, res, next){
    var query   =   `SELECT E.COD as COD, C.ID as ID_Cliente, E.ID_Quarto as ID_Quarto,`            + 
                    ` E.DataEntrada as DataEntrada, E.PrevSaida as PrevSaida, E.Motivo as Motivo`   + 
                    ` FROM Estadia E, Clientes C WHERE E.COD=${req.query.COD} AND E.ID_Cliente=C.ID`;
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

//  Listar Camas Disponiveis dentro do Intervalo DataIn e DataOUT
router.post('/listaDisp', function(req, res, next){
        var input       =   req.body;
        // var querySTR    =   'SELECT C.ID as ID, C.Preco as Preco, CQ.ID_Quarto as Quarto FROM Camas C, CamasQuarto CQ WHERE C.ID = CQ.ID_Cama AND ' +
        //                     'ID NOT IN (' +
        //                     '   SELECT ID_Cama from Estadia where ID_Cama IN (' +
        //                     '       SELECT ID_Cama FROM Estadia WHERE (' +
        //                     '           ( Timestamp("' + input.dataIN + '") <= PrevSaida )    AND' +
        //                     '           ( Timestamp("' + input.dataOUT + '") > DataEntrada )' +
        //                     '       )' +
        //                     '   )' +
        //                     ')';
        var querySTR        =   `SELECT * FROM Quartos where ID IN` +
                                `(	SELECT ID_Quarto FROM Estadia` +
                                `    WHERE ID_Quarto NOT IN ` +
                                `    (	SELECT ID_Quarto FROM Estadia ` +
                                `        WHERE ( ( Timestamp(${input.dataIN}) <= PrevSaida )` +
                                `                AND` +
                                `                ( Timestamp(${input.dataOUT}) >= DataEntrada ))` +
                                `    ) GROUP by ID_Quarto` +
                                `)`;

        req.getConnection( function( err, connection ){
            var query = connection.query( querySTR, function(err, rows){
                if( err )
                    res.json({ status:'ERROR', data: err });
                else
                    res.json({ status:'OK', data: rows });
            });
            if( err )
            res.json({ status:'ERROR', data: err });
        });
    });

//  Listar Estadia Atual de Um dado Cliente
router.get('/estadiaCliente', function(req, res, next){
    // var query   = `SELECT ID, Nome, Cpf, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email, Telefone, Motivo FROM Clientes WHERE ID=${req.query.ID}`;
    // var query   =   `SELECT E.COD as COD, E.ID_Cliente as Cliente, E.ID_Cama as Cama, CQ.ID_Quarto as Quarto, DataEntrada as DataIN, `  +
    //                 `PrevSaida as DataOUT, Motivo FROM Estadia E, CamasQuarto CQ WHERE CQ.ID_Cama=E.ID_Cama AND E.ID_Cliente=${req.query.ID}`;
    var query       =   `SELECT * FROM Estadia WHERE ID_Cliente=${req.query.ID}`;
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

module.exports = router;
