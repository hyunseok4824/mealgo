from collections import deque

T = int(input())  # 테스트 케이스 개수

for _ in range(T):
    N = int(input())  # 학생 수
    selected_students = [0] + list(map(int, input().split()))

    indegree = [0] * (N+1)
    for i in range(1, N+1):
        indegree[selected_students[i]] += 1

    q = deque([i for i, c in enumerate(indegree) if c == 0])
    q.popleft()

    while q:
        cur_v = selected_students[q.popleft()]
        indegree[cur_v] -= 1
        if indegree[cur_v] == 0:
            q.append(cur_v)

    result = 0
    for i in range(1, N+1):
        if indegree[i] == 0 :
            result += 1

    print(result)