var express = require('express');
var router = express.Router();

    router.post('/login', function (req, res, next){
        var input   = req.body;

        req.getConnection(function (err, connection){
        // var queryCliente    =   "SELECT * FROM Clientes WHERE CPF='" + input.login + "' AND Senha='" + input.senha + "'";
        // var queryGerente    =   "SELECT * FROM Gerentes WHERE Usuario='" + input.login + "' AND Senha='" + input.senha + "'";

        var query   =   "SELECT ID, Cpf as login FROM Clientes WHERE Cpf='" + input.login + "' AND Senha='" + input.senha  + "'" +
                        "UNION " +
                        "SELECT ID, Usuario as login FROM Gerentes WHERE Usuario='" + input.login + "' AND Senha='" + input.senha + "'";

        // SELECT id, nome  FROM clientes WHERE cpf = 1111 AND senha = sdfsdfsdf
        // UNION
        // SELECT id, nome FROM ADM WHERE cpf = 1111 AND senha = sdfsdfsdf
        connection.query(query, function (err, rows){
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else
            {
                if(rows[0] === undefined)
                {
                    res.json({  status: 'ERRO',
                                data: 'Dados de login incorretos!'
                            });
                }
                else
                {
                    // console.log("login:" + rows[0].login);
                    req.session.logado  =   true;
                    req.session.login   =   rows[0].login;

                    res.json({  status: 'OK',
                                data:   'Logado com sucesso!'
                            });
                }
            }
            });
        });
    });

    router.get('/status', function (req, res, next){
        req.getConnection(function (err, connection){
            if (req.session.logado)
            {
                res.json({  status: 'OK',
                            data:   req.session.login
                        });
            }
            else
            {
                res.json({  status: 'ERRO',
                            data:   'Usuário não efetuou o Login'
                        });
            }
        });
    });

    router.get('/userData', function (req, res, next){
        req.getConnection(function (err, connection){
            var query   =   "SELECT Nome, Cpf as login FROM Clientes WHERE Cpf='" + req.session.login + "'"+
                            "UNION " +
                            "SELECT Nome, Usuario as login FROM Gerentes WHERE Usuario='" + req.session.login + "'";
            connection.query(query, function (err, rows){
                if (err)
                    res.json({ status: 'ERRO', data: + err });
                else
                {
                    if(rows[0] === undefined)
                    {
                        res.json({  status: 'ERRO',
                                    data: 'Dados de login incorretos!'
                                });
                    }
                    else
                    {
                        // console.log("login:" + rows[0]);
                        res.json({  status: 'OK',
                                    data:   rows[0]
                                });
                    }
                }
            });
        });
    });

// function    verifyAdmin( input )
// {
//     var queryGerente    =   "SELECT * FROM Gerentes WHERE Usuario='" + input.login + "' AND Senha='" + input.senha + "'";
//     connection.query(query, function (err, rows){
//         if (err)
//             res.json({ status: 'ERRO', data: + err });
//         else
//         {
//             if(rows[0] === undefined)
//             {
//                 req.session.isAdmin =   true;
//             }
//             else
//             {
//                 req.session.isAdmin =   false;
//             }
//         }
//     });
// }

/*
    router.post('/loginCliente', function (req, res, next){
        var input   = req.body;

        req.getConnection(function (err, connection){
        var queryCliente    =   "SELECT * FROM Clientes WHERE CPF='" + input.login + "' AND Senha='" + input.senha + "'";
        // var queryGerente    =   "SELECT * FROM Gerentes WHERE Usuario='" + input.login + "' AND Senha='" + input.senha + "'";

        // SELECT id, nome  FROM clientes WHERE cpf = 1111 AND senha = sdfsdfsdf
        // UNION
        // SELECT id, nome FROM ADM WHERE cpf = 1111 AND senha = sdfsdfsdf


        connection.query(queryCliente, function (err, rows){
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else
            {
                if(rows[0] === undefined)
                {
                    res.json({  status: 'ERRO',
                                data: 'Dados de login incorretos!'
                            });
                }
                else
                {
                    done    =   true;

                    req.session.logado  =   true;
                    req.session.login   =   rows[0].login;
                    res.json({  status: 'OK',
                                data:   'Cliente - Logado com sucesso!'
                            });
                }
            }
            });
        });
    });

    router.post('/loginGerente', function (req, res, next){
        var input   = req.body;

        req.getConnection(function (err, connection){
        // var queryCliente    =   "SELECT * FROM Clientes WHERE CPF='" + input.login + "' AND Senha='" + input.senha + "'";
        var queryGerente    =   "SELECT * FROM Gerentes WHERE Usuario='" + input.login + "' AND Senha='" + input.senha + "'";

        connection.query(queryGerente, function (err, rows){
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else
            {
                if(rows[0] === undefined)
                {
                    res.json({  status: 'ERRO',
                                data: 'Dados de login incorretos!'
                            });
                }
                else
                {
                    done    =   true;

                    req.session.logado  =   true;
                    req.session.login   =   rows[0].login;
                    res.json({  status: 'OK',
                                data:   'Gerente - Logado com sucesso!'
                            });
                }
            }
            });
        });
    });
*/
    router.post('/logout', function (req, res, next){
        req.session.destroy(function (err){
            if (err)
                res.json({  status: 'ERRO',
                            data:   + err
                        });
            else
                res.json({  status: 'OK',
                            data:   'Logout com sucesso!'
                        });
        });
    });

module.exports = router;
