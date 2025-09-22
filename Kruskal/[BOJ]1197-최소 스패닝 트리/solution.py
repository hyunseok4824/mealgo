import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline
def find_set(x):
    if parents[x] != x:
        parents[x] = find_set(parents[x])
    return parents[x]

def union(x, y):
    root_x = find_set(x)
    root_y = find_set(y)

    if root_x == root_y:
        return

    if root_x < root_y:
        parents[root_y] = root_x
    else:
        parents[root_x] = root_y

V, E = map(int, input().split())
edges = [list(map(int, input().split())) for _ in range(E)]
edges.sort(key= lambda x: x[2])  # 가중치 기준으로 오름차순 정렬
parents = [i for i in range(V+1)]
res = 0

for s,e,w in edges:
    if find_set(s) != find_set(e):  # 사이클이 아닐 경우
        union(s, e)
        res+= w

print(res)