- **문제** : 백준 1197번 - 최소 스패닝 트리
- **난이도** : 골드 4
- **문제 유형** : 크루스칼 알고리즘
- **푼 언어** : python

## 01. 문제 설명
그래프가 주어졌을 때, 그 그래프의 최소 스패닝 트리를 구하는 프로그램을 작성하시오.
최소 스패닝 트리는, 주어진 그래프의 모든 정점들을 연결하는 부분 그래프 중에서 그 가중치의 합이 최소인 트리를 말한다.

### 입력
첫째 줄에 정점의 개수 V(1 ≤ V ≤ 10,000)와 간선의 개수 E(1 ≤ E ≤ 100,000)가 주어진다. 다음 E개의 줄에는 각 간선에 대한 정보를 나타내는 세 정수 A, B, C가 주어진다. 이는 A번 정점과 B번 정점이 가중치 C인 간선으로 연결되어 있다는 의미이다. C는 음수일 수도 있으며, 절댓값이 1,000,000을 넘지 않는다.

그래프의 정점은 1번부터 V번까지 번호가 매겨져 있고, 임의의 두 정점 사이에 경로가 있다. 최소 스패닝 트리의 가중치가 -2,147,483,648보다 크거나 같고, 2,147,483,647보다 작거나 같은 데이터만 입력으로 주어진다.

### 출력
첫째 줄에 최소 스패닝 트리의 가중치를 출력한다.

## 02. 문제 풀이
간선을 가중치 기준으로 오름차순 정렬한 뒤, 작은 간선부터 확인하며 사이클이 생기지 않는 경우만 선택한다.
이때 Union-Find를 사용해 서로 다른 집합일 때만 간선을 연결하고, 가중치를 결과값에 더한다.
이 과정을 반복하면 모든 정점이 연결되면서 최소 스패닝 트리의 가중치 합을 얻을 수 있다.

  <코드>
  ```python
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

  ```
