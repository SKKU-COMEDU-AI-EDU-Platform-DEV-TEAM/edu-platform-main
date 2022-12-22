from flask import Flask, request, redirect, jsonify, session, url_for, app
from flask_cors import CORS
from dotenv import load_dotenv
import os
#import pymysql -> SQLAlchemy에 대하여 찾아본 후 더 적합한 것을 적용하는 방향으로 합니다. 
from datetime import timedelta
import datetime
import secrets
import hashlib

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
    
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    
    #DB에 넣는 것은 구축 후에 작성하겠습니다.
    
    return jsonify({"state" : "success"})


@app.route('/api/login', methods=['POST'])
def login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    
    #DB에서 id, 암호화된 pw를 가지고 해당 유저를 찾습니다.
    
    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)    #언제까지 유효한지
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
        return jsonify({'state': 'success', 'token': token})
    else:
        return jsonify({'state': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})
    
@app.route('/api/main', methods=['POST'])
def main():
    return jsonify({'state': 'success'})

@app.route('/api/survey')
def survey():
    return jsonify({'state': 'success'})


if __name__ == '__main__':
    app.run(debug=True)