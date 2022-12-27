import numpy as np
import pandas as pd
from sklearn import tree
# from os import system                
# system("pip install graphviz")  # 필요 시에 사용해 주세요!

def encodingEI(x):
  if x == '외향 (Extraversion)':
    return 10
  elif x == '내향 (Introversion)':
    return 1

def encodingNS(x):
  if x == '직관 (iNtuition)':
    return 10
  elif x == '감각 (Sensing)':
    return 1

def encodingFT(x):
  if x == '감정 (Feeling)':
    return 10
  elif x == '사고 (Thinking)':
    return 1

def encodingJP(x):
  if x == '판단 (Judging)':
    return 10
  elif x == '인식 (Perceiving)':
    return 1

def encodingKolb(x):
  if x == '분산자':
    return 1
  elif x == '융합자':
    return 2
  elif x == '수렴자':
    return 3
  elif x == '적응자':
    return 4

def reverseScore(x):
  if x == 1:
    return 7
  elif x == 2:
    return 6
  elif x == 3:
    return 5
  elif x == 4:
    return 4
  elif x == 5:
    return 3
  elif x == 6:
    return 2
  elif x == 7:
    return 1


PATH = './data.csv'  # Enter the adress
df = pd.read_csv(PATH)

# # 리버싱 해야하는 문항 여기에 추가하기
# reversingList = ['lp2_r', 'lp3_r', 'lp4_r', 'lp5_r', 'lp6_r', 'lp7_r', 'lp8_r']

# for i in reversingList:
#   df[i] = df[i].apply(reverseScore)
#   df = df.astype({i:'int'})

df['e_i'] = df['e_i'].apply(encodingEI)
df['i_s'] = df['i_s'].apply(encodingNS)
df['f_t'] = df['f_t'].apply(encodingFT)
df['j_p'] = df['j_p'].apply(encodingJP)
df['kolb_type'] = df['kolb_type'].apply(encodingKolb)

df_x = df[['e_i', 'i_s', 'f_t', 'j_p']].values
df_y = df['kolb_type']
clf = tree.DecisionTreeClassifier(criterion = "entropy", max_depth = 4)
clf = clf.fit(df_x, df_y)

if __name__ == "__main__":
    # 사용자의 Kolb 유형 결과
    user = [[7, 9, 3, 8]]   # 사용자의 MBTI 값 입력 ( I 1~10 E / S 1~10 N / T 1~10 F / P 1~10 J )
    clf.predict(user)[0]