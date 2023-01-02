from flask import Flask, request, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

import ssl
import json

context = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
context.load_cert_chain('0.0.0.0.pem', '0.0.0.0-key.pem')

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)



# @app.before_request
# def before_request():
#     if not request.is_secure:
#         url = request.url.replace('http://', 'https://', 1)
#         code = 301
#         return redirect(url, code=code)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/process_data', methods=['POST'])
def process_data():
    if request.method == "POST":
        print(json.loads(request.get_data())['data'])
    # Process the data and return a response
    return "pee"

if __name__ == '__main__':
    app.run(ssl_context=context, host='0.0.0.0', port=8080)