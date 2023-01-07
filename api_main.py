from flask import Flask, request, redirect, jsonify, session, url_for, app, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime
import hashlib
import jwt
from model import User, Learning_contents, Quiz, Quiz_result, Learning_check, User_bubble_size_info, Basic_step_info, Data_structure_step_info, Algorithm_step_info, Data_analysis_step_info, Ai_step_info
from flask_sqlalchemy import SQLAlchemy
from pytz import timezone
import random
from decisionTree import clf
import dummy
import userTestQuestion
import numpy as np
import courseData


load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.environ.get('FLASK_SESSION_SECRETKEY')

JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
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

    pwHash = hashlib.sha256(pwReceive.encode('utf-8')).hexdigest()

    newUser = User(email = idReceive, 
                    pw = pwHash, 
                    nName = nicknameReceive, 
                    usrType = 0,
                    cDate = datetime.datetime.now(KST), 
                    uDate = datetime.datetime.now(KST), 
                    mbti = None,
                    mbtiTest = None,
                    kolbType = None,
                    kolbProba = None,
                    lrnStep = None,
                    lrnLvl = None, 
                    lrnType = None, 
                    gamiLvl = 0, 
                    gamiExp = 0,
                    usrTestTry = 0)

    db.session.add(newUser)
    db.session.commit()
    
    return jsonify({"state":"success"})



#[POST] 로그인 api
@app.route('/api/login', methods=['POST'])
def login():
    jsonReceive = request.get_json()

    idReceive = jsonReceive['email']
    pwReceive = jsonReceive['pw']

    pwHash = hashlib.sha256(pwReceive.encode('utf-8')).hexdigest()
    
    queryRes = db.session.query(User).filter(User.userEmail == idReceive, User.userPassword == pwHash).first()
    
    if queryRes is not None:
        result = {}
        result['state'] = 'success'

        result['info'] = {}
        result['info']['userName'] = queryRes.userNickname
        result['info']['userId'] = queryRes.userId
        result['info']['userEmail'] = queryRes.userEmail
        result['info']['type'] = queryRes.userLearnerType
        result['info']['step'] = queryRes.userLearningStep

        #Access Token
        payload = {
            'id': idReceive,
            'exp': datetime.datetime.now(KST) + datetime.timedelta(hours=5) #추후 만료 처리 후 수정할 예정입니다.
        }
        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
        result['info']['token'] = token

        #Refresh Token
        """
        payloadRefresh = {
            'exp': datetime.datetime.now(KST) + datetime.timedelta(hours=1)
        }
        tokenRefresh = jwt.encode(payloadRefresh, JWT_SECRET_KEY, algorithm='HS256')
        result['refreshToken'] = tokenRefresh
        """

        return jsonify(result)
    else:
        return jsonify({'state':'fail', 'msg':'아이디 또는 비밀번호가 일치하지 않습니다.'})



#[GET] JWT 리프레시 api
@app.route('/api/refresh', methods=['GET'])
def refresh():
    return jsonify({'state':'success'})



#[POST] 메인페이지 정보 api
@app.route('/api/main', methods=['POST'])
def main():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                resultJson = {}

                kolbProba = queryRes.userKolbProbability
                kolbProba = list(kolbProba.split(','))
                kolbProba = list(map(float, kolbProba))

                rader = queryRes.userMbtiTest
                rader = list(rader.split(','))
                rader = list(map(int, rader))

                userProgQueryRes = db.session.query(Learning_check, Learning_contents).filter(Learning_check.learningContentId == Learning_contents.learningContentId, Learning_check.userId == queryRes.userId, Learning_contents.learningContentStep == queryRes.userLearningStep).all()

                resultJson['state'] = 'success'
                resultJson['mbti'] = queryRes.userMbti
                resultJson['kolbProba'] = kolbProba
                resultJson['rader'] = rader
                resultJson['totalUserProgress'] = dummy.mainJson['totalUserProgress'] #totalUserProgress는 더미데이터를 보내줍니다.
                resultJson['userProgress'] = int(((len(userProgQueryRes) / 2) / len(courseData.integrated_version[queryRes.userLearningStep])) * 100) #db에 learning_check가 두 번씩 들어가서 2로 나누고 있습니다.

                return jsonify(resultJson)
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>

    else:
        return jsonify({'state':'fail'})



#[POST] 전체 학습 페이지 api
@app.route('/api/course', methods=['POST'])
def course():
    if request.method == 'POST':
        reqJson = request.get_json()
        #################################################################### db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                learningKeywords = courseData.integrated_version[queryRes.userLearningStep]
                bubbleSizesQueryRes = db.session.query(User_bubble_size_info).filter(User_bubble_size_info.userId == queryRes.userId, User_bubble_size_info.userLearningStep == queryRes.userLearningStep).first()

                bubbleSizes = [bubbleSizesQueryRes.content1, bubbleSizesQueryRes.content2, bubbleSizesQueryRes.content3, bubbleSizesQueryRes.content4, bubbleSizesQueryRes.content5, bubbleSizesQueryRes.content6, bubbleSizesQueryRes.content7, bubbleSizesQueryRes.content8, bubbleSizesQueryRes.content9, bubbleSizesQueryRes.content10]
                
                resultJson = {}
                resultJson['state'] = 'success'
                resultJson['data'] = []
                resultJson['metaverse'] = []
                for i in range(len(learningKeywords)):
                    resultJson['data'].append({})
                    resultJson['data'][i]['id'] = i + 1
                    resultJson['data'][i]['name'] = learningKeywords[i]
                    resultJson['data'][i]['size'] = bubbleSizes[i]
                    resultJson['data'][i]['week'] = i + 1
                    resultJson['metaverse'].append('https://app.gather.town/app/KxbGPczKS6ld3Fxt/SKKUMeta') #현재는 고정 값을 보내줍니다.

                return jsonify(resultJson)
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        #################################################################### <여기까지>

    else:
        return jsonify({'state':'fail'})



#[POST] 퀴즈 데이터 api
@app.route('/api/quiz', methods=['POST'])
def quiz():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            week = reqJson['week']

            if queryRes is not None:
                #현재는 7주차에 대한 데이터를 보내줍니다.
                if week == 7 :
                    return jsonify(dummy.quizJson)
                else:
                    return jsonify(dummy.quizJson2) #7주차가 아닌 것에는 프로토버전을 보내줍니다.

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>


#[POST] 퀴즈 채점 및 학습 체크 api
@app.route('/api/quizGrade', methods=['POST'])
def quizGrade():
    if request.method == 'POST':
        reqJson = request.get_json()

        ###################################################################### db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                week = int(reqJson['week'])
                userQuizAnswer = reqJson['data'] #프론트에서 문제 선택지 번호가 0부터 시작하는 것인지 궁금합니다.

                #현재는 더미데이터를 기준으로 채점 로직을 수행합니다.(7주차 기준)
                correctAnswerCnt = 0
                for i in range(dummy.quizResultJson['totalQuizNum']):
                    if userQuizAnswer[i] == dummy.quizResultJson['correctAnswer'][i]: #비교하는 더미데이터도 일단 0부터 시작으로 합니다.
                        correctAnswerCnt += 1

                userQuizAnswer = str(userQuizAnswer)
                userQuizAnswer = userQuizAnswer[1:len(userQuizAnswer)-1].replace(' ','')
                
                quizResultQueryRes = db.session.query(Quiz_result).filter(Quiz_result.userId == queryRes.userId, Quiz_result.quizStep == queryRes.userLearningStep, Quiz_result.quizWeek == week).first()

                #db 쿼리 결과 퀴즈 응시 내역이 존재하면 퀴즈 점수를 업데이트 하고 존재하지 않으면 데이터를 추가합니다.
                if quizResultQueryRes is None:
                    newQuizResult = Quiz_result(usrId = queryRes.userId, 
                                                qStep = queryRes.userLearningStep,
                                                qWeek = week,
                                                qResultAns = userQuizAnswer,
                                                qResultScr = correctAnswerCnt)
                    db.session.add(newQuizResult)
                    db.session.commit()
                
                else:
                    quizResultQueryRes.quizResultAnswer = userQuizAnswer
                    quizResultQueryRes.quizResultScore = correctAnswerCnt
                    db.session.commit()

                #quiz 학습 체크 로직
                learningContentsQueryRes = db.session.query(Learning_contents).filter(Learning_contents.learningContentStep == queryRes.userLearningStep, Learning_contents.learningContentWeek == week, Learning_contents.learningContentType == 'quiz').first()

                learningCheckQueryRes = db.session.query(Learning_check).filter(Learning_check.userId == queryRes.userId, Learning_check.learningContentId == learningContentsQueryRes.learningContentId).first()

                if learningCheckQueryRes is None:
                    newLearningCheckResult = Learning_check(usrId = queryRes.userId,
                                                            lrnContentId = learningContentsQueryRes.learningContentId,
                                                            lrnChk = 1)
                    db.session.add(newLearningCheckResult)
                    db.session.commit()

                    bubbleInfoqueryRes = db.session.query(User_bubble_size_info).filter(User_bubble_size_info.userId == queryRes.userId, User_bubble_size_info.userLearningStep == queryRes.userLearningStep).first()

                    bubbleSizes = [bubbleInfoqueryRes.content1, bubbleInfoqueryRes.content2, bubbleInfoqueryRes.content3, bubbleInfoqueryRes.content4, bubbleInfoqueryRes.content5, bubbleInfoqueryRes.content6, bubbleInfoqueryRes.content7, bubbleInfoqueryRes.content8, bubbleInfoqueryRes.content9, bubbleInfoqueryRes.content10]

                    #현재는 학습주차의 버블 크기가 100/(그 step의 학습주차 개수) 보다 크면 업데이트합니다.
                    stdBubbleSize = int(100 / len(courseData.integrated_version[queryRes.userLearningStep]))
                    if bubbleSizes[week - 1] > stdBubbleSize:
                        
                        #stdBubbleSize 보다 작은 bubble의 개수를 셉니다.
                        gapSum = 0
                        smallBubbleCnt = 0
                        for i in range(10):
                            if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                break

                            if bubbleSizes[i] < stdBubbleSize:
                                gapSum = gapSum + (stdBubbleSize - bubbleSizes[i])
                                smallBubbleCnt += 1

                        #현재는 러프하게 수식을 적용했습니다. 추후 고도화하기 바랍니다.
                        if smallBubbleCnt > 0:
                            for i in range(10):
                                if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                    break
                                
                                if i == week - 1:
                                    bubbleSizes[i] = stdBubbleSize
                                else:
                                    if bubbleSizes[i] < stdBubbleSize:
                                        bubbleSizes[i] = min(stdBubbleSize, bubbleSizes[i] + int((gapSum / smallBubbleCnt) / 2))

                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[9]
                        db.session.commit()

                return jsonify({'state':'success'})
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ###################################################################### <여기까지>

        userQuizAnswer = quizReqJson['data']

        #현재는 더미데이터를 기준으로 채점 로직을 수행합니다.
        correctAnswerCnt = 0
        for i in range(dummy.quizResultJson['totalQuizNum']):
            userAnswerDummy.append(userQuizAnswer[i])
            if userQuizAnswer[i] == dummy.quizResultJson['correctAnswer'][i]:
                correctAnswerCnt += 1

        #추후 db에 update하는 부분을 작성하면 삭제바랍니다.
        userCorrectAnswerCntDummy = correctAnswerCnt

        return jsonify({'state':'success'})

    else:
        return jsonify({'state':'fail'})



#[GET] 퀴즈 결과 api
#[POST] 퀴즈 결과 with JWT api
@app.route('/api/quiz/result', methods=['GET', 'POST'])
def quizResult():
    if request.method == 'GET':
        #현재는 더미 데이터를 전송합니다. 추후 db 쿼리문을 작성하면 삭제바랍니다.
        dummy.quizResultJson['correctQuizNum'] = userCorrectAnswerCntDummy
        dummy.quizResultJson['userAnswer'] = userAnswerDummy

        return jsonify(dummy.quizResultJson)
    
    elif request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                week = reqJson['week']

                quizResultQueryRes = db.session.query(Quiz_result).filter(Quiz_result.userId == queryRes.userId, Quiz_result.quizStep == queryRes.userLearningStep, Quiz_result.quizWeek == week).first()

                userAnswer = quizResultQueryRes.quizResultAnswer
                userAnswer = list(userAnswer.split(','))
                userAnswer = list(map(int, userAnswer))

                resultJson = {}
                resultJson['state'] = 'success'
                #현재는 7주차를 기준으로 전송합니다.
                resultJson['data'] = dummy.quizResultJson['data']

                resultJson['result'] = {}
                resultJson['result']['totalQuizNum'] = 4
                resultJson['result']['correctQuizNum'] = quizResultQueryRes.quizResultScore
                resultJson['result']['userAnswer'] = userAnswer #0부터 시작
                resultJson['result']['correctAnswer'] = dummy.quizResultJson['correctAnswer'] #0부터 시작

                return jsonify(resultJson) 
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>

    else:
        return jsonify({'state':'fail'})
    


#[GET] 영상pdf 데이터 api
#[POST] 영상pdf 데이터 with JWT api
@app.route('/api/lecture', methods=['GET', 'POST'])
def lecture():
    if request.method == 'GET':
        #현재는 더미 데이터를 전송합니다.
        return jsonify(dummy.lectureJson)

    elif request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        week = int(reqJson['week'])
        id = reqJson['id']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                #영상 학습 체크 로직
                learningContentsQueryRes = db.session.query(Learning_contents).filter(Learning_contents.learningContentStep == queryRes.userLearningStep, Learning_contents.learningContentWeek == week, Learning_contents.learningContentType == 'video').first()

                learningCheckQueryRes = db.session.query(Learning_check).filter(Learning_check.userId == queryRes.userId, Learning_check.learningContentId == learningContentsQueryRes.learningContentId).first()

                if learningCheckQueryRes is None:
                    newLearningCheckResult = Learning_check(usrId = queryRes.userId,
                                                            lrnContentId = learningContentsQueryRes.learningContentId,
                                                            lrnChk = 1)
                    db.session.add(newLearningCheckResult)
                    db.session.commit()

                    bubbleInfoqueryRes = db.session.query(User_bubble_size_info).filter(User_bubble_size_info.userId == queryRes.userId, User_bubble_size_info.userLearningStep == queryRes.userLearningStep).first()

                    bubbleSizes = [bubbleInfoqueryRes.content1, bubbleInfoqueryRes.content2, bubbleInfoqueryRes.content3, bubbleInfoqueryRes.content4, bubbleInfoqueryRes.content5, bubbleInfoqueryRes.content6, bubbleInfoqueryRes.content7, bubbleInfoqueryRes.content8, bubbleInfoqueryRes.content9, bubbleInfoqueryRes.content10]

                    #현재는 학습주차의 버블 크기가 100/(그 step의 학습주차 개수) 보다 크면 업데이트합니다.
                    stdBubbleSize = int(100 / len(courseData.integrated_version[queryRes.userLearningStep]))
                    if bubbleSizes[week - 1] > stdBubbleSize:
                        
                        #stdBubbleSize 보다 작은 bubble의 개수를 셉니다.
                        gapSum = 0
                        smallBubbleCnt = 0
                        for i in range(10):
                            if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                break

                            if bubbleSizes[i] < stdBubbleSize:
                                gapSum = gapSum + (stdBubbleSize - bubbleSizes[i])
                                smallBubbleCnt += 1

                        #현재는 러프하게 수식을 적용했습니다. 추후 고도화하기 바랍니다.
                        if smallBubbleCnt > 0:
                            for i in range(10):
                                if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                    break
                                
                                if i == week - 1:
                                    bubbleSizes[i] = stdBubbleSize
                                else:
                                    if bubbleSizes[i] < stdBubbleSize:
                                        bubbleSizes[i] = min(stdBubbleSize, bubbleSizes[i] + int((gapSum / smallBubbleCnt) / 2))

                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[9]
                        db.session.commit()

                #현재는 더미 데이터를 전송합니다.
                return jsonify(dummy.lectureJson) 
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>

    else:
        return jsonify({'state':'fail'})



#[POST] 게이미피케이션 학습 체크 api 
@app.route('/api/game', methods=['POST'])
def gameCheck():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                #게이미피케이션 학습 체크 로직
                week = int(reqJson['week'])
                learningContentsQueryRes = db.session.query(Learning_contents).filter(Learning_contents.learningContentStep == queryRes.userLearningStep, Learning_contents.learningContentWeek == week, Learning_contents.learningContentType == 'game').first()

                learningCheckQueryRes = db.session.query(Learning_check).filter(Learning_check.userId == queryRes.userId, Learning_check.learningContentId == learningContentsQueryRes.learningContentId).first()

                if learningCheckQueryRes is None:
                    newLearningCheckResult = Learning_check(usrId = queryRes.userId,
                                                            lrnContentId = learningContentsQueryRes.learningContentId,
                                                            lrnChk = 1)
                    db.session.add(newLearningCheckResult)
                    db.session.commit()

                    bubbleInfoqueryRes = db.session.query(User_bubble_size_info).filter(User_bubble_size_info.userId == queryRes.userId, User_bubble_size_info.userLearningStep == queryRes.userLearningStep).first()

                    bubbleSizes = [bubbleInfoqueryRes.content1, bubbleInfoqueryRes.content2, bubbleInfoqueryRes.content3, bubbleInfoqueryRes.content4, bubbleInfoqueryRes.content5, bubbleInfoqueryRes.content6, bubbleInfoqueryRes.content7, bubbleInfoqueryRes.content8, bubbleInfoqueryRes.content9, bubbleInfoqueryRes.content10]

                    #현재는 학습주차의 버블 크기가 100/(그 step의 학습주차 개수) 보다 크면 업데이트합니다.
                    stdBubbleSize = int(100 / len(courseData.integrated_version[queryRes.userLearningStep]))
                    if bubbleSizes[week - 1] > stdBubbleSize:
                        
                        #stdBubbleSize 보다 작은 bubble의 개수를 셉니다.
                        gapSum = 0
                        smallBubbleCnt = 0
                        for i in range(10):
                            if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                break

                            if bubbleSizes[i] < stdBubbleSize:
                                gapSum = gapSum + (stdBubbleSize - bubbleSizes[i])
                                smallBubbleCnt += 1

                        #현재는 러프하게 수식을 적용했습니다. 추후 고도화하기 바랍니다.
                        if smallBubbleCnt > 0:
                            for i in range(10):
                                if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                    break
                                
                                if i == week - 1:
                                    bubbleSizes[i] = stdBubbleSize
                                else:
                                    if bubbleSizes[i] < stdBubbleSize:
                                        bubbleSizes[i] = min(stdBubbleSize, bubbleSizes[i] + int((gapSum / smallBubbleCnt) / 2))

                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[9]
                        db.session.commit()

                return jsonify({'state':'success'})

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>



#[POST] 메타버스 학습 체크 api 
@app.route('/api/metaverse', methods=['POST'])
def metaverseCheck():
    if request.method == 'POST':
        reqJson = request.get_json()
        ########################################################################### db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                #메타버스 학습 체크 로직
                week = int(reqJson['week'])
                learningContentsQueryRes = db.session.query(Learning_contents).filter(Learning_contents.learningContentStep == queryRes.userLearningStep, Learning_contents.learningContentWeek == week, Learning_contents.learningContentType == 'metaverse').first()

                learningCheckQueryRes = db.session.query(Learning_check).filter(Learning_check.userId == queryRes.userId, Learning_check.learningContentId == learningContentsQueryRes.learningContentId).first()

                if learningCheckQueryRes is None:
                    newLearningCheckResult = Learning_check(usrId = queryRes.userId,
                                                            lrnContentId = learningContentsQueryRes.learningContentId,
                                                            lrnChk = 1)
                    db.session.add(newLearningCheckResult)
                    db.session.commit()

                    bubbleInfoqueryRes = db.session.query(User_bubble_size_info).filter(User_bubble_size_info.userId == queryRes.userId, User_bubble_size_info.userLearningStep == queryRes.userLearningStep).first()

                    bubbleSizes = [bubbleInfoqueryRes.content1, bubbleInfoqueryRes.content2, bubbleInfoqueryRes.content3, bubbleInfoqueryRes.content4, bubbleInfoqueryRes.content5, bubbleInfoqueryRes.content6, bubbleInfoqueryRes.content7, bubbleInfoqueryRes.content8, bubbleInfoqueryRes.content9, bubbleInfoqueryRes.content10]

                    #현재는 학습주차의 버블 크기가 100/(그 step의 학습주차 개수) 보다 크면 업데이트합니다.
                    stdBubbleSize = int(100 / len(courseData.integrated_version[queryRes.userLearningStep]))
                    if bubbleSizes[week - 1] > stdBubbleSize:
                        
                        #stdBubbleSize 보다 작은 bubble의 개수를 셉니다.
                        gapSum = 0
                        smallBubbleCnt = 0
                        for i in range(10):
                            if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                break

                            if bubbleSizes[i] < stdBubbleSize:
                                gapSum = gapSum + (stdBubbleSize - bubbleSizes[i])
                                smallBubbleCnt += 1

                        #현재는 러프하게 수식을 적용했습니다. 추후 고도화하기 바랍니다.
                        if smallBubbleCnt > 0:
                            for i in range(10):
                                if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) and i > 7:
                                    break
                                
                                if i == week - 1:
                                    bubbleSizes[i] = stdBubbleSize
                                else:
                                    if bubbleSizes[i] < stdBubbleSize:
                                        bubbleSizes[i] = min(stdBubbleSize, bubbleSizes[i] + int((gapSum / smallBubbleCnt) / 2))

                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = None if (queryRes.userLearningStep == 1 or queryRes.userLearningStep == 2) else bubbleSizes[9]
                        db.session.commit()

                return jsonify({'state':'success'})

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ########################################################################### <여기까지>



#[GET] 학습자 유형 판단 설문 항목 api
#[POST] 학습자 유형 판단 api
@app.route('/api/test', methods=['GET', 'POST'])
def test():
    if request.method == 'GET':
        #현재는 따로 db에 설문 데이터용 테이블을 만들지 않고 설문 데이터를 직접 전송합니다.
        return jsonify(dummy.testJson)

    elif request.method == 'POST':
        reqJson = request.get_json()

        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                result = reqJson["type"]
                mbti = reqJson["mbti"]

                userLearningLevel = int(sum(result[0:16])/16)

                kolbTypes = ['Divergers', 'Assimilators', 'Convergers', 'Accommodators'] #분산자, 융합자, 수렴자, 적응자
                userKolbTypeNum = clf.predict([mbti])[0]
                userKolbType = kolbTypes[userKolbTypeNum - 1]

                lernerTypes = [4, 3, 2, 1] #메타버스, 게이미피케이션, 퀴즈, 영상
                userLearnerType = lernerTypes[userKolbTypeNum - 1]

                queryRes.userKolbType = userKolbType
                queryRes.userLearningLevel = userLearningLevel
                queryRes.userLearnerType = userLearnerType
                db.session.commit()

                return jsonify({'state':'success'})   
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>

        #userId = reqJson["userId"]
        result = reqJson["type"]
        mbti = reqJson["mbti"]

        userLearningLevel = int(sum(result[0:16])/16)

        kolbTypes = ['Divergers', 'Assimilators', 'Convergers', 'Accommodators'] #분산자, 융합자, 수렴자, 적응자
        userKolbTypeNum = clf.predict([mbti])[0]
        userKolbType = kolbTypes[userKolbTypeNum - 1]

        lernerTypes = [3, 2, 1, 0] #메타버스, 게이미피케이션, 퀴즈, 영상
        userLearnerType = lernerTypes[userKolbTypeNum - 1]
        
        return jsonify({'state':'success'})

    else:
        return jsonify({'state':'fail'})



#[POST] 학습자 유형 판단 설문 시도 횟수 api
@app.route('/api/testReady', methods=['POST'])
def testReady():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                resultJson = {}
                resultJson['state'] = 'success'
                resultJson['userTry'] = queryRes.userTestTry
                return jsonify(resultJson)

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>



#[POST] 학습자 유형 판단 설문 MBTI api
@app.route('/api/testMbti', methods=['POST'])
def testMbti():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                #프론트에서 오는 MBTI 정보       | decisionTree 변환
                #E[0,1,2,3,4] I[6,7,8,9,10] | I [1 ~ 10] E
                #N[0,1,2,3,4] S[6,7,8,9,10] | S [1 ~ 10] N
                #F[0,1,2,3,4] T[6,7,8,9,10] | T [1 ~ 10] F
                #J[0,1,2,3,4] P[6,7,8,9,10] | P [1 ~ 10] J
                mbti = reqJson["mbti"]
                for i in range(4):
                    if mbti[i] < 5:
                        mbti[i] = 10 - mbti[i]
                    else:
                        mbti[i] = 10 - mbti[i] + 1

                mbtiTest = str(mbti)
                mbtiTest = mbtiTest[1:len(mbtiTest)-1].replace(' ','')

                kolbTypes = ['Divergers', 'Assimilators', 'Convergers', 'Accommodators'] #분산자, 융합자, 수렴자, 적응자
                userKolbTypeNum = clf.predict([mbti])[0]
                userKolbType = kolbTypes[userKolbTypeNum - 1]

                lernerTypes = [4, 3, 2, 1] #메타버스, 게이미피케이션, 퀴즈, 영상
                userLearnerType = lernerTypes[userKolbTypeNum - 1]

                kolbProba = np.round(clf.predict_proba([mbti])[0] * 100, 2)
                kolbProba = str(list(kolbProba))
                kolbProba = kolbProba[1:len(kolbProba)-1].replace(' ','')

                queryRes.userMbti = ('I' if mbti[0] <= 5 else 'E') + ('S' if mbti[1] <= 5 else 'N') + ('T' if mbti[2] <= 5 else 'F') + ('P' if mbti[3] <= 5 else 'J')
                queryRes.userMbtiTest = mbtiTest
                queryRes.userKolbType = userKolbType
                queryRes.userKolbProbability = kolbProba
                queryRes.userLearnerType = userLearnerType
                db.session.commit()

                return jsonify({'state':'success'})   

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>



#[POST] 학습자 유형 판단 설문 Step api
@app.route('/api/testStep', methods=['POST'])
def testStep():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                step = reqJson["step"]

                queryRes.userLearningStep = step
                db.session.commit()

                return jsonify({'state':'success'})   

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>



#[POST] 학습자 유형 판단 설문 api
@app.route('/api/testTypeQuestion', methods=['POST'])
def testTypeQuestion():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                step = queryRes.userLearningStep

                if step == 0:
                    return jsonify(userTestQuestion.basic_python_json)

                elif step == 1:
                    return jsonify(userTestQuestion.data_structure_json)

                elif step == 2:
                    return jsonify(userTestQuestion.algorithm_json)

                elif step == 3:
                    return jsonify(userTestQuestion.data_analysis_json)

                elif step == 4:
                    return jsonify(userTestQuestion.ai_json)

                else:
                    return jsonify({'state':'fail'})

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>



#[POST] 학습자 유형 판단 설문 Type api
@app.route('/api/testType', methods=['POST'])
def testType():
    if request.method == 'POST':
        reqJson = request.get_json()
        ##################################################### db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                level = reqJson['type']
                step = queryRes.userLearningStep

                invertedBubbleSizes = []
                for i in range(len(courseData.integrated_version[step])):
                    invertedBubbleSizes.append(8 - level[i])

                sumInvertedLevel = sum(invertedBubbleSizes)
                bubbleSizes = []
                for i in range(len(courseData.integrated_version[step])):
                    bubbleSizes.append(int((invertedBubbleSizes[i] / sumInvertedLevel) * 100))

                bubbleInfoqueryRes = db.session.query(User_bubble_size_info).filter(User_bubble_size_info.userId == queryRes.userId, User_bubble_size_info.userLearningStep == step).first()

                if bubbleInfoqueryRes is None:
                    newBubbleInfoResult = User_bubble_size_info(usrId = queryRes.userId,
                                                                usrLrnStep = step,
                                                                content1 = bubbleSizes[0],
                                                                content2 = bubbleSizes[1],
                                                                content3 = bubbleSizes[2],
                                                                content4 = bubbleSizes[3],
                                                                content5 = bubbleSizes[4],
                                                                content6 = bubbleSizes[5],
                                                                content7 = bubbleSizes[6],
                                                                content8 = bubbleSizes[7],
                                                                content9 = None if (step == 1 or step == 2) else bubbleSizes[8],
                                                                content10 = None if (step == 1 or step == 2) else bubbleSizes[9])
                    db.session.add(newBubbleInfoResult)
                    db.session.commit()
                
                else:
                    bubbleInfoqueryRes.content1 = bubbleSizes[0]
                    bubbleInfoqueryRes.content2 = bubbleSizes[1]
                    bubbleInfoqueryRes.content3 = bubbleSizes[2]
                    bubbleInfoqueryRes.content4 = bubbleSizes[3]
                    bubbleInfoqueryRes.content5 = bubbleSizes[4]
                    bubbleInfoqueryRes.content6 = bubbleSizes[5]
                    bubbleInfoqueryRes.content7 = bubbleSizes[6]
                    bubbleInfoqueryRes.content8 = bubbleSizes[7]
                    bubbleInfoqueryRes.content9 = None if (step == 1 or step == 2) else bubbleSizes[8]
                    bubbleInfoqueryRes.content10 = None if (step == 1 or step == 2) else bubbleSizes[9]
                    db.session.commit()

                return jsonify({'state':'success'})   

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ##################################################### <여기까지>



#[GET] 학습자 유형 결과 api
#[POST] 학습자 유형 결과 with JWT api
@app.route('/api/testResult', methods=['GET', 'POST'])
def testresult():
    if request.method == 'GET':
        return jsonify({'state':'success'})

    elif request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                resultJson = {}
                resultJson['state'] = 'success'
                resultJson['type'] = queryRes.userLearnerType
                resultJson['step'] = queryRes.userLearningStep

                queryRes.userTestTry = queryRes.userTestTry + 1
                db.session.commit()

                return jsonify(resultJson)

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>
        
    else:
        return jsonify({'state':'fail'})



#[POST] 주차별 퀴즈 점수2 api
@app.route('/api/score', methods=['POST'])
def score():
    if request.method == 'POST':
        reqJson = request.get_json()
        return jsonify(dummy.weekScoreJzon)
    else:
        return jsonify({'state':'fail'})



#curl test api
@app.route('/api/curl', methods=['GET', 'POST'])
def curl():
    if request.method == 'GET':
        return jsonify({'state':'success'})

    elif request.method == 'POST':
        reqJson = request.get_json()

        joinQueryRes = db.session.query(Learning_check, Learning_contents).filter(Learning_check.learningContentId == Learning_contents.learningContentId).all()
        print(joinQueryRes)

        return jsonify({'state':'success'})
    
    else:
        return jsonify({'state':'fail'})



if __name__ == '__main__':
    app.run(debug=True)


#Legacy APIs
############################################################################################################################

#[POST] 전체 학습 페이지 api
@app.route('/api/courseBubbleLegacy', methods=['POST'])
def courseBubbleLegacy():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                if queryRes.userLearningStep == 0:
                    learningKeywords = courseData.basic_python
                    bubbleSizesQueryRes = db.session.query(Basic_step_info).filter(Basic_step_info.userId == queryRes.userId).first()
                    bubbleSizes = [bubbleSizesQueryRes.content1, bubbleSizesQueryRes.content2, bubbleSizesQueryRes.content3, bubbleSizesQueryRes.content4, bubbleSizesQueryRes.content5, bubbleSizesQueryRes.content6, bubbleSizesQueryRes.content7, bubbleSizesQueryRes.content8, bubbleSizesQueryRes.content9, bubbleSizesQueryRes.content10]

                elif queryRes.userLearningStep == 1:
                    learningKeywords = courseData.data_structure
                    bubbleSizesQueryRes = db.session.query(Data_structure_step_info).filter(Data_structure_step_info.userId == queryRes.userId).first()
                    bubbleSizes = [bubbleSizesQueryRes.content1, bubbleSizesQueryRes.content2, bubbleSizesQueryRes.content3, bubbleSizesQueryRes.content4, bubbleSizesQueryRes.content5, bubbleSizesQueryRes.content6, bubbleSizesQueryRes.content7, bubbleSizesQueryRes.content8]

                elif queryRes.userLearningStep == 2:
                    learningKeywords = courseData.algorithm
                    bubbleSizesQueryRes = db.session.query(Algorithm_step_info).filter(Algorithm_step_info.userId == queryRes.userId).first()
                    bubbleSizes = [bubbleSizesQueryRes.content1, bubbleSizesQueryRes.content2, bubbleSizesQueryRes.content3, bubbleSizesQueryRes.content4, bubbleSizesQueryRes.content5, bubbleSizesQueryRes.content6, bubbleSizesQueryRes.content7, bubbleSizesQueryRes.content8]

                elif queryRes.userLearningStep == 3:
                    learningKeywords = courseData.data_analysis
                    bubbleSizesQueryRes = db.session.query(Data_analysis_step_info).filter(Data_analysis_step_info.userId == queryRes.userId).first()
                    bubbleSizes = [bubbleSizesQueryRes.content1, bubbleSizesQueryRes.content2, bubbleSizesQueryRes.content3, bubbleSizesQueryRes.content4, bubbleSizesQueryRes.content5, bubbleSizesQueryRes.content6, bubbleSizesQueryRes.content7, bubbleSizesQueryRes.content8, bubbleSizesQueryRes.content9, bubbleSizesQueryRes.content10]

                elif queryRes.userLearningStep == 4:
                    learningKeywords = courseData.ai
                    bubbleSizesQueryRes = db.session.query(Ai_step_info).filter(Ai_step_info.userId == queryRes.userId).first()
                    bubbleSizes = [bubbleSizesQueryRes.content1, bubbleSizesQueryRes.content2, bubbleSizesQueryRes.content3, bubbleSizesQueryRes.content4, bubbleSizesQueryRes.content5, bubbleSizesQueryRes.content6, bubbleSizesQueryRes.content7, bubbleSizesQueryRes.content8, bubbleSizesQueryRes.content9, bubbleSizesQueryRes.content10]
                
                resultJson = {}
                resultJson['state'] = 'success'
                resultJson['data'] = []
                resultJson['metaverse'] = []
                for i in range(len(learningKeywords)):
                    resultJson['data'].append({})
                    resultJson['data'][i]['id'] = i + 1
                    resultJson['data'][i]['name'] = learningKeywords[i]
                    resultJson['data'][i]['size'] = bubbleSizes[i]
                    resultJson['data'][i]['week'] = i + 1
                    resultJson['metaverse'].append('https://app.gather.town/app/KxbGPczKS6ld3Fxt/SKKUMeta') #현재는 고정 값을 보내줍니다.

                return jsonify(resultJson)
            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>

    else:
        return jsonify({'state':'fail'})



#[GET] 전체 학습 페이지 api
@app.route('/api/courseLegacy', methods=['GET'])
def courseLegacy():
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



#[POST] 학습자 유형 판단 설문 Type api
@app.route('/api/testTypeLegacy', methods=['POST'])
def testTypeLegacy():
    if request.method == 'POST':
        reqJson = request.get_json()
        ############################################################################# db 없이 테스트 하는 경우 주석 처리해주세요. <여기부터>
        tokenReceive = reqJson['token']

        try:
            payload = jwt.decode(tokenReceive, JWT_SECRET_KEY, algorithms=['HS256'])

            queryRes = db.session.query(User).filter(User.userEmail == payload['id']).first()

            if queryRes is not None:
                level = reqJson['type']
                sumLevel = sum(level)
                step = queryRes.userLearningStep
                bubbleSizes = []

                if step == 0:
                    for i in range(10):
                        bubbleSizes.append(100 - int((level[i] / sumLevel) * 100))

                    bubbleInfoqueryRes = db.session.query(Basic_step_info).filter(Basic_step_info.userId == queryRes.userId).first()

                    if bubbleInfoqueryRes is None:
                        newBubbleInfoResult = Basic_step_info(usrId = queryRes.userId, 
                                                                content1 = bubbleSizes[0],
                                                                content2 = bubbleSizes[1],
                                                                content3 = bubbleSizes[2],
                                                                content4 = bubbleSizes[3],
                                                                content5 = bubbleSizes[4],
                                                                content6 = bubbleSizes[5],
                                                                content7 = bubbleSizes[6],
                                                                content8 = bubbleSizes[7],
                                                                content9 = bubbleSizes[8],
                                                                content10 = bubbleSizes[9])
                        db.session.add(newBubbleInfoResult)
                        db.session.commit()
                    
                    else:
                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = bubbleSizes[9]
                        db.session.commit()
                    
                elif step == 1:
                    for i in range(8):
                        bubbleSizes.append(int((level[i] / sumLevel) * 100))

                    bubbleInfoqueryRes = db.session.query(Data_structure_step_info).filter(Data_structure_step_info.userId == queryRes.userId).first()

                    if bubbleInfoqueryRes is None:
                        newBubbleInfoResult = Data_structure_step_info(usrId = queryRes.userId, 
                                                                content1 = bubbleSizes[0],
                                                                content2 = bubbleSizes[1],
                                                                content3 = bubbleSizes[2],
                                                                content4 = bubbleSizes[3],
                                                                content5 = bubbleSizes[4],
                                                                content6 = bubbleSizes[5],
                                                                content7 = bubbleSizes[6],
                                                                content8 = bubbleSizes[7])
                        db.session.add(newBubbleInfoResult)
                        db.session.commit()
                    
                    else:
                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        db.session.commit()

                elif step == 2:
                    for i in range(8):
                        bubbleSizes.append(int((level[i] / sumLevel) * 100))

                    bubbleInfoqueryRes = db.session.query(Algorithm_step_info).filter(Algorithm_step_info.userId == queryRes.userId).first()

                    if bubbleInfoqueryRes is None:
                        newBubbleInfoResult = Algorithm_step_info(usrId = queryRes.userId, 
                                                                content1 = bubbleSizes[0],
                                                                content2 = bubbleSizes[1],
                                                                content3 = bubbleSizes[2],
                                                                content4 = bubbleSizes[3],
                                                                content5 = bubbleSizes[4],
                                                                content6 = bubbleSizes[5],
                                                                content7 = bubbleSizes[6],
                                                                content8 = bubbleSizes[7])
                        db.session.add(newBubbleInfoResult)
                        db.session.commit()
                    
                    else:
                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        db.session.commit()

                elif step == 3:
                    for i in range(10):
                        bubbleSizes.append(int((level[i] / sumLevel) * 100))

                    bubbleInfoqueryRes = db.session.query(Data_analysis_step_info).filter(Data_analysis_step_info.userId == queryRes.userId).first()

                    if bubbleInfoqueryRes is None:
                        newBubbleInfoResult = Data_analysis_step_info(usrId = queryRes.userId, 
                                                                content1 = bubbleSizes[0],
                                                                content2 = bubbleSizes[1],
                                                                content3 = bubbleSizes[2],
                                                                content4 = bubbleSizes[3],
                                                                content5 = bubbleSizes[4],
                                                                content6 = bubbleSizes[5],
                                                                content7 = bubbleSizes[6],
                                                                content8 = bubbleSizes[7],
                                                                content9 = bubbleSizes[8],
                                                                content10 = bubbleSizes[9])
                        db.session.add(newBubbleInfoResult)
                        db.session.commit()
                    
                    else:
                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = bubbleSizes[9]
                        db.session.commit()

                elif step == 4:
                    for i in range(10):
                        bubbleSizes.append(int((level[i] / sumLevel) * 100))

                    bubbleInfoqueryRes = db.session.query(Ai_step_info).filter(Ai_step_info.userId == queryRes.userId).first()

                    if bubbleInfoqueryRes is None:
                        newBubbleInfoResult = Ai_step_info(usrId = queryRes.userId, 
                                                                content1 = bubbleSizes[0],
                                                                content2 = bubbleSizes[1],
                                                                content3 = bubbleSizes[2],
                                                                content4 = bubbleSizes[3],
                                                                content5 = bubbleSizes[4],
                                                                content6 = bubbleSizes[5],
                                                                content7 = bubbleSizes[6],
                                                                content8 = bubbleSizes[7],
                                                                content9 = bubbleSizes[8],
                                                                content10 = bubbleSizes[9])
                        db.session.add(newBubbleInfoResult)
                        db.session.commit()
                    
                    else:
                        bubbleInfoqueryRes.content1 = bubbleSizes[0]
                        bubbleInfoqueryRes.content2 = bubbleSizes[1]
                        bubbleInfoqueryRes.content3 = bubbleSizes[2]
                        bubbleInfoqueryRes.content4 = bubbleSizes[3]
                        bubbleInfoqueryRes.content5 = bubbleSizes[4]
                        bubbleInfoqueryRes.content6 = bubbleSizes[5]
                        bubbleInfoqueryRes.content7 = bubbleSizes[6]
                        bubbleInfoqueryRes.content8 = bubbleSizes[7]
                        bubbleInfoqueryRes.content9 = bubbleSizes[8]
                        bubbleInfoqueryRes.content10 = bubbleSizes[9]
                        db.session.commit()

                else:
                    return jsonify({'state':'fail'})

                return jsonify({'state':'success'})   

            else:
                return jsonify({'state':'fail', 'msg':'사용자 정보가 존재하지 않습니다.'})

        except jwt.ExpiredSignatureError:
            return jsonify({'state':'fail', 'msg':'로그인 시간이 만료되었습니다.'})

        except jwt.exceptions.DecodeError:
            return jsonify({'state':'fail', 'msg':'로그인 정보가 존재하지 않습니다.'})
        ############################################################################# <여기까지>