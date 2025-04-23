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

