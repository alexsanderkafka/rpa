from datetime import datetime
import os
from fpdf import FPDF
import pandas as pd
import qr as qr
import custom_email as email

current_dir = os.path.dirname(os.path.abspath(__file__))

def generate_pdf(row: pd.Series):

    pdf_path = os.path.join(current_dir, '../pdfs', f'{row['cpf_cnpj']}.pdf')

    #Cria o PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Cabeçalho
    pdf.set_font("Arial", style='B', size=14)
    pdf.cell(0, 10, "BANCO EXEMPLO S.A.", ln=True, align='C')
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, "Boleto de Cobrança", ln=True, align='C')
    pdf.ln(5)

    # Linha digitável
    linha_digitavel = row['codigo_barra']
    pdf.set_font("Arial", style='B', size=12)
    pdf.cell(0, 10, f"Linha Digitável: {linha_digitavel}", ln=True, align='C')
    pdf.ln(5)

    # Dados principais
    pdf.set_font("Arial", size=11)
    pdf.cell(0, 8, f"Beneficiário: Empresa Exemplo LTDA", ln=True)
    pdf.cell(0, 8, f"CNPJ: 00.000.000/0001-91", ln=True)
    pdf.cell(0, 8, f"Pagador (CPF/CNPJ): {row['cpf_cnpj']}", ln=True)
    pdf.cell(0, 8, f"E-mail do pagador: {row['email']}", ln=True)
    pdf.ln(5)

    # Data e valor
    vencimento = datetime.strptime(row['data_vencimento'], "%Y-%m-%d").strftime("%d/%m/%Y")
    pdf.cell(0, 8, f"Data de Vencimento: {vencimento}", ln=True)
    pdf.cell(0, 8, f"Valor: R$ {row['valor']:.2f}", ln=True)
    pdf.ln(10)

    # Instruções
    pdf.set_font("Arial", size=10)
    pdf.multi_cell(0, 8, "Instruções: Pagável em qualquer banco até a data de vencimento. Após vencimento, sujeita-se a encargos.")
    pdf.ln(10)

    # QR Code centralizado
    qr_path = qr.generate_qr_code(row['cpf_cnpj'])
    x_center = (210 - 50) / 2  # 210 é a largura da página A4 em mm, 50 é a largura do QR
    pdf.image(qr_path, x=x_center, w=50)
    pdf.ln(60)  # espaço abaixo do QR Code

    # Rodapé
    pdf.set_y(-30)
    pdf.set_font("Arial", size=8)
    pdf.cell(0, 10, "Este é um boleto de exemplo gerado para fins didáticos.", ln=True, align='C')

    pdf.output(pdf_path)
    print(f"\nPDF gerado com sucesso: {pdf_path}")

    #send_email(pdf_path, row['email'])
    #str(row['email'])
    

    email.send_email(pdf_path, row) #Colocar o email
    