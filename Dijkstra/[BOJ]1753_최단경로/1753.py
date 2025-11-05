from heapq import heappop, heappush
import sys

input = sys.stdin.readline

vertices_num, edges_num = map(int, input().split())
start_point = int(input())

MAX_V = vertices_num * 10 + 1  # (총 점점 수 * 가중치 최댓값) + 1

graph = [{} for _ in range(vertices_num + 1)]

def dijkstra(v) :
    distance_list = [MAX_V] * (vertices_num + 1)

    distance_list[v] = 0
    heap = []
    heappush(heap, (0, v))

    while heap:
        cur_dist, cur_vertex = heappop(heap)

        if cur_dist > distance_list[cur_vertex]:
            continue

        cur_edge = graph[cur_vertex]
        for next_vertex in cur_edge:
            next_dist = cur_edge[next_vertex] + cur_dist

            if next_dist < distance_list[next_vertex]:
                distance_list[next_vertex] = next_dist
                heappush(heap, (next_dist, next_vertex))

    return distance_list[1:]

for _ in range(edges_num):
    start, end, dist = map(int, input().split())
    previous_dist = graph[start].get(end, MAX_V)
    if dist < previous_dist:
        graph[start][end] = dist

for result in dijkstra(start_point):
    print(result if result != MAX_V else 'INF')

