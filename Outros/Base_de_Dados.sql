
DROP	TABLE IF EXISTS 	CamasQuarto;
DROP	TABLE IF EXISTS 	ImagensQuarto;
DROP	TABLE IF EXISTS 	Estadia;

DROP	TABLE IF EXISTS 	Clientes;
DROP	TABLE IF EXISTS 	Quartos;
DROP	TABLE IF EXISTS 	Imagens;
DROP	TABLE IF EXISTS 	Camas;
DROP	TABLE IF EXISTS 	Gerentes;

--      Table Declarations
create Table Clientes	(	ID		    INT NOT NULL AUTO_INCREMENT,
							Nome   		VARCHAR(80) NOT NULL,
							Cpf         VARCHAR(11) NOT NULL,
							Senha		VARCHAR(16) NOT NULL,
                            DataNasc    TIMESTAMP,
							Sexo 		VARCHAR(1),
                            Cep         INT NOT NULL,
                            Endereco	VARCHAR(30) NOT NULL,
                            Cidade      VARCHAR(30),
                            Estado      VARCHAR(30),
                            Email       VARCHAR(80) NOT NULL,
                            Telefone    VARCHAR(11) NOT NULL,
                            -- Motivo      CHAR(1),	--	Para Estadia?
							PRIMARY KEY (ID),
							-- CONSTRAINT CHK_Cliente CHECK ((Sexo='M' OR Sexo='F') AND (Motivo='F' OR Motivo='N' OR Motivo='C' OR Motivo='E' OR Motivo='S' OR Motivo='F' OR Motivo='O'))
							CONSTRAINT CHK_Cliente CHECK (Sexo='M' OR Sexo='F')
							);

create Table Quartos	(	ID		    INT NOT NULL AUTO_INCREMENT,
							QntCamas   	INT,
							Titulo   	VARCHAR(80) NOT NULL,
							Descricao   VARCHAR(200) NOT NULL,
							Preco 		DOUBLE(5,2) NOT NULL,
							PRIMARY KEY (ID)
							);

create Table Imagens	(	ID		    INT NOT NULL AUTO_INCREMENT,
							url   		VARCHAR(80) NOT NULL,
							PRIMARY KEY (ID)
							);

-- create Table Camas	    (	ID		    INT NOT NULL AUTO_INCREMENT,
-- 							Preco 		DOUBLE(4,2) NOT NULL,
-- 							-- Estado		CHAR(1) NOT NULL,
-- 							PRIMARY KEY (ID) -- ,
-- 							-- CONSTRAINT CHK_Camas CHECK (Estado='O' OR Sexo='V')
-- 							);

create Table Gerentes    (	ID		    INT NOT NULL AUTO_INCREMENT,
							Nome   		VARCHAR(80) NOT NULL,
							Usuario		VARCHAR(32),
							Senha		VARCHAR(16),
							PRIMARY KEY (ID)
							);

--	Relacionamentos
-- create Table CamasQuarto(	COD		    INT NOT NULL AUTO_INCREMENT,
-- 							ID_Cama     INT NOT NULL,
-- 							ID_Quarto   INT NOT NULL,
-- 							PRIMARY KEY (COD),
-- 							CONSTRAINT fk_CQ_Cama	    foreign key (ID_Cama)		references Camas	(ID),
-- 							CONSTRAINT fk_CQ_Quarto	    foreign key (ID_Quarto)		references Quartos	(ID)
-- 							);

create Table ImagensQuarto(	COD		    INT NOT NULL AUTO_INCREMENT,
							ID_Quarto   INT NOT NULL,
							ID_Imagem	INT,
							PRIMARY KEY (COD),
							CONSTRAINT fk_IQ_Quarto	    foreign key (ID_Quarto)		references Quartos	(ID),
							CONSTRAINT fk_IQ_Imagem	    foreign key (ID_Imagem)		references Imagens	(ID)
							);

create Table Estadia    (	COD		    	INT NOT NULL AUTO_INCREMENT,
													ID_Cliente  INT NOT NULL,
													ID_Quarto   INT NOT NULL,
													qntCamas   	INT NOT NULL,
													DataEntrada TIMESTAMP NOT NULL,
													PrevSaida   TIMESTAMP NOT NULL,
						              Motivo      CHAR(1),
													PRIMARY KEY (COD),
													CONSTRAINT CHK_Estadia 		CHECK  (Motivo='F' OR Motivo='N' OR Motivo='C' OR Motivo='E' OR Motivo='S' OR Motivo='F' OR Motivo='O'),
													CONSTRAINT fk_Est_Cliente	foreign key (ID_Cliente)	references Clientes	(ID),
													CONSTRAINT fk_Est_Quarto	foreign key (ID_Quarto)		references Quartos	(ID)
							);

create Table OldEstadia	(	COD		    	INT NOT NULL AUTO_INCREMENT,
													ID_Cliente  INT NOT NULL,
													ID_Quarto   INT NOT NULL,
													qntCamas   	INT NOT NULL,
													DataEntrada TIMESTAMP NOT NULL,
													PrevSaida   TIMESTAMP NOT NULL,
						              Motivo      CHAR(1),
													PRIMARY KEY (COD),
													CONSTRAINT CHK_Estadia 		CHECK  (Motivo='F' OR Motivo='N' OR Motivo='C' OR Motivo='E' OR Motivo='S' OR Motivo='F' OR Motivo='O'),
													CONSTRAINT fk_Est_Cliente	foreign key (ID_Cliente)	references Clientes	(ID),
													CONSTRAINT fk_Est_Quarto	    foreign key (ID_Quarto)	    references Quartos	(ID)
							);

--	Triggers
DROP 	TRIGGER IF EXISTS 	Tgr_Camas_Insert;
DROP 	TRIGGER IF EXISTS 	Tgr_Quartos_Insert;
DROP 	TRIGGER IF EXISTS 	Tgr_CamasQuarto_Insert;

DELIMITER $

-- CREATE TRIGGER Tgr_Camas_Insert AFTER INSERT
-- ON Camas
-- FOR EACH ROW
-- BEGIN
--     UPDATE Camas SET Estado = 'V'	WHERE ID = NEW.ID;
-- END$

-- CREATE TRIGGER Tgr_Quartos_Insert AFTER INSERT
-- ON Quartos
-- FOR EACH ROW
-- BEGIN
--     UPDATE Quartos SET CamasDisp = 0	WHERE ID = NEW.ID;
-- END$

-- CREATE TRIGGER Tgr_CamasQuarto_Insert AFTER INSERT
-- ON CamasQuarto
-- FOR EACH ROW
-- BEGIN
--     UPDATE Quartos SET CamasDisp = (1 + ( SELECT CamasDisp FROM Quartos WHERE ID = NEW.ID_Quarto ) ) WHERE ID = NEW.ID_Quarto;
-- END$

DELIMITER ;
