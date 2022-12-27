from decisionTree import clf

# 사용자의 Kolb 유형 결과
user = [[7, 5, 9, 9]]   # 사용자의 MBTI 값 입력 ( I 1~10 E / S 1~10 N / T 1~10 F / P 1~10 J )
print(clf.predict(user)[0])