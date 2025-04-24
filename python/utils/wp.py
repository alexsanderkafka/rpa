from urllib.parse import quote
import webbrowser
from urllib.parse import quote
import pyautogui as p
import pandas as pd

def send_message_wp(row: pd.Series):
    name = str(row['nome'])
    due_date = str(row['data_vencimento'])
    number =  '' # #str(row['telefone']) lembrar de colocar o número de telefone aqui

    print('Enviando mensagem pelo WhatsApp...\n')

    msg = f'Olá {name} seu boleto vence no dia {due_date}. Favor pagar no link https://www.link_do_pagamento.com'

    try:
        link_mensagem_whatsapp = f'https://web.whatsapp.com/send?phone={number}&text={quote(msg)}'
        webbrowser.open(link_mensagem_whatsapp)
        p.sleep(10)
        #seta = pyautogui.locateCenterOnScreen('seta.png')
        p.sleep(5)
        #pyautogui.click(seta[0], seta[1])
        p.press('enter')
        p.sleep(3)
        p.hotkey('ctrl', 'w')
        p.sleep(3)


    except Exception as e:
        print(f'Erro ao enviar mensagem: {e}')
        print(f'Não foi possível enviar mensagem para {name}')

    ##webbrowser.quit()