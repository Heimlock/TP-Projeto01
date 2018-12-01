router.post('/listarQuarto', function(req, res, next){
    var input       =   req.body;
    var querySTR    =   'SELECT I.url as Imagem, Q.ID as ID, Q.Titulo as Titulo, Q.Descricao as Descricao, Q.Preco as Preco FROM Imagens I, Quartos Q, ImagensQuarto IQ WHERE I.ID = IQ.ID_Imagem AND ' +
                        'Q.ID = IQ.ID_Quarto AND' +
                        'IQ.ID_Quarto IN (' +
                        '   SELECT ID_Quarto FROM Estadia WHERE' +
                                input.dataIN + '<= PrevSaida AND' +
                                input.dataOUT + '>= DataEntrada)';

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

router.post('/insere', function (req, res, next) {
    var input = req.body;
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Estadia SET ? ", input, function (err, rows) {
            if (err)
                res.json({ status: 'ERROR', data: + err });
            else
                res.json({ status: 'OK', data: 'Incluído com sucesso!' });
        });
    });
});