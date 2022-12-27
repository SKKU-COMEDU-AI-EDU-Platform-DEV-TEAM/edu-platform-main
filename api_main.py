from flask import Flask, request, redirect, jsonify, session, url_for, app, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime
import secrets
import hashlib
from model import User, Learning_contents, Quiz, Quiz_result, Week_learning_check
from flask_sqlalchemy import SQLAlchemy
from pytz import timezone


load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.environ.get('FLASK_SESSION_SECRETKEY')

KST = timezone('Asia/Seoul')

#db 설정 부분입니다.
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DB_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


@app.route('/')
def index():
    #return "Welcome to SKKU AI EDU Platform!!!"
    return render_template('index.html')


#세션 체크의 경우 JWT에 대하여 찾아본 후 적용하는 방향으로 합니다.

#사용되는 모든 api 요청 주소는 /api 로 시작되도록 합니다.

#서버가 외부 접근이 되기 전까지는 로컬에 MySQL 환경 구축한 후 테스트하기 바랍니다.


#회원가입 api
@app.route('/api/signup', methods=['POST'])
def signup():
    idReceive = request.form['email']
    pwReceive = request.form['pw']
    nicknameReceive = request.form['name']
    mbtiReceive = request.form['mbti']
    
    pwHash = hashlib.sha256(pwReceive.encode('utf-8')).hexdigest()

    newUser = User(email = idReceive, 
                    pw = pwHash, 
                    nName = nicknameReceive, 
                    usrType = 0, #0이 학습자입니다. 
                    cDate = datetime.datetime.now(KST), 
                    uDate = datetime.datetime.now(KST), 
                    mbti = mbtiReceive,
                    kolbType = None, 
                    lrnLvl = None, 
                    interestTag = None, 
                    lrnType = None, 
                    gamiLvl = 0, 
                    gamiExp = 0)

    db.session.add(newUser)
    db.session.commit()
    
    return jsonify({"state" : "success"})


#로그인 api
@app.route('/api/login', methods=['POST'])
def login():
    idReceive = request.form['email']
    pwReceive = request.form['pw']
    
    pw_hash = hashlib.sha256(pwReceive.encode('utf-8')).hexdigest()
    
    #DB에서 id, 암호화된 pw를 가지고 해당 유저를 찾습니다.

    result = {}
    
    if result is not None:
        payload = {
            'id': pwReceive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=3)    #언제까지 유효한지
        }
        
        token = {}
        #token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
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
    resJson = {}
    resJson['data'] = []
    for i in range(0,15):
        resJson['data'].append({})
        #resJson['data'][i]['subject'] = 
        resJson['data'][i]['contents'] = {}
        #영상 자료 개별 페이지 담는 반복문 필요합니다.
        #resJson['data'][i]['quiz'] = 
        #학습자 유형 판단 후 메타버스링크 추가하는 조건문 필요합니다.
        resJson['data'][i]['isdone'] = {}
        #db에서 불러온 정보를 통해 완료 여부 체크하는 반복문 필요합니다.
    #메타버스 메인 url이 들어갑니다.
    resJson['metaverse'] = ''

    return jsonify(resJson)


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