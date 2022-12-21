from flask import Flask, request, redirect, jsonify, session, url_for, app
from flask_cors import CORS
from dotenv import load_dotenv
import os
#import pymysql -> SQLAlchemy에 대하여 찾아본 후 더 적합한 것을 적용하는 방향으로 합니다. 
from datetime import timedelta
import datetime
import secrets

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
#app.secret_key = os.environ.get('FLASK_SESSION_SECRETKEY') -> 아직 .env 미적용 상태입니다.


@app.route('/')
def index():
    return "Welcome to SKKU AI EDU Platform!!!"


#세션 체크의 경우 JWT에 대하여 찾아본 후 적용하는 방향으로 합니다.

#사용되는 모든 api 요청 주소는 /api 로 시작되도록 합니다.


@app.route('/api/signup', methods=['POST'])
def signup():
    id_receive = request.form['id_give']
    nickname_receive = request.form['nickname_give']
    pw_receive = request.form['pw_give']
    pwch_receive = request.form['pwch_give']
    mbti_receive = request.form['mbti']
    
    return jsonify({"state" : "success"})


@app.route('/api/login', methods=['POST'])
def login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    
    return jsonify({"state" : ""})




if __name__ == '__main__':
    app.run(debug=True)