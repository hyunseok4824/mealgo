import sys
input = sys.stdin.readline

def combine(lev, depth):
    global ans

    if depth == M:
        temp = 0
        for h in range(len(houses)):
            for distance, idx in chicken_dist[h]:
               if selected[idx]:
                    temp += distance
                    break
            if ans <= temp:
                return

        ans = temp
        return

    for x in range(lev, len(chicken_shops)):
        if not selected[x]:
            selected[x] = True
            combine(x + 1, depth + 1)
            selected[x] = False

N, M = map(int, input().split())
houses = []
chicken_shops = []

for i in range(N):
    row = list(map(int, input().split()))
    for j in range(N):
        if row[j] == 1:
            houses.append((i, j))
        elif row[j] == 2:
            chicken_shops.append((i, j))

# 치킨집별→집별 맨해튼 거리 미리 계산
chicken_dist = []
for cx, cy in houses:
    dist = []
    for i, [hx, hy] in enumerate(chicken_shops):
        dist.append([abs(hx - cx) + abs(hy - cy), i])
    dist.sort()
    chicken_dist.append(dist)


selected = [False] * len(chicken_shops)
ans = float('inf')
combine(0, 0)
print(ans)