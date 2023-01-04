from decisionTree import clf
import numpy as np

# 사용자의 MBTI 값 입력 ( I 1~10 E / S 1~10 N / T 1~10 F / P 1~10 J )
user = [[7, 9, 3, 8]]

# 사용자의 Kolb 유형 ( 1: Divergers / 2: Assimilators / 3: Convergers / 4: Accommodators )
kolb_type = clf.predict(user)[0]

# 사용자의 각 Kolb 유형별 퍼센트단위 확률 ( 소수 둘째자리 반올림 / index 0번부터 차례로 Divergers, Assimilators, Convergers, Accommodators )
kolb_percent = np.round(clf.predict_proba(user)[0] * 100, 2)

print(kolb_type)
print(kolb_percent)