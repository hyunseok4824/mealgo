import sys
input = sys.stdin.readline

from heapq import heappop, heappush


def dijkstra (v) :

    cost_table[v] = 0
    heap = []
    heappush(heap, [v, 0])  # [node, cost]
    while heap:
        cur, cur_cost = heappop(heap)

        if cost_table[cur] < cur_cost:
            continue

        for nxt, nxt_cost in graph[cur]:
            sum_cost = cur_cost + nxt_cost

            if cost_table[nxt] <= sum_cost:
                continue

            cost_table[nxt] = sum_cost
            heappush(heap, [nxt, sum_cost])

N = int(input()) # 도시의 개수
M = int(input()) # 버스의 개수

graph = [[] for i in range(N+1)]
for i in range(M):
    start, end, cost = map(int, input().split())
    graph[start].append([end, cost])

start_pnt, end_pnt = map(int, input().split())  # 시작지점, 끝지점

INIT = 100000 * N
cost_table = [INIT] * (N + 1)
dijkstra(start_pnt)

print(cost_table[end_pnt])
