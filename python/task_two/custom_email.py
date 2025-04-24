from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage
from mimetypes import guess_type
import pandas as pd

load_dotenv()

def send_email(pdf_path, row: pd.Series):

    EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')  # Exemplo: "seuemail@gmail.com"
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')  # Senha de aplicativo do Gmail

    due_date = str(row['data_vencimento'])
    name = str(row['nome'])
    email = '' #str(row['email']) lembrar de colocar o email aqui
    value = row['valor']

    msg = EmailMessage()
    msg['Subject'] = "Sua fatura"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    #msg.set_content("Pague o mais rápido possível")

    html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif;">
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; text-align: center;">
                    <h1 style="color: #F57420; margin-bottom: 20px;">Olá {name}. Sua fatura está disponível para pagamento.</h1>
                    <p style="font-size: 16px; color: #000;">Por favor, pague o mais rápido possível. Qualquer dúvida, entre em contato conosco.</p>
                    <p style="font-size: 16px; color: #000;">Valor da sua fatura: R$ {value:.2f}</p>
                    <a href="https://linkdepagamento.com" style="display: inline-block; padding: 12px 24px; background-color: #F57420; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
                        Pague agora
                    </a>
                    <p style="font-size: 16px; color: #000;">Lembre-se. Você tem até o dia {due_date} para pagar a fatura.</p>
                </div>
            </body>
        </html>
        """ 
    msg.add_alternative(html_content, subtype='html')

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