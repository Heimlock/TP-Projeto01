var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next){
    var input   = req.body;

    req.getConnection(function (err, connection){
    var query   =   "SELECT ID, Cpf as login FROM Clientes WHERE Cpf='" + input.login + "' AND Senha='" + input.senha  + "'" +
                    "UNION " +
                    "SELECT ID, Usuario as login FROM Gerentes WHERE Usuario='" + input.login + "' AND Senha='" + input.senha + "'";
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
                    res.json({  status: 'OK',
                                data:   rows[0]
                            });
                }
            }
        });
    });
});

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
