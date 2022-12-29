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
    | userMbti              | varchar(50)  | NO   |     | NULL    |                |
    | userKolbType          | varchar(50)  | YES  |     | NULL    |                |
    | userLearningLevel     | varchar(50)  | YES  |     | NULL    |                |
    | userInterestTag       | varchar(255) | YES  |     | NULL    |                |
    | userLearnerType       | varchar(50)  | YES  |     | NULL    |                |
    | userGamificationLevel | int          | NO   |     | NULL    |                |
    | userGamificationExp   | int          | NO   |     | NULL    |                |
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
    userMBTI = db.Column(db.String(50, 'utf8mb4_unicode_ci'), nullable=False)
    userKolbType = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userLearningLevel = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userInterestTag = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    userLearnerType = db.Column(db.String(50, 'utf8mb4_unicode_ci'))
    userGamificationLevel = db.Column(db.Integer, nullable=False, default=0)
    userGamificationExp = db.Column(db.Integer, nullable=False, default=0)

    def __init__(self, email, pw, nName, usrType, cDate, uDate, mbti, kolbType, lrnLvl, interestTag, lrnType, gamiLvl, gamiExp):
        self.userEmail = email
        self.userPassword = pw
        self.userNickname = nName
        self.userType = usrType
        self.userCreateDate = cDate
        self.userUpdateDate = uDate
        self.userMBTI = mbti
        self.userKolbType = kolbType
        self.userLearningLevel = lrnLvl
        self.userInterestTag = interestTag
        self.userLearnerType = lrnType
        self.userGamificationLevel = gamiLvl
        self.userGamificationExp = gamiExp

    def __repr__(self):
        return '<User %r %r %r %r>' % self.userNickname % self.userId % self.userEmail % self.userKolbType



class Learning_contents(db.Model):
    """
    +---------------------+---------------+------+-----+---------+----------------+
    | Field               | Type          | Null | Key | Default | Extra          |
    +---------------------+---------------+------+-----+---------+----------------+
    | learningContentId   | int           | NO   | PRI | NULL    | auto_increment |
    | learningContentWeek | int           | NO   |     | NULL    |                |
    | learningContentType | varchar(255)  | NO   |     | NULL    |                |
    | learningContentLink | varchar(2047) | NO   |     | NULL    |                |
    +---------------------+---------------+------+-----+---------+----------------+
    """

    __tablename__ = 'learning_contents'

    learningContentId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    learningContentWeek = db.Column(db.Integer, nullable=False)
    learningContentType = db.Column(db.String(255, 'utf8mb4_unicode_ci'), nullable=False)
    learningContentLink = db.Column(db.String(2047, 'utf8mb4_unicode_ci'), nullable=False)

    def __init__(self, lrnCWeek, lrnCType, lrnCLink):
        self.learningContentWeek = lrnCWeek
        self.learningContentType = lrnCType
        self.learningContentLink = lrnCLink



class Quiz(db.Model):
    """
    +--------------+--------------+------+-----+---------+----------------+
    | Field        | Type         | Null | Key | Default | Extra          |
    +--------------+--------------+------+-----+---------+----------------+
    | quizId       | int          | NO   | PRI | NULL    | auto_increment |
    | quizWeek     | int          | NO   |     | NULL    |                |
    | quizNumber   | int          | NO   |     | NULL    |                |
    | quizQuestion | varchar(511) | NO   |     | NULL    |                |
    | quizChoice1  | varchar(511) | NO   |     | NULL    |                |
    | quizChoice2  | varchar(511) | NO   |     | NULL    |                |
    | quizChoice3  | varchar(511) | NO   |     | NULL    |                |
    | quizChoice4  | varchar(511) | NO   |     | NULL    |                |
    | quizAnswer   | varchar(511) | NO   |     | NULL    |                |
    +--------------+--------------+------+-----+---------+----------------+
    """

    __tablename__ = 'quiz'

    quizId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    quizWeek = db.Column(db.Integer, nullable=False)
    quizNumber = db.Column(db.Integer, nullable=False)
    quizQuestion = db.Column(db.String(511, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice1 = db.Column(db.String(511, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice2 = db.Column(db.String(511, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice3 = db.Column(db.String(511, 'utf8mb4_unicode_ci'), nullable=False)
    quizChoice4 = db.Column(db.String(511, 'utf8mb4_unicode_ci'), nullable=False)
    quizAnswer = db.Column(db.String(511, 'utf8mb4_unicode_ci'), nullable=False)

    def __init__(self, qWeek, qNum, qQuestion, qChoice1, qChoice2, qChoice3, qChoice4, qAns):
        self.quizWeek = qWeek
        self.quizNumber = qNum
        self.quizQuestion = qQuestion
        self.quizChoice1 = qChoice1
        self.quizChoice2 = qChoice2
        self.quizChoice3 = qChoice3
        self.quizChoice4 = qChoice4
        self.quizAnswer = qAns



class Quiz_result(db.Model):
    """
    +-----------------+------+------+-----+---------+----------------+
    | Field           | Type | Null | Key | Default | Extra          |
    +-----------------+------+------+-----+---------+----------------+
    | quizResultId    | int  | NO   | PRI | NULL    | auto_increment |
    | userId          | int  | NO   | MUL | NULL    |                |
    | quizResultWeek  | int  | NO   |     | NULL    |                |
    | quizResultScore | int  | NO   |     | NULL    |                |
    +-----------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'quiz_result'

    quizResultId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    quizResultWeek = db.Column(db.Integer, nullable=False)
    quizResultScore = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, qResultWeek, qResultScore):
        self.userId = usrId
        self.quizResultWeek = qResultWeek
        self.quizResultScore = qResultScore



class Week_learning_check(db.Model):
    """
    +--------------------+------+------+-----+---------+----------------+
    | Field              | Type | Null | Key | Default | Extra          |
    +--------------------+------+------+-----+---------+----------------+
    | weekLearningResult | int  | NO   | PRI | NULL    | auto_increment |
    | userId             | int  | NO   | MUL | NULL    |                |
    | weekNumber         | int  | NO   |     | NULL    |                |
    | weekLearningChk    | int  | NO   |     | NULL    |                |
    +--------------------+------+------+-----+---------+----------------+
    """

    __tablename__ = 'week_learning_check'

    weekLearningResult = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    userId = db.Column(db.Integer, ForeignKey('user.userId'), nullable=False)
    weekNumber = db.Column(db.Integer, nullable=False)
    weekLearningChk = db.Column(db.Integer, nullable=False)

    def __init__(self, usrId, wNum, wLrnChk):
        self.userId = usrId
        self.weekNumber = wNum
        self.weekLearningChk = wLrnChk