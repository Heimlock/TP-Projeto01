var express = require('express');
var router = express.Router();

    router.post('/totalNumbers', function (req, res, next){
        var input   = req.body;
        req.getConnection(function (err, connection){
            var query;
            var queryClientes   =   "SELECT Count(*) as qnt FROM Clientes";
            var queryQuartos    =   "SELECT Count(*) as qnt FROM Quartos";
            var queryCamas      =   "SELECT Count(*) as qnt FROM Camas";
            var queryOcupacao   =   "SELECT Count(*) as qnt FROM Estadia "  +
                                    "WHERE	((Timestamp('current_date()') >= DataEntrada) AND " +
                                            "(Timestamp('current_date()') <= PrevSaida))";

            console.log( "Info/totalnumber: " + input.sel );
            if( input.sel   ==  "Clientes"  )       query   =   queryClientes;
            else if( input.sel   ==  "Quartos" )    query   =   queryQuartos;
            else if( input.sel   ==  "Camas" )      query   =   queryCamas;
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

    // router.get('/verifyAdmin', function (req, res, next){
    //     req.getConnection(function (err, connection){
    //         console.log("Login:" + req.session.login);
    //     var queryGerente    =   "SELECT * FROM Gerentes WHERE Usuario='" + req.session.login + "'";
    //     connection.query(queryGerente, function (err, rows){
    //         if (err)
    //             res.json({ status: 'ERRO', data: + err + "asdasd" });
    //         else
    //         {
    //             if(rows[0] === undefined)
    //             {
    //                 res.json({  status: 'SEM_ACESSO',
    //                             data: 'Usuário não tem as Permissões necessárias!'
    //                         });
    //             }
    //             else
    //             {
    //                 res.json({  status: 'OK', 
    //                             data:   'Acesso Permitido!'
    //                         });
    //             }
    //         }
    //         });
    //     });
    // });

    // router.post('/logout', function (req, res, next){
    //     req.session.destroy(function (err){
    //         if (err)
    //             res.json({  status: 'ERRO', 
    //                         data:   + err 
    //                     });
    //         else
    //             res.json({  status: 'OK', 
    //                         data:   'Logout com sucesso!'
    //                     });
    //     });
    // });

module.exports = router;
