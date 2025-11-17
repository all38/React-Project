CREATE TABLE Usuarios (
    ID_Usuario INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Senha_Hash VARBINARY(256) NOT NULL,
    Senha_Salt VARBINARY(256) NOT NULL,
    Foto_Perfil VARCHAR(MAX) NULL,
    Data_Criacao DATETIME DEFAULT GETDATE()
);

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
        RAISERROR('Usuário não encontrado!', 16, 1);
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
    SET @Hash_Teste = HASHBYTES('SHA2_256', @Senha + CONVERT(VARCHAR(1000), @Salt));

    -- 4️⃣ Valida o hash
    IF @Hash_Teste != @Hash_Banco
    BEGIN
        RAISERROR('Senha incorreta!', 16, 1);
        RETURN;
    END

    -- 5️⃣ Sucesso — você pode retornar mais dados se quiser
    SELECT 
        ID_Usuario,
        Nome,
        Email,
        Foto_Perfil
    FROM Usuarios
    WHERE Email = @Email;
END');