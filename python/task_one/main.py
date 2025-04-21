import pandas as pd
import os
import rpa as r
import pyautogui as p

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, '..', 'clients.csv')

clients = pd.read_csv(csv_path)

df = pd.DataFrame(clients)


def fill_forms(row: pd.Series):

    name = str(row['nome_completo'])
    social = str(row['cpf/cnpj'])
    agency = str(row['agencia'])
    account_number = str(row['numero_da_conta'])
    email = str(row['email'])
    phone = str(row['telefone'])

    r.init(visual_automation=True, chrome_browser=True)

    r.url('http://localhost:5173/')
    p.sleep(3)

    #Input do nome completo
    r.type('//*[@id="root"]/div/form/div[1]/input', name)

    #Input do cpf/cnpj
    r.type('//*[@id="root"]/div/form/div[2]/input', social)

    #Input da agência
    r.type('//*[@id="root"]/div/form/div[3]/div[1]/input', agency)

    #Input do número da conta
    r.type('//*[@id="root"]/div/form/div[3]/div[2]/input', account_number)

    #Input do email
    r.type('//*[@id="root"]/div/form/div[4]/input', email)

    #Input do telefone
    r.type('//*[@id="root"]/div/form/div[5]/input', phone)

    p.sleep(2)

    #Button de cadastro
    r.click('//*[@id="root"]/div/form/button')

    p.sleep(3)

    r.close()


for index, row in df.iterrows():
    print(row['nome_completo'])
    print(row['cpf/cnpj'])
    print(row['agencia'])
    print(row['numero_da_conta'])
    print(row['email'])
    print(row['telefone'])
    print("---")

    fill_forms(row)

print("---FINAL PROCESSING---")