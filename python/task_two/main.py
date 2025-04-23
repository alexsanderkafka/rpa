import rpa as r
import pyautogui as p
import pandas as pd
import os
from openpyxl import Workbook
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

import invoice

load_dotenv()

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


#os.chdir('C:/Users/User/Documents/trabalho-rafael/rpa/python/task_two')

colunms = ['id', 'email', 'cpf_cnpj', 'valor', 'data_criacao', 'status', 'data_vencimento', 'metodo_pagamento', 'codigo_barra']
dados = pd.read_csv(csv_path, header=None, names=colunms)

df = pd.DataFrame(dados)

print(df)

for index, row in df.iterrows():
    print("\n---------------")
    print(row['id'])
    print(row['email'])
    print(row['cpf_cnpj'])
    print(row['valor'])
    print(row['data_criacao'])
    print(row['status'])
    print(row['data_vencimento'])
    print(row['metodo_pagamento'])
    print(row['codigo_barra'])
    print("---------------\n")

    invoice.generate_pdf(row)

print("\n---FINAL PROCESSING---\n")