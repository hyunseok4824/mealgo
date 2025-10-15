import sys
input = sys.stdin.readline

N, M, R = map(int, input().split()) # 지역의 개수, 수색범위, 길의 개수
item_cnts = list(map(int, input().split()))  # 구역 별 아이템 개수
INF = 3001

dist = [[INF] * (N + 1) for _ in range(N + 1)]

for _ in range(R):
    a, b, d = map(int, input().split())
    dist[a][b] = d
    dist[b][a] = d

for i in range(N+1):
    dist[i][i] = 0

for m in range(1, N+1):
    for i in range(1, N+1):
        for j in range(1, N+1):
            dist[i][j] = min(dist[i][j], dist[i][m] + dist[m][j])
ans = 0
for i in range(1, N+1):
    tmp = 0
    for j in range(1, N+1):
        if dist[i][j] <= M:
           tmp += item_cnts[j-1]
    ans = max(ans, tmp)

print(ans)
