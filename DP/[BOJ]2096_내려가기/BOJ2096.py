import sys 
input = sys.stdin.readline
# sys.stdin = open('BOJ2096_input_1.txt', 'r')

N = int(input())
first_line = list(map(int, input().split()))
maxMemo = first_line
minMemo = first_line


# dp 계산 
for r in range(N-1) :
  cur_line = list(map(int, input().split()))
  maxMemo = [cur_line[0] + max(maxMemo[0], maxMemo[1]), 
              cur_line[1] + max(maxMemo), 
              cur_line[2] + max(maxMemo[1], maxMemo[2])]
  
  minMemo = [cur_line[0] + min(minMemo[0], minMemo[1]), 
              cur_line[1] + min(minMemo), 
              cur_line[2] + min(minMemo[1], minMemo[2])]

print(max(maxMemo), min(minMemo))