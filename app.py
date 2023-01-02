
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, render_template, redirect
#from flask_sqlalchemy import SQLAlchemy
import json


app = Flask(__name__, template_folder='/home/tomaskri/mysite/templates/', static_folder='/home/tomaskri/mysite/static/')

@app.route('/')
def index():
    return render_template('index.html') #return 'Hello from Flask!'


@app.route('/process_data', methods=['POST'])
def process_data():
    if request.method == "POST":
        print(json.loads(request.get_data())['data'], flush=True)

    # Process the data and return a response
    return "pee"