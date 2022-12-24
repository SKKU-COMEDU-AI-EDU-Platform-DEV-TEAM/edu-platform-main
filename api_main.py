from flask import Flask, request, redirect, jsonify, session, url_for, app
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime
import secrets
import hashlib
import model
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.environ.get('FLASK_SESSION_SECRETKEY')


#db 설정 부분입니다.
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DB_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


@app.route('/')
def index():
    return "Welcome to SKKU AI EDU Platform!!!"


#세션 체크의 경우 JWT에 대하여 찾아본 후 적용하는 방향으로 합니다.

#사용되는 모든 api 요청 주소는 /api 로 시작되도록 합니다.


#회원가입 api
@app.route('/api/signup', methods=['POST'])
def signup():
    id_receive = request.form['email']
    nickname_receive = request.form['name']
    pw_receive = request.form['pw']
    mbti_receive = request.form['mbti']
    
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    
    #DB에 넣는 것은 구축 후에 작성하겠습니다.
    
    return jsonify({"state" : "success"})


#로그인 api
@app.route('/api/login', methods=['POST'])
def login():
    id_receive = request.form['email']
    pw_receive = request.form['pw']
    
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    
    #DB에서 id, 암호화된 pw를 가지고 해당 유저를 찾습니다.
    
    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=3)    #언제까지 유효한지
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
        return jsonify({'state': 'success', 'token': token})
    else:
        return jsonify({'state': 'fail', 'msg': '아이디 또는 비밀번호가 일치하지 않습니다.'})


#메인페이지 정보 api
@app.route('/api/main', methods=['POST'])
def main():
    return jsonify({'state': 'success'})


@app.route('/api/survey')
def survey():
    return jsonify({'state': 'success'})


#전체 학습 페이지 api
@app.route('/api/course', methods=['GET'])
def courses():

    #db에서 불러오는 부분 있어야 합니다.
    res_json = {}
    res_json['data'] = []
    for i in range(0,15):
        res_json['data'].append({})
        #res_json['data'][i]["subject"] = 
        res_json['data'][i]["contents"] = {}
        #영상 자료 개별 페이지 담는 반복문 필요합니다.
        #res_json['data'][i]["quiz"] = 
        #학습자 유형 판단 후 메타버스링크 추가하는 조건문 필요합니다.
        res_json['data'][i]["isdone"] = {}
        #db에서 불러온 정보를 통해 완료 여부 체크하는 반복문 필요합니다.

    return jsonify(res_json)


#학습자 유형 판단 설문 api
@app.route('/api/test', methods=['GET', 'POST'])
def test():
    if request.method == 'GET':
        return jsonify({'state': 'success'})
    elif request.method == 'POST':
        return jsonify({'state': 'success'})
    else:
        return jsonify({'state': 'error'})

#학습자 유형 결과 api
@app.route('/api/testResult', methods=['GET'])
def testresult():
    return jsonify({'state': 'success'})


#주차 별 퀴즈 점수 api
@app.route('/api/weekScore', methods=['GET'])
def weekscore():
    return jsonify({'state': 'success'})



if __name__ == '__main__':
    app.run(debug=True)