- **문제** : 백준 1753번 : 최단경로
- **난이도** : 골드 3
- **문제 유형** : 다익스트라
- **푼 언어** : Python

## 01. 문제 설명
방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.

### 입력
첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.

### 출력
첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력한다. 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.

## 02. 문제 풀이
다익스트라 알고리즘을 활용하여 문제를 해결하였다.

distance 리스트를 초기화하는 값은 vertices_num * 10 + 1로 설정했는데, 이는 모든 정점 수 * 문제에서 제시한 가중치의 최댓값 + 1로, 문제에서 나올 수 없는 최소한의 값으로 설정하였다.

문제에서 **'서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.'** 라고 명시되어 있었다. 그래서 중복제거를 위해 배열 안에 딕셔너리 자료구조를 두어서, 같은 간선이 있는지 빠르게 탐색하도록 하였다. 만약 같은 간선이 있다면 가중치끼리 비교하여 좀 더 적은 가중치로 업데이트하여 서로 다른 두 정점 사이에 한 간선만 남도록 정리하였다.

다익스트라 알고리즘은 일반적인 다익스트라 알고리즘과 유사하다. heap 자료구조를 사용하여 최단비용을 우선으로 탐색하도록 하였다. 
  <코드>
```Python
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


```
