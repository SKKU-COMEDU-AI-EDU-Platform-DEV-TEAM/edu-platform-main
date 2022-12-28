from flask import Flask, request, redirect, jsonify, session, url_for, app, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime
import secrets
import pymysql
import hashlib
from model import User, Learning_contents, Quiz, Quiz_result, Week_learning_check
from flask_sqlalchemy import SQLAlchemy
from pytz import timezone
import random

id_ = "abc@d.e"
pw_ = "abc!"
nickname = "choco"
mbti = "ISFP"
survey_result = [0, 0, 0, 0, 0, 0]
type_ = 1


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
    jsonReceive = request.get_json()

    id_ = jsonReceive['email']
    pw_ = jsonReceive['pw']
    nickname = jsonReceive['name']
    mbti = jsonReceive['mbti']
    
    return jsonify({"state" : "success"})


#로그인 api
@app.route('/api/login', methods=['POST'])
def login():
    jsonReceive = request.get_json()

    idReceive = jsonReceive['email']
    pwReceive = jsonReceive['pw']
    
    if (idReceive == id_ & pwReceive == pw_) :
        return jsonify({'state': 'success'})
    elif(idReceive == id_) :
        return jsonify({'state': 'fail', 'msg': '올바른 비밀번호를 입력해주세요.'})
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

    resJson = {}
    resJson['data'] = []
    for i in range(0,15):
        resJson['data'].append({})
        resJson['data'][i]['subject'] = f"""강의 제목{i}"""
        resJson['data'][i]['contents'] = {}
        resJson['data'][i]['contents']['video'] = []

        if i % 2 == 1 :
            for j in range(2):
                resJson['data'][i]['contents']['video'].append('/course/'+str(i+1)+'/lecture/'+str(j+1))
        else :
            j = 1
            resJson['data'][i]['contents']['video'].append('/course/'+str(i+1)+'/lecture/'+str(j+1))

        resJson['data'][i]['contents']['quiz'] = '/course/'+str(i+1)+'/quiz'
        resJson['data'][i]['contents']['multiverse'] = https://app.gather.town/app/KxbGPczKS6ld3Fxt/SKKUMeta
        resJson['data'][i]['isdone'] = {}
        resJson['data'][i]['isdone']['video'] = []
        #db에서 불러온 정보를 통해 완료 여부 체크하는 반복문 필요합니다. 지금은 더미 데이터를 보내줍니다.

        if i % 2 == 1 :
            for j in range(0,2):
                resJson['data'][i]['isdone']['video'].append(random.randrange(0,2))
        else :
            resJson['data'][i]['isdone']['video'].append(random.randrange(0,2))
    
        resJson['data'][i]['isdone']['quiz'].append(random.randrange(0,2))
        resJson['metaverse'] = 'https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnToken=oMNzrEjTTn2fWdizR1Hp'

    return jsonify(resJson)


#학습자 유형 판단 설문 api
@app.route('/api/test', methods=['GET', 'POST'])
def test():
    if request.method == 'GET':
        resQuestion = {}
        resQuestion['questions'] = [
            "학습 성향 분석 질문1",
            "학습 성향 분석 질문2",
            "학습 성향 분석 질문3",
            "학습 성향 분석 질문4",
            "학습 성향 분석 질문5",
            "학습 성향 분석 질문6"
            ]
        return jsonify(resQuestion)
    elif request.method == 'POST':
        resultReceive = request.get_json()
        resultReceive = resultReceive['result']
        survey_result = resultReceive

        return jsonify({'state': 'success'})
    else:
        return jsonify({'state': 'error'})


#학습자 유형 결과 api
@app.route('/api/testResult', methods=['GET'])
def testresult():
    resType = {}
    resType['type'] = type_
    return jsonify(resType)


@app.route('/api/weekScore', methods=['GET'])
def weekscore():
    return jsonify({'state': 'success'})

if __name__ == '__main__':
    app.run(debug=True)