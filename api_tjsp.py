# api_tjsp.py  – consulta simples à API DataJud (TJ-SP)
# ----------------------------------------------------
# Troque o valor de API_KEY abaixo pela sua chave do CNJ
# Depois execute: python api_tjsp.py
# ----------------------------------------------------

API_KEY = "APIKey SUA-CHAVE-AQUI"  # substitua por sua chave

import os
import sys

try:
    import requests
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

API_KEY = API_KEY or os.getenv("DATAJUD_API_KEY", "")
if not API_KEY.startswith("APIKey "):
    sys.exit("Chave da API ausente ou inválida. Edite API_KEY no arquivo.")

URL = "https://api-publica.datajud.cnj.jus.br/api_publica_tjsp/_search"
HEADERS = {"Authorization": API_KEY, "Content-Type": "application/json"}
QUERY = {"query": {"match_all": {}}, "size": 1}

print("Consultando a API do TJ-SP...")
resp = requests.post(URL, headers=HEADERS, json=QUERY, timeout=30)

if resp.status_code == 401:
    sys.exit("Erro 401: chave da API incorreta ou expirada.")
resp.raise_for_status()

data = resp.json()
print("Total de processos públicos no TJ-SP:", data["hits"]["total"]["value"])
