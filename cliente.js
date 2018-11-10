var express = require('express');
var router = express.Router();

router.get('/lista', function (req, res) {
    if (req.session.logado){
        req.getConnection(function (err, connection) {
            var query = connection.query("SELECT * FROM Clientes", function (err, rows) {
                if (err)
                    res.json({ status: 'ERROR', data: err });
                else
                    res.json({ status: 'OK', data: rows });
            });
        
            if (err)
                res.json({ status: 'ERROR', data: err });
        });
    }
    else{
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.post('/insere',function (req, res, next) {
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

router.post('/deleta', function(req,res){
    req.getConnection(function(err,connection){
        var query = connection.query("DELETE FROM Clientes WHERE id=" +id, function(err){
            if(err)
                res.json({ status: 'Cliente Nao Removido!', data: err});
            else   
                res.json({ status: 'Cliente Removido Com Sucesso!'});
        });

        if(err)
            res.json({ status: 'ERROR', data: err});
    });
});

router.post('/altera', function(req,res){
    req.getConnection(function(err,connection){
        var query = connection.query("UPDATE Cliente SET ? WHERE id = ?", [input,id], function(err,rows){
            if(err)
                res.json({ status: 'Cliente Nao Alterado!', data: err});
            else
                res.json({ status: 'Cliente Alterado Com Sucesso!'});
       });

       if(err)
            res.json({ status: 'ERROR', data: err});
    });
});
   
module.exports = router;