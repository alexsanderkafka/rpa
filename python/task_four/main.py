import rpa as r
import pyautogui as p
import pandas as pd
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.wp import send_message_wp


current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, '..', 'faturas.csv')

r.init(visual_automation=True, chrome_browser=True)

r.url('http://localhost:5173/')
p.sleep(3)

r.table('//*[@id="root"]/main/div[2]/table', csv_path)
janela = p.getActiveWindow()
janela.maximize()
p.sleep(1)
p.click(x=76, y=287)
p.sleep(1)
r.close()

colunms = ['nome', 'email', 'cpf_cnpj', 'valor', 'telefone', 'status', 'data_vencimento', 'metodo_pagamento', 'codigo_barra']
dados = pd.read_csv(csv_path, header=None, names=colunms)

df = pd.DataFrame(dados)

for index, row in df.iterrows():
    print("\n---------------")
    print(row['nome'])
    print(row['email'])
    print(row['cpf_cnpj'])
    print(row['valor'])
    print(row['telefone'])
    print(row['status'])
    print(row['data_vencimento'])
    print(row['metodo_pagamento'])
    print(row['codigo_barra'])
    print("---------------\n")

    send_message_wp(row)

    df.at[index, 'status'] = 'Mensagem enviada'
    df.at[index, 'metodo_pagamento'] = 'WhatsApp'

df.to_csv(csv_path, index=False)

print(df)

print("---FINAL PROCESSING---")


