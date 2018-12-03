var express = require('express');
var router = express.Router();

router.post('/novaReserva', function (req, res, next)
{  // Cpf DataIn DataOUT DataOUT ID_Quarto QntCamas
    var input   =   req.body;
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Estadia SET ? ", input, function (err, rows) {
                if (err)
                    res.json({ status: 'ERROR', data: + err });
                else
                    res.json({ status: 'OK', data: 'Incluído com sucesso!' });
                });
        });
    });

router.post('/fecharReserva', function(req, res, next){
    var cod = req.query.COD;  //  Recupera o Valor passado durante requisição
    req.getConnection( function( err, connection ){
        connection.query( "DELETE FROM Estadia WHERE COD=" + cod, function(err, rows){
            if( err )
                res.json({ status:'ERRO', data: err });
            else
                res.json({ status:'OK', data: "Finalizada com Sucesso" });
        });
        if( err )
        res.json({ status:'ERROR', data: err });
    });
});


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

router.get('/listaReservasAtivas', function (req, res, next) {
    var query   =   "SELECT * FROM Estadia WHERE DataEntrada<NOW()";
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

router.get('/listaReserva', function(req, res, next){
    var query   =   `SELECT E.COD as COD, C.ID as ID_Cliente, C.Cpf as Cpf, C.Nome as NomeCliente, `  +
                    ` E.ID_Quarto as ID_Quarto, Q.Titulo as Titulo, E.qntCamas as qntCamas, `         +
                    ` E.DataEntrada as DataEntrada, E.PrevSaida as PrevSaida, E.Motivo as Motivo`     +
                    ` FROM Estadia E, Clientes C, Quartos Q WHERE E.COD=${req.query.COD} AND E.ID_Cliente=C.ID AND Q.ID=E.ID_Quarto`;
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

router.get('/custoEstadia', function(req, res, next){
    var query   =   `SELECT	ROUND((E.qntCamas * Q.Preco * (TIMESTAMPDIFF(DAY, E.DataEntrada, NOW()))), 2) as Custo, `+
      	            `(TIMESTAMPDIFF(DAY, E.DataEntrada, NOW())) as Dias, `                                           +
                    ` E.DataEntrada as Entrada, NOW() as Saida`                                                      +
                    ` FROM Estadia E, Clientes C, Quartos Q `                                                        +
                    ` WHERE E.ID_Cliente=C.ID AND E.ID_Quarto=Q.ID AND `                                             +
                    ` C.Cpf=${req.query.CPF} AND E.DataEntrada<NOW();`;

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

router.post('/prevCusto', function(req, res, next){
    var input       =   req.body;
    var query       =   `SELECT	ROUND((CAST(${input.qntCamas} AS SIGNED) * Preco * (TIMESTAMPDIFF(DAY, TIMESTAMP('${input.dataIN}'), TIMESTAMP('${input.dataOUT}')))), 2) as Custo ` +
                        `FROM Quartos ` +
                        `WHERE ID=${input.ID_Quarto}`;

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

router.post('/findCliente', function(req, res, next){
        var input       =   req.body;
        var querySTR;

        if( input.id === 'nome' )
          querySTR    =   `SELECT * FROM Clientes where Nome='${input.key}'`;
        else if( input.id === 'cpf' )
          querySTR    =   `SELECT * FROM Clientes where Cpf=${input.key}`;

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

router.post('/findReserva', function(req, res, next){
        var input       =   req.body;
        var querySTR;

        if( input.id === 'cpf' )
          querySTR    =   `SELECT E.COD as COD, C.Cpf as Cpf, E.qntCamas as qntCamas, Q.Titulo as Titulo `+
                          `FROM Estadia E, Clientes C, Quartos Q `            +
                          `WHERE E.ID_Cliente=C.ID AND E.ID_Quarto=Q.ID AND ` +
                          `C.Cpf="${input.key}" AND E.DataEntrada<NOW()`;
        else if( input.id === 'reservas' )
          querySTR    =   `SELECT E.COD as COD, C.Cpf as Cpf, E.qntCamas as qntCamas, Q.Titulo as Titulo `+
                          `FROM Estadia E, Clientes C, Quartos Q `            +
                          `WHERE E.ID_Cliente=C.ID AND E.ID_Quarto=Q.ID AND ` +
                          `E.COD="${input.key}" AND E.DataEntrada<NOW()`;

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

//  Listar Camas Disponiveis dentro do Intervalo DataIn e DataOUT
router.post('/listaDisp', function(req, res, next){
        var input       =   req.body;
        var querySTR    = "SELECT * FROM Quartos " +
                          "WHERE ID IN " +
                          "(   SELECT ID_Quarto FROM Estadia " +
                          "    WHERE ID_Quarto NOT IN "  +
                          "    	( "  +
                          "    		SELECT ID_Quarto FROM Estadia " +
                          "    		WHERE " +
                          `    		(   ( Timestamp('${input.dataIN}') <  PrevSaida ) ` +
                          "    				AND "  +
                          `    				( Timestamp('${input.dataOUT}') >= DataEntrada ) `  +
                          "    		) " +
                          "    	) "  +
                          "    UNION " +
                          "    SELECT X.ID_Quarto "  +
                          "    FROM "  +
                          "    (	SELECT E.DataEntrada, E.PrevSaida, E.ID_Quarto, (Q.qntCamas - E.QntCamas) as CamasLivres " +
                          "    	FROM Estadia E, Quartos Q "  +
                          "    	WHERE "  +
                          `    	(	( Timestamp('${input.dataIN}') <  PrevSaida ) `  +
                          "    		AND " +
                          `    		( Timestamp('${input.dataOUT}') >= DataEntrada ) `  +
                          "    		AND Q.ID=ID_Quarto "  +
                          "    	) "  +
                          "    ) X " +
                          "    WHERE " +
                          "    X.CamasLivres>0 "+
                          ")";

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
    // COD, ID_Cliente, ID_Quarto, qntCamas, DataEntrada, PrevSaida, Motivo
    var query       =   `SELECT E.COD as COD, E.ID_Cliente as ID_Cliente, E.ID_Quarto as ID_Quarto, E.qntCamas as qntCamas, `     +
                        ` E.DataEntrada as DataEntrada, E.PrevSaida as PrevSaida, E.Motivo as Motivo FROM Estadia E, Clientes C ` +
                        ` WHERE C.Cpf=${req.query.CPF} AND E.ID_Cliente=C.ID`
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
