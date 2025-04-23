import qrcode
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

def generate_qr_code(social_number: str) -> str:
    print("Gerando QR Code")

    url_pagamento = 'https://www.daniel-ip.com/pt/tecnologia/urubu-do-pix-saiba-como-se-proteger-desse-golpe/'
    qr = qrcode.make(url_pagamento)

    qr_path = os.path.join(current_dir, '../qrcode', f'{social_number}.png')
    qr.save(qr_path)

    return qr_path