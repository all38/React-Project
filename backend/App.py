from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# -----------------------------------------
# 🔌 Função de conexão com o banco
# -----------------------------------------
def get_connection():
    conn_string = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        f"SERVER={os.getenv('DB_SERVER')};"
        f"DATABASE={os.getenv('DB_DATABASE')};"
        f"UID={os.getenv('DB_USER')};"
        f"PWD={os.getenv('DB_PASSWORD')};"
    )

    return pyodbc.connect(conn_string)


# -----------------------------------------
# 🔧 Função GENÉRICA para executar procedures
# -----------------------------------------
def executar_procedure(nome_proc, params: dict):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Criar a lista de parâmetros para SQL
        placeholders = ", ".join(["?"] * len(params))
        values = tuple(params.values())

        sql = f"EXEC {nome_proc} {placeholders}"

        cursor.execute(sql, values)
        conn.commit()

        return {"mensagem": "Procedure executada com sucesso!"}

    except Exception as e:
        msg = str(e)

        # Tratar erro da procedure de email duplicado
        if "Email já cadastrado" in msg:
            return {"erro": "Email já cadastrado!"}, 400

        return {"erro": msg}, 500

    finally:
        try:
            cursor.close()
            conn.close()
        except:
            pass


# ------------------------------------------------------
# 🟢 ENDPOINT DE CADASTRO — BACKEND_Cadastro_Usuario
# ------------------------------------------------------
@app.post("/cadastro")
def cadastro():
    nome = request.form.get("nome")
    email = request.form.get("email")
    senha = request.form.get("senha")
    foto = request.files.get("foto")

    foto_path = None

    if foto:
        upload_folder = "uploads"
        os.makedirs(upload_folder, exist_ok=True)
        foto_path = os.path.join(upload_folder, foto.filename)
        foto.save(foto_path)

    params = {
        "Nome": nome,
        "Email": email,
        "Senha": senha,
        "Foto_Perfil": foto_path
    }

    return jsonify(executar_procedure("BACKEND_Cadastro_Usuario", params))


# ------------------------------------------------------
# 🟦 Exemplo: outro endpoint usando outra procedure
# ------------------------------------------------------
@app.post("/login")
def login():
    data = request.json

    params = {
        "Email": data.get("email"),
        "Senha": data.get("senha")
    }

    # Basta mudar o nome da procedure
    return executar_procedure("BACKEND_Login_Usuario", params)


# ------------------------------------------------------
# 🚀 Rodando o servidor
# ------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
