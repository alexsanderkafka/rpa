import rpa as r
import pyautogui as p
import pandas as pd
import os
from openpyxl import Workbook
import subprocess
from fpdf import FPDF
import datetime as dt
import qrcode
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
import os
import smtplib
from email.message import EmailMessage
from mimetypes import guess_type

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

def generate_pdf(row: pd.Series):

    pdf_path = os.path.join(current_dir, '..', f'{row['cpf_cnpj']}.pdf')

    # Criar um PDF
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", style='B', size=16)

    pdf.cell(200, 10, "Sua fatura", ln=True, align='C')
    pdf.ln(10)

    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, f"Data de vencimento: {row['data_vencimento']}", ln=True)
    pdf.ln(5)

    # Detalhes da compra
    pdf.multi_cell(0, 10, str(row['valor']))
    
    qr_path = generate_qr_code(row['cpf_cnpj'])

    pdf.image(qr_path, y=50, w=50)


    print(f"PDF gerado com sucesso: {row['cpf_cnpj']}")

    print(row)

    pdf.output(pdf_path)

    #send_email(pdf_path, row['email'])
    send_email(pdf_path, '') #Colocar o email


def send_email(pdf_path, email):
    #Colocar os anexos:
    #qr_path = generate_qr_code()

    #EMAIL_ADDRESS = os.getenv('EMAIL_USER')  # Exemplo: "seuemail@gmail.com"
    #EMAIL_PASSWORD = os.getenv('EMAIL_PASS')  # Senha de aplicativo do Gmail

    EMAIL_ADDRESS = ''  # Exemplo: "seuemail@gmail.com"
    EMAIL_PASSWORD = ''  # Senha de aplicativo do Gmail

    msg = EmailMessage()
    msg['Subject'] = "Sua fatura"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    msg.set_content("Pague o mais rápido possível")

    # Adicionando o PDF como anexo
    with open(pdf_path, 'rb') as f:
        file_data = f.read()
        file_name = os.path.basename(pdf_path)
        maintype, subtype = guess_type(pdf_path)[0].split('/')
        msg.add_attachment(file_data, maintype=maintype, subtype=subtype, filename=file_name)

    """
    # Adicionando o QR code como anexo
    with open(qr_path, 'rb') as f:
        file_data = f.read()
        file_name = os.path.basename(qr_path)
        maintype, subtype = guess_type(qr_path)[0].split('/')
        msg.add_attachment(file_data, maintype=maintype, subtype=subtype, filename=file_name)
    """

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        print(f"OK E-mail enviado com sucesso para {email}")
    except Exception as e:
        print(f"X Erro ao enviar e-mail: {e}")


def generate_qr_code(social):
    print("Gerando QR Code")

    url_pagamento = 'https://www.daniel-ip.com/pt/tecnologia/urubu-do-pix-saiba-como-se-proteger-desse-golpe/'
    qr = qrcode.make(url_pagamento)

    qr_path = os.path.join(current_dir, '..', f'{social}.png')

    qr.save(qr_path)

    return qr_path




for index, row in df.iterrows():
    print(row['id'])
    print(row['email'])
    print(row['cpf_cnpj'])
    print(row['valor'])
    print(row['data_criacao'])
    print(row['status'])
    print(row['data_vencimento'])
    print(row['metodo_pagamento'])
    print(row['codigo_barra'])
    print("---")

    generate_pdf(row)

print("---FINAL PROCESSING---")