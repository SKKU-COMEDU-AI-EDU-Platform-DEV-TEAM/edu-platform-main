from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import datetime
from pytz import timezone

db = SQLAlchemy()

KST = timezone('Asia/Seoul')



class User(db.Model):
    """
    +-----------------------+--------------+------+-----+---------+----------------+
    | Field                 | Type         | Null | Key | Default | Extra          |
    +-----------------------+--------------+------+-----+---------+----------------+
    | userId                | int          | NO   | PRI | NULL    | auto_increment |
    | userEmail             | varchar(255) | NO   |     | NULL    |                |
    | userPassword          | varchar(255) | NO   |     | NULL    |                |
    | userNickname          | varchar(50)  | NO   |     | NULL    |                |
    | userType              | int          | NO   |     | NULL    |                |
    | userCreateDate        | date         | NO   |     | NULL    |                |
    | userUpdateDate        | date         | NO   |     | NULL    |                |
    | userMbti              | varchar(50)  | YES  |     | NULL    |                |
    | userMbtiTest          | varchar(50)  | YES  |     | NULL    |                |
    | userKolbType          | varchar(50)  | YES  |     | NULL    |                |
    | userKolbProbability   | varchar(50)  | YES  |     | NULL    |                |
    | userLearningStep      | int          | YES  |     | NULL    |                |
    | userLearningLevel     | int          | YES  |     | NULL    |                |
    | userLearnerType       | int          | YES  |     | NULL    |                |
    | userGamificationLevel | int          | NO   |     | NULL    |                |
    | userGamificationExp   | int          | NO   |     | NULL    |                |
    | userTestTry           | int          | NO   |     | NULL    |                |
    +-----------------------+--------------+------+-----+---------+----------------+
    """

    __tablename__ = 'user'
    
    userId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userEmail = db.Column(db.String(255, 'utf8mb4_unicode_ci'), nullable=False)
    userPassword = db.Column(db.String(255, 'utf8mb4_unicode_ci'), nullable=False)
    userNickname = db.Column(db.String(50, 'utf8mb4_unicode_ci'), nullable=False)
    userType = db.Column(db.Integer, nullable=False)
    userCreateDate = db.Column(db.DateTime, nullable=False, default=datetime.now(KST))
    userUpdateDate = db.Column(db.DateTime, nullable=False, default=datetime.now(KST))
    userMbti = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userMbtiTest = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userKolbType = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userKolbProbability = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userLearningStep = db.Column(db.Integer)
    userLearningLevel = db.Column(db.Integer)
    userLearnerType = db.Column(db.Integer)
    userGamificationLevel = db.Column(db.Integer, nullable=False, default=0)
    userGamificationExp = db.Column(db.Integer, nullable=False, default=0)
    userTestTry = db.Column(db.Integer, nullable=False)

    def __init__(self, email, pw, nName, usrType, cDate, uDate, mbti, mbtiTest, kolbType, kolbProba, lrnStep, lrnLvl, lrnType, gamiLvl, gamiExp, usrTestTry):
        self.userEmail = email
        self.userPassword = pw
        self.userNickname = nName
        self.userType = usrType
        self.userCreateDate = cDate
        self.userUpdateDate = uDate
        self.userMbti = mbti
        self.userMbtiTest = mbtiTest
        self.userKolbType = kolbType
        self.userKolbProbability = kolbProba
        self.userLearningStep = lrnStep
        self.userLearningLevel = lrnLvl
        self.userLearnerType = lrnType
        self.userGamificationLevel = gamiLvl
        self.userGamificationExp = gamiExp
        self.userTestTry = usrTestTry

    def __repr__(self):
        return '<User %r %r %r %r %r %r %r %r %r %r %r>' % (self.userNickname, self.userId, self.userEmail, self.userMbti, self.userMbtiTest, self.userKolbType, self.userKolbProbability, self.userLearningStep, self.userLearningLevel, self.userLearnerType, self.userTestTry)



class Learning_contents(db.Model):
    """
    +---------------------+---------------+------+-----+---------+----------------+
    | Field               | Type          | Null | Key | Default | Extra          |
    +---------------------+---------------+------+-----+---------+----------------+
    | learningContentId   | int           | NO   | PRI | NULL    | auto_increment |
    | learningContentStep | int           | NO   |     | NULL    |                |
    | learningContentWeek | int           | NO   |     | NULL    |                |
    | learningContentName | varchar(255)  | NO   |     | NULL    |                |
    | learningContentType | varchar(255)  | NO   |     | NULL    |                |
    | learningContentLink | varchar(2047) | NO   |     | NULL    |                |
    +---------------------+---------------+------+-----+---------+----------------+
    """

    __tablename__ = 'learning_contents'

    learningContentId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    learningContentStep = db.Column(db.Integer, nullable=False)
    learningContentWeek = db.Column(db.Integer, nullable=False)
    learningContentName = db.Column(db.String(255, 'utf8mb4_unicode_ci'), nullable=False)
    learningContentType = db.Column(db.String(255, 'utf8mb4_unicode_ci'), nullable=False)
    learningContentLink = db.Column(db.String(2047, 'utf8mb4_unicode_ci'), nullable=False)

    def __init__(self, lrnStep, lrnCWeek, lrnName, lrnCType, lrnCLink):
        self.learningContentStep = lrnStep
        self.learningContentWeek = lrnCWeek
        self.learningContentName = lrnName
        self.learningContentType = lrnCType
        self.learningContentLink = lrnCLink

    def __repr__(self):
        return '<User %r %r %r %r %r %r>' % (self.learningContentId, self.learningContentStep, self.learningContentWeek, self.learningContentName, self.learningContentType, self.learningContentLink)



class Quiz(db.Model):
    """
    +----------------+---------------+------+-----+---------+----------------+
    | Field          | Type          | Null | Key | Default | Extra          |
    +----------------+---------------+------+-----+---------+----------------+
    | quizId         | int           | NO   | PRI | NULL    | auto_increment |
    | quizStep       | int           | NO   |     | NULL    |                |
    | quizWeek       | int           | NO   |     | NULL    |                |
    | quizNumber     | int           | NO   |     | NULL    |                |
    | quizQuestion   | varchar(1023) | NO   |     | NULL    |                |
    | quizDefinition | varchar(1023) | NO   |     | NULL    |                |
    | quizChoice1    | varchar(1023) | NO   |     | NULL    |                |
    | quizChoice2    | varchar(1023) | NO   |     | NULL    |                |
    | quizChoice3    | varchar(1023) | NO   |     | NULL    |                |
    | quizChoice4    | varchar(1023) | NO   |     | NULL    |                |
    | quizAnswer     | int           | NO   |     | NULL    |                |
    +----------------+---------------+------+-----+---------+----------------+
    """

    __tablename__ = 'quiz'

    quizId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    quizStep = db.Column(db.Integer, nullable=False)
    quizWeek = db.Column(db.Integer, nullable=False)
    quizNumber = db.Column(db.Integer, nullable=False)
    quizQuestion = db.Column(db.String(1023, 'utf8mb4_unicode_ci'), nullable=False)
    quizDefinition = db.Column(db.String(1023, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice1 = db.Column(db.String(1023, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice2 = db.Column(db.String(1023, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice3 = db.Column(db.String(1023, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice4 = db.Column(db.String(1023, 'utf8mb4_unicode_ci'), nullable=False)
    quizAnswer = db.Column(db.Integer, nullable=False)

    def __init__(self, qStep, qWeek, qNum, qQuestion, qDef, qChoice1, qChoice2, qChoice3, qChoice4, qAns):
        self.quizStep = qStep
        self.quizWeek = qWeek
        self.quizNumber = qNum
        self.quizQuestion = qQuestion
        self.quizDefinition = qDef
        self.quizChoice1 = qChoice1
        self.quizChoice2 = qChoice2
        self.quizChoice3 = qChoice3
        self.quizChoice4 = qChoice4
        self.quizAnswer = qAns

    def __repr__(self):
        return '<User %r %r %r %r %r %r %r %r %r %r %r>' % (self.quizId, self.quizStep, self.quizWeek, self.quizNumber, self.quizQuestion, self.quizDefinition, self.quizChoice1, self.quizChoice2, self.quizChoice3, self.quizChoice4, self.quizAnswer)



class Quiz_result(db.Model):
    """
    +------------------+--------------+------+-----+---------+----------------+
    | Field            | Type         | Null | Key | Default | Extra          |
    +------------------+--------------+------+-----+---------+----------------+
    | quizResultId     | int          | NO   | PRI | NULL    | auto_increment |
    | userId           | int          | NO   | MUL | NULL    |                |
    | quizId           | int          | NO   | MUL | NULL    |                |
    | quizResultAnswer | varchar(255) | NO   |     | NULL    |                |
    | quizResultScore  | int          | NO   |     | NULL    |                |
    +------------------+--------------+------+-----+---------+----------------+
    """

    __tablename__ = 'quiz_result'

    quizResultId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    quizId = db.Column(db.Integer, ForeignKey('quiz.quizId'), nullable=False)
    quizResultAnswer = db.Column(db.String(255, 'utf8mb4_unicode_ci'), nullable=False)
    quizResultScore = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, qId, qResultAns, qResultScr):
        self.userId = usrId
        self.quizId = qId
        self.quizResultAnswer = qResultAns
        self.quizResultScore = qResultScr

    def __repr__(self):
        return '<User %r %r %r %r %r>' % (self.quizResultId, self.userId, self.quizId, self.quizResultAnswer, self.quizResultScore)



class Learning_check(db.Model):
    """
    +-------------------+------+------+-----+---------+----------------+
    | Field             | Type | Null | Key | Default | Extra          |
    +-------------------+------+------+-----+---------+----------------+
    | learningCheckId   | int  | NO   | PRI | NULL    | auto_increment |
    | userId            | int  | NO   | MUL | NULL    |                |
    | learningContentId | int  | NO   | MUL | NULL    |                |
    | learningChk       | int  | NO   |     | NULL    |                |
    +-------------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'learning_check'

    learningCheckId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    learningContentId = db.Column(db.Integer, ForeignKey('learning_contents.learningContentId'), nullable=False)
    learningChk = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, lrnContentId, lrnChk):
        self.userId = usrId
        self.learningContentId = lrnContentId
        self.learningChk = lrnChk

    def __repr__(self):
        return '<User %r %r %r %r>' % (self.learningCheckId, self.userId, self.learningContentId, self.learningChk)



class Basic_step_info(db.Model):
    """
    +-----------------+------+------+-----+---------+----------------+
    | Field           | Type | Null | Key | Default | Extra          |
    +-----------------+------+------+-----+---------+----------------+
    | basicStepInfoId | int  | NO   | PRI | NULL    | auto_increment |
    | userId          | int  | NO   | MUL | NULL    |                |
    | content1        | int  | NO   |     | NULL    |                |
    +-----------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'basic_step_info'

    basicStepInfoId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    content1 = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, content1):
        self.userId = usrId
        self.content1 = content1

    def __repr__(self):
        return '<User %r %r %r>' % (self.basicStepInfoId, self.userId, self.content1)



class Data_structure_step_info(db.Model):
    """
    +-------------------------+------+------+-----+---------+----------------+
    | Field                   | Type | Null | Key | Default | Extra          |
    +-------------------------+------+------+-----+---------+----------------+
    | dataStructureStepInfoId | int  | NO   | PRI | NULL    | auto_increment |
    | userId                  | int  | NO   | MUL | NULL    |                |
    | content1                | int  | NO   |     | NULL    |                |
    +-------------------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'data_structure_step_info'

    dataStructureStepInfoId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    content1 = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, content1):
        self.userId = usrId
        self.content1 = content1

    def __repr__(self):
        return '<User %r %r %r>' % (self.dataStructureStepInfoId, self.userId, self.content1)



class Algorithm_step_info(db.Model):
    """
    +---------------------+------+------+-----+---------+----------------+
    | Field               | Type | Null | Key | Default | Extra          |
    +---------------------+------+------+-----+---------+----------------+
    | algorithmStepInfoId | int  | NO   | PRI | NULL    | auto_increment |
    | userId              | int  | NO   | MUL | NULL    |                |
    | content1            | int  | NO   |     | NULL    |                |
    +---------------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'algorithm_step_info'

    algorithmStepInfoId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    content1 = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, content1):
        self.userId = usrId
        self.content1 = content1

    def __repr__(self):
        return '<User %r %r %r>' % (self.algorithmStepInfoId, self.userId, self.content1)



class Data_analysis_step_info(db.Model):
    """
    +------------------------+------+------+-----+---------+----------------+
    | Field                  | Type | Null | Key | Default | Extra          |
    +------------------------+------+------+-----+---------+----------------+
    | dataAnalysisStepInfoId | int  | NO   | PRI | NULL    | auto_increment |
    | userId                 | int  | NO   | MUL | NULL    |                |
    | content1               | int  | NO   |     | NULL    |                |
    +------------------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'data_analysis_step_info'

    dataAnalysisStepInfoId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    content1 = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, content1):
        self.userId = usrId
        self.content1 = content1

    def __repr__(self):
        return '<User %r %r %r>' % (self.dataAnalysisStepInfoId, self.userId, self.content1)



class Ai_step_info(db.Model):
    """
    +--------------+------+------+-----+---------+----------------+
    | Field        | Type | Null | Key | Default | Extra          |
    +--------------+------+------+-----+---------+----------------+
    | aiStepInfoId | int  | NO   | PRI | NULL    | auto_increment |
    | userId       | int  | NO   | MUL | NULL    |                |
    | content1     | int  | NO   |     | NULL    |                |
    +--------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'ai_step_info'

    aiStepInfoId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    content1 = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, content1):
        self.userId = usrId
        self.content1 = content1

    def __repr__(self):
        return '<User %r %r %r>' % (self.aiStepInfoId, self.userId, self.content1)