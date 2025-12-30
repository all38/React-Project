CREATE TABLE Usuarios (
    ID_Usuario INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Senha_Hash VARBINARY(256) NOT NULL,
    Senha_Salt VARBINARY(256) NOT NULL,
    Foto_Perfil VARCHAR(MAX) NULL,
    Data_Criacao DATETIME DEFAULT GETDATE()
);

CREATE TABLE Permissoes (
	ID_Permisao INT IDENTITY(1,1) PRIMARY KEY,
	Nome VARCHAR(30) NOT NULL,
	Descricao VARCHAR(MAX) NOT NULL
);

CREATE TABLE Equipes (
	ID_Equipe INT IDENTITY(1,1) PRIMARY KEY,
	Nome_Equipe VARCHAR(50) NOT NULL,
	Descricao_Equipe VARCHAR (MAX) NOT NULL
);

CREATE TABLE Equipes_Usuarios (
	ID_Equipe_Usuario INT IDENTITY(1,1) PRIMARY KEY,
    ID_Equipe INT NOT NULL,
	ID_Usuario INT NOT NULL,
	Permissao_Usuario INT NOT NULL,
	FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario),
	FOREIGN KEY (ID_Equipe) REFERENCES Equipes(ID_Equipe),
	FOREIGN KEY (Permissao_Usuario) REFERENCES Permissoes(ID_Permisao)
);

EXEC('
INSERT INTO Permissoes (Nome, Descricao) VALUES
(''CONVIDADO'',''Usado para dar certo acesso a aplicação''),
(''MEMBRO'',''Usuário que pertence a uma equipe e que tem mais acessos que o convidado, na aplicação e nas equipes ao qual pertence''),
(''GESTOR'',''Usuário ativo, que pertence a uma equipe e que tem mais acessos que o MEMBRO, responsavel pela equipe''),
(''MASTER'',''Usuário com acesso total a aplicação e gestão completa'')
');

EXEC(' 
CREATE PROCEDURE BACKEND_Cadastro_Usuario (
    @Nome VARCHAR(100),
    @Email VARCHAR(150),
    @Senha VARCHAR(200),
    @Foto_Perfil VARCHAR(MAX) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS(SELECT 1 FROM Usuarios WHERE Email = @Email)
    BEGIN
        RAISERROR(''Email já cadastrado!'', 16, 1);
        RETURN;
    END

    DECLARE @Salt VARBINARY(256) = CRYPT_GEN_RANDOM(32);

    DECLARE @Hash VARBINARY(256) =
        HASHBYTES(''SHA2_256'', @Senha + CONVERT(VARCHAR(1000), @Salt));

	IF NOT EXISTS(SELECT 1 FROM Usuarios)
	BEGIN
		-- CRIA A PRIMEIRA EQUIPE SENDO A ADM
		INSERT INTO Equipes (Nome_Equipe,Descricao_Equipe)
		VALUES (''Equipe ADM'', ''Responsavel pela orquestraçâo dos projetos, segurança, gerenciamento de equipes'')
		-- INSERI O USUARIO
		INSERT INTO Usuarios (Nome, Email, Senha_Hash, Senha_Salt, Foto_Perfil)
		VALUES (@Nome, @Email, @Hash, @Salt, @Foto_Perfil);
		-- INSTANCIA O USUARIO MASTER
		DECLARE @ID_Usuario INT
		SELECT @ID_Usuario = ID_Usuario FROM Usuarios
		-- INSTANCIA 
		INSERT INTO Equipes_Usuarios (ID_Equipe, ID_Usuario, Permissao_Usuario)
        VALUES (1, @ID_Usuario, 4);
	END
	ELSE
    
	INSERT INTO Usuarios (Nome, Email, Senha_Hash, Senha_Salt, Foto_Perfil)
    VALUES (@Nome, @Email, @Hash, @Salt, @Foto_Perfil);
END
');

EXEC('
CREATE OR ALTER PROCEDURE [dbo].[BACKEND_Login_Usuario]
(
    @Email VARCHAR(150),
    @Senha VARCHAR(200)
)
AS
BEGIN
    SET NOCOUNT ON;

    -- 1️⃣ Busca o usuário
    IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE Email = @Email)
    BEGIN
        RAISERROR(''Usuário não encontrado!'', 16, 1);
        RETURN;
    END

    DECLARE @Salt VARBINARY(256);
    DECLARE @Hash_Banco VARBINARY(256);
    DECLARE @Hash_Teste VARBINARY(256);

    -- 2️⃣ Obtém Salt e Hash reais do banco
    SELECT 
        @Salt = Senha_Salt,
        @Hash_Banco = Senha_Hash
    FROM Usuarios
    WHERE Email = @Email;

    -- 3️⃣ Recria o hash com a senha enviada
    SET @Hash_Teste = HASHBYTES(''SHA2_256'', @Senha + CONVERT(VARCHAR(1000), @Salt));

    -- 4️⃣ Valida o hash
    IF @Hash_Teste != @Hash_Banco
    BEGIN
        RAISERROR(''Senha incorreta!'', 16, 1);
        RETURN;
    END

END');