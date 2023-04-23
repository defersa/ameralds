from ameralds import env
import requests


def check_recaptcha_token(token):
    secret_key = env.RECAPTCHA_KEY

    # captcha verification
    recaptcha_data = {
        'response': token,
        'secret': secret_key
    }

    recaptcha_response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=recaptcha_data)
    recaptcha_response_result = recaptcha_response.json()

    return recaptcha_response_result.get('success')