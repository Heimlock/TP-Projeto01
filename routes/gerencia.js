var express = require('express');
var router = express.Router();

    router.get('/verifyAdmin', function (req, res, next){
        req.getConnection(function (err, connection){
            console.log("Login:" + req.session.login);
        var queryGerente    =   "SELECT * FROM Gerentes WHERE Usuario='" + req.session.login + "'";
        connection.query(queryGerente, function (err, rows){
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else
            {
                if(rows[0] === undefined)
                {
                    res.json({  status: 'SEM_ACESSO',
                                data: 'Usuário não tem as Permissões necessárias!'
                            });
                }
                else
                {
                    res.json({  status: 'OK', 
                                data:   'Acesso Permitido!'
                            });
                }
            }
            });
        });
    });

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
