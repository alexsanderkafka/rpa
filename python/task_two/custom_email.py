from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage
from mimetypes import guess_type

load_dotenv()

def send_email(pdf_path, email):

    EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')  # Exemplo: "seuemail@gmail.com"
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')  # Senha de aplicativo do Gmail

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

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        print(f"OK E-mail enviado com sucesso para {email}")
    except Exception as e:
        print(f"X Erro ao enviar e-mail: {e}")