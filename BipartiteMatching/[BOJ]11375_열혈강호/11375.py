import sys
sys.setrecursionlimit(100000)

def dfs(x):
    for work in task[x]:
        if not visited[work]:
            visited[work] = True
            if selected[work] == -1 or dfs(selected[work]):
                selected[work] = x
                return True

    return False

N, M = map(int, input().split())  # N : 직원 수, M : 해야할 일의 개수
task = [list(map(int, input().split()))[1:] for _ in range(N)]
selected = [-1] * (M+1)
result = 0

for i in range(N):
    visited = [False] * (M+1)
    if dfs(i):
        result += 1

print(result)