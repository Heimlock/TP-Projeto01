var express = require('express');
var router = express.Router();

router.post('/totalNumbers', function (req, res, next){
    var input   = req.body;
    req.getConnection(function (err, connection){
        var query;
        var queryClientes   =   "SELECT Count(*) as qnt FROM Clientes";
        var queryQuartos    =   "SELECT Count(*) as qnt FROM Quartos";
        var queryOcupacao   =   "SELECT Count(*) as qnt FROM Estadia "  +
                                "WHERE	((Timestamp('current_date()') >= DataEntrada) AND " +
                                        "(Timestamp('current_date()') <= PrevSaida))";

        console.log( "Info/totalnumber: " + input.sel );
        if( input.sel   ==  "Clientes"  )       query   =   queryClientes;
        else if( input.sel   ==  "Quartos" )    query   =   queryQuartos;
        else if( input.sel   ==  "Ocupacao" )   query   =   queryOcupacao;
        else {
            res.json({ status: 'ERRO', data: "Not a Valid Request"});
            return;
        }
        //  Consulta
        connection.query(query, function (err, rows){
            if (err)
            {
                res.json({ status: 'ERRO', data: + err});
            }
            else
            {
                if(rows[0] === undefined)
                {
                    res.json({  status: 'OK',
                                data:   {   tipo:   input.sel,
                                            qnt:    0
                                        }

                            });
                }
                else
                {
                    res.json({  status: 'OK',
                                data:   {   tipo:   input.sel,
                                            qnt:    rows[0].qnt
                                        }
                            });
                }
            }
        });
    });
});

router.get('/lotacaoQuarto', function(req, res, next){
    var query   = `SELECT Q.qntCamas as qntCamas, E.lotacao as lotacao `  +
                  `FROM Clientes C, (`                                    +
                  ` SELECT COUNT(*) FROM Estadia `                        +
                  ` WHERE ( `                                             +
                  `      ( Timestamp('current_date()') <  PrevSaida ) `   +
                  `       AND `                                           +
                  `       ( Timestamp('current_date()') >= DataEntrada )` +
                  `       AND ID_Quarto=${req.query.ID_Quarto}) `         +
                  `) E `                                                  +
                  `WHERE C.ID=${req.query.ID_Quarto}`;

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
