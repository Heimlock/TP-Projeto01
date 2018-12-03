-- INSERT INTO Camas   ( Preco ) VALUES
-- ( 10 ),
-- ( 20 ),
-- ( 30 ),
-- ( 40 );

INSERT INTO Quartos ( Titulo, QntCamas, Preco ) VALUES
( "Quarto01", 1, 10.10 ),
( "Quarto02", 2, 20 ),
( "Quarto03", 3, 30 ),
( "Quarto04", 4, 999.99 );

-- INSERT INTO CamasQuarto ( ID_Cama, ID_Quarto ) VALUES
-- ( 01, 01 ),
-- ( 02, 02 ),
-- ( 03, 01 ),
-- ( 04, 02 );

-- Nome, Cpf, Senha, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email,  Telefone, Motivo
INSERT INTO Clientes    (   Nome, Cpf, Senha, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email,  Telefone  ) VALUES
( "Cliente01", "10000000000", "123456", TIMESTAMP("2001-01-01"), "M", 10000001, "Rua 01", "Cidade01", "SP", "01@email.com", "19900000001" ),
( "Cliente02", "20000000000", "123456", TIMESTAMP("2002-02-02"), "F", 10000010, "Rua 02", "Cidade02", "AC", "02@email.com", "19900000002" ),
( "Cliente03", "30000000000", "123456", TIMESTAMP("2003-03-03"), "M", 10000011, "Rua 03", "Cidade03", "MG", "03@email.com", "19900000003" ),
( "Cliente04", "40000000000", "123456", TIMESTAMP("2004-04-04"), "F", 10000100, "Rua 04", "Cidade04", "MS", "04@email.com", "19900000004" ),
( "Cliente05", "50000000000", "123456", TIMESTAMP("2005-05-05"), "M", 10000101, "Rua 05", "Cidade05", "RJ", "05@email.com", "19900000005" ),
( "Cliente06", "60000000000", "123456", TIMESTAMP("2006-06-06"), "F", 10000110, "Rua 06", "Cidade06", "RS", "06@email.com", "19900000006" ),
( "Cliente07", "70000000000", "123456", TIMESTAMP("2007-07-07"), "M", 10000111, "Rua 07", "Cidade07", "TO", "07@email.com", "19900000007" ),
( "Cliente08", "80000000000", "123456", TIMESTAMP("2008-08-08"), "F", 10001000, "Rua 08", "Cidade08", "DF", "08@email.com", "19900000008" ),
( "Cliente09", "90000000000", "123456", TIMESTAMP("2009-09-09"), "M", 10001001, "Rua 09", "Cidade09", "GO", "09@email.com", "19900000009" ),
( "Cliente10", "11000000000", "123456", TIMESTAMP("2010-10-10"), "F", 10001010, "Rua 10", "Cidade10", "BH", "10@email.com", "19900000010" );

INSERT INTO Gerentes    ( Nome, Usuario, Senha ) VALUES
( "Adm_Nome01", "admin01", "123456" ),
( "Adm_Nome02", "admin02", "123456" );

INSERT INTO Estadia ( ID_Cliente, ID_Quarto, DataEntrada, PrevSaida, qntCamas, Motivo ) VALUES
( 01, 01, TIMESTAMP("2018-12-01"), TIMESTAMP("2018-12-05"), 1, "F" ),
( 02, 02, TIMESTAMP("2018-12-02"), TIMESTAMP("2018-12-06"), 2, "N" ),
( 03, 03, TIMESTAMP("2018-12-04"), TIMESTAMP("2018-12-09"), 3, "C" ),
( 04, 04, TIMESTAMP("2018-12-05"), TIMESTAMP("2018-12-10"), 4, "E" ),
( 01, 01, TIMESTAMP("2018-12-11"), TIMESTAMP("2018-12-15"), 1, "S" ),
( 02, 02, TIMESTAMP("2018-12-12"), TIMESTAMP("2018-12-16"), 1, "O" ),
( 03, 03, TIMESTAMP("2018-12-14"), TIMESTAMP("2018-12-19"), 1, "F" ),
( 04, 04, TIMESTAMP("2018-12-15"), TIMESTAMP("2018-12-20"), 1, "N" );
