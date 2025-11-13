import pyodbc
import os
import subprocess

server = os.getenv('DB_SERVER', 'sqlserver')
user = os.getenv('DB_USER', 'sa')
password = os.getenv('DB_PASSWORD', 'MinhaSenha123')
init_script = os.path.join(os.getcwd(), 'init', 'init.sql')

print("⏳ Aguardando SQL Server inicializar...")

def run_sql_file(cursor, path):
    with open(path, 'r', encoding='utf-8') as f:
        sql = f.read()
        for statement in sql.split('GO'):
            stmt = statement.strip()
            if stmt:
                try:
                    cursor.execute(stmt)
                except Exception as e:
                    print("Erro ao executar statement:", stmt, e)

try:
    conn = pyodbc.connect(
        f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};UID={user};PWD={password}",
        autocommit=True
    )
    cursor = conn.cursor()
    print("✅ Conectado ao SQL Server.")
    print(f"🚀 Executando script: {init_script}")
    run_sql_file(cursor, init_script)
    print("🏁 Script SQL finalizado.")
    cursor.close()
    conn.close()
except Exception as e:
    print("❌ Erro ao conectar/executar:", e)

# Inicia sua aplicação Python (Flask, API, etc)
print("🚀 Iniciando aplicação Flask...")
subprocess.run(["python", "Api/app.py"])
