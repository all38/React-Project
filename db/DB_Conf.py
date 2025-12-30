import pyodbc

class DatabaseManager:
    def __init__(self, server, username, password, database='master'):
        self.server = server
        self.username = username
        self.password = password
        self.database = database

    def connect(self):
        """Conecta ao SQL Server usando pyodbc."""
        try:
            conn = pyodbc.connect(
                f'DRIVER={{ODBC Driver 17 for SQL Server}};'
                f'SERVER={self.server};'
                f'DATABASE={self.database};'
                f'UID={self.username};'
                f'PWD={self.password}'
            )
            return conn
        except Exception as e:
            print(f'Erro ao conectar ao SQL Server: {e}')
            return None

    def execute_sql(self, sql):
        """Executa um comando SQL com uma conexão."""
        try:
            conn = self.connect()
            if conn is None:
                return False, 'Erro ao conectar ao banco de dados.'

            cursor = conn.cursor()
            conn.autocommit = True  # Ativa o autocommit para evitar transações
            cursor.execute(sql)  # Executa o comando SQL
            cursor.close()
            conn.close()
            return True, 'Comando SQL executado com sucesso!'
        except Exception as e:
            return False, f"Erro ao executar o comando SQL: {e}"

    def execute_sql_from_file(self, file_path, database=None):
        """Executa comandos SQL de um arquivo .sql dentro de um banco específico."""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                sql = file.read()

            conn = self.connect()
            if conn is None:
                return False, 'Erro ao conectar ao banco de dados.'

            cursor = conn.cursor()
            conn.autocommit = True  # Ativa autocommit

            if database:
                cursor.execute(f"USE {database};")

            cursor.execute(sql)
            cursor.close()
            conn.close()

            return True, "Comando SQL executado com sucesso!"

        except Exception as e:
            return False, f"Erro ao ler ou executar o arquivo SQL: {e}"

# Instância do DatabaseManager
db_manager = DatabaseManager(
    server='localhost,1433',  # Substitua pelo endereço do seu servidor SQL
    username='SA',
    password='MinhaSenha123'  # Substitua pela sua senha do SA
)

# Função para criar o banco de dados 'Dev'
def criar_banco_de_dados():
    # SQL para criar o banco de dados 'Dev' se não existir
    create_db_sql = """
        IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Dev')
        BEGIN
            CREATE DATABASE Dev;
        END
    """
    
    # Executar o comando SQL
    sucesso, mensagem = db_manager.execute_sql(create_db_sql)
    if sucesso:
        print("Banco de dados 'Dev' criado com sucesso!")
    else:
        print(f"Erro ao criar o banco de dados: {mensagem}")

# Função para executar o SQL automaticamente
def execute_sql_automatically():
    # Caminho para o arquivo SQL com a criação de tabelas
    file_path = r'E:\e-Makers\Projetos\ProjetoPrimeReact\projeto\db_conf\config.sql'

    # Nome do banco de dados
    db_name = 'Dev'

    # Apenas tenta executar o SQL para criar as tabelas no banco 'Dev'
    sucesso, mensagem = db_manager.execute_sql_from_file(file_path, database=db_name)
    if sucesso:
        print("Tabelas criadas com sucesso!")
    else:
        print(f"Erro ao criar tabelas: {mensagem}")


#### Chamar as funções ####

# Chamar a função para criar o banco de dados
criar_banco_de_dados()

# Executar o SQL automaticamente
execute_sql_automatically()
