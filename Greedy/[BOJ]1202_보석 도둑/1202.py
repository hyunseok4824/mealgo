from heapq import heappop, heappush
from collections import defaultdict
import sys

c_input = sys.stdin.readline

N, K = map(int, c_input().split())
jewels = defaultdict(list)
for _ in range(N):
    m, v = map(int, c_input().split())
    jewels[m].append(v)

capacities = [int(c_input()) for _ in range(K)]
capacities.sort()

temp = []
ans = 0
avaliable = sorted(jewels.keys())

i = 0

for capacity in capacities:
    while i < len(jewels) and capacity >= avaliable[i]:
        for jewel_value in jewels[avaliable[i]]:
            heappush(temp, -jewel_value)
        i+= 1

    if temp:
        ans -= heappop(temp)

print(ans)