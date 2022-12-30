from flask import Flask, request, redirect, jsonify, session, url_for, app, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime
import hashlib
from model import User, Learning_contents, Quiz, Quiz_result, Week_learning_check
from flask_sqlalchemy import SQLAlchemy
from pytz import timezone
import random
from decisionTree import clf
import dummy


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


#부득이 이곳에서 필요한 더미데이터를 위한 변수입니다. 추후 전부 삭제바랍니다.
userAnswerDummy = []
userCorrectAnswerCntDummy = 0


@app.route('/')
def index():
    return render_template('index.html')

#세션 체크의 경우 JWT에 대하여 찾아본 후 적용하는 방향으로 합니다.

#사용되는 모든 api 요청 주소는 /api 로 시작되도록 합니다.

#서버가 외부 접근이 되기 전까지는 로컬에 MySQL 환경 구축한 후 테스트하기 바랍니다.



#[POST] 회원가입 api
@app.route('/api/signup', methods=['POST'])
def signup():
    jsonReceive = request.get_json()

    idReceive = jsonReceive['email']
    pwReceive = jsonReceive['pw']
    nicknameReceive = jsonReceive['name']
    mbtiReceive = jsonReceive['mbti']

    pwHash = hashlib.sha256(pwReceive.encode('utf-8')).hexdigest()

    newUser = User(email = idReceive, 
                    pw = pwHash, 
                    nName = nicknameReceive, 
                    usrType = 0,
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



#[POST] 로그인 api
@app.route('/api/login', methods=['POST'])
def login():
    jsonReceive = request.get_json()

    idReceive = jsonReceive['email']
    pwReceive = jsonReceive['pw']

    pwHash = hashlib.sha256(pwReceive.encode('utf-8')).hexdigest()
    
    queryRes = db.session.query(User).filter_by(userEmail=idReceive, userPassword=pwHash).first()
    
    if queryRes is not None:
        result = {}
        result['userName'] = queryRes.userNickname
        result['userId'] = queryRes.userId
        result['userEmail'] = queryRes.userEmail
        result['type'] = queryRes.userKolbType
        return jsonify(result)
    else:
        return jsonify({'state': 'fail', 'msg': '아이디 또는 비밀번호가 일치하지 않습니다.'})



#[POST] 메인페이지 정보 api
@app.route('/api/main', methods=['POST'])
def main():
    queryres = db.session.query(User).filter_by(userEmail='apple11@naver.com').first()
    print(queryres.userEmail)
    return jsonify({'state': 'success'})



#[GET] 전체 학습 페이지 api
@app.route('/api/course', methods=['GET'])
def courses():
    #user_code = request.get_json()
    #user_code = user_code['email']
    
    #db에서 값을 불러와 조립하는 부분이라 로컬 테스팅 환경에서는 주석처리 합니다.
    """
    resJson = {}
    resJson['data'] = []
    for i in range(0,15):
        resJson['data'].append({})
        resJson['data'][i]['subject'] = '강의 제목'+str(i+1)
        resJson['data'][i]['contents'] = {}
        resJson['data'][i]['contents']['video'] = []
        #영상 자료 개별 페이지 담는 반복문 필요합니다.(주차마다 영상 개수 다르므로) 지금은 임의로 2개를 보냅니다.
        for j in range(2):
            resJson['data'][i]['contents']['video'].append('/course/'+str(i+1)+'/lecture/'+str(j+1))
        resJson['data'][i]['contents']['quiz'] = '/course/'+str(i+1)+'/quiz'
        #주차별 메타버스 링크 필요합니다. 지금은 전부 메타버스 메인 url을 보냅니다.
        resJson['data'][i]['contents']['multiverse'] = 'https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnToken=oMNzrEjTTn2fWdizR1Hp'
        resJson['data'][i]['isdone'] = {}
        resJson['data'][i]['isdone']['video'] = []
        #db에서 불러온 정보를 통해 완료 여부 체크하는 반복문 필요합니다. 지금은 더미 데이터를 보내줍니다.
        for j in range(0,2):
            resJson['data'][i]['isdone']['video'].append(random.randrange(0,2))
        resJson['data'][i]['isdone']['quiz'] = 0
    #메타버스 메인 url이 들어갑니다.
    resJson['metaverse'] = 'https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnToken=oMNzrEjTTn2fWdizR1Hp'

    return jsonify(resJson)
    """

    return jsonify(dummy.courseJson)



#[GET] 퀴즈 데이터 api
#[POST] 퀴즈 채점 api
@app.route('/api/quiz/<int:week>', methods=['GET', 'POST'])
def quiz(week):
    if request.method == 'GET':
        #현재는 7주차에 대한 데이터를 보내줍니다.
        if week == 7 :
            return jsonify(dummy.quizJson)
        else:
            return jsonify(dummy.quizJson2) #7주차가 아닌 것에는 프로토버전을 보내줍니다.

    elif request.method == 'POST':
        quizReqJson = request.get_json()
        userQuizAnswer = quizReqJson['data']

        #현재는 더미데이터를 기준으로 채점 로직을 수행합니다.
        correctAnswerCnt = 0
        for i in range(dummy.quizResultJson['totalQuizNum']):
            userAnswerDummy.append(userQuizAnswer[i])
            if userQuizAnswer[i] == dummy.quizResultJson['correctAnswer'][i]:
                correctAnswerCnt += 1

        #추후 db에 update하는 부분을 작성하면 삭제바랍니다.
        userCorrectAnswerCntDummy = correctAnswerCnt

        return jsonify({"state" : "success"})

    else:
        return jsonify({'state': 'error'})



#[GET] 퀴즈 결과 api
@app.route('/api/quiz/<int:week>/result', methods=['GET'])
def quizResult(week):
    #현재는 더미 데이터를 전송합니다. 추후 db 쿼리문을 작성하면 삭제바랍니다.
    dummy.quizResultJson['correctQuizNum'] = userCorrectAnswerCntDummy
    dummy.quizResultJson['userAnswer'] = userAnswerDummy

    return jsonify(dummy.quizResultJson)



#[GET] 영상pdf 데이터 api
@app.route('/api/lecture/<int:week>/<int:id>', methods=['GET'])
def lecture(week, id):
    #현재는 더미 데이터를 전송합니다.
    return jsonify(dummy.lectureJson)



#[GET] 학습자 유형 판단 설문 항목 api
#[POST] 학습자 유형 판단 api
@app.route('/api/test', methods=['GET', 'POST'])
def test():
    if request.method == 'GET':
        #현재는 더미 데이터를 전송합니다.
        return jsonify(dummy.testJson)

    elif request.method == 'POST':
        userTestJson = request.get_json()
        user = userTestJson["userId"]
        result = userTestJson["type"]
        mbti = userTestJson["mbti"]

        userKolbType = clf.predict([mbti])[0]
        print(userKolbType)
        
        return jsonify({'state': 'success'})

    else:
        return jsonify({'state': 'error'})



#[GET] 학습자 유형 결과 api
@app.route('/api/testResult', methods=['GET'])
def testresult():
    #추후 userId 정보를 받아 쿼리 진행해야합니다.
    queryres = db.session.query(User).all().first()
    
    result = {}
    result['type'] = queryres.userKolbType
    
    return jsonify(result)



#주차별 퀴즈 점수 api
@app.route('/api/weekScore', methods=['GET'])
def weekscore():
    return jsonify(dummy.weekScoreJzon)



if __name__ == '__main__':
    app.run(debug=True)