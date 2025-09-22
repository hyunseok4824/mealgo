- **문제** : 백준 14485번 - 녹색 옷 입은 애가 젤다지?
- **난이도** : 골드 4
- **문제 유형** : Dijkstra
- **푼 언어** : python
- 
## 01. 문제 설명

### 문제
젤다의 전설 게임에서 화폐의 단위는 루피(rupee)다. 그런데 간혹 '도둑루피'라 불리는 검정색 루피도 존재하는데, 이걸 획득하면 오히려 소지한 루피가 감소하게 된다!
젤다의 전설 시리즈의 주인공, 링크는 지금 도둑루피만 가득한 N x N 크기의 동굴의 제일 왼쪽 위에 있다. [0][0]번 칸이기도 하다. 왜 이런 곳에 들어왔냐고 묻는다면 밖에서 사람들이 자꾸 "젤다의 전설에 나오는 녹색 애가 젤다지?"라고 물어봤기 때문이다. 
링크가 녹색 옷을 입은 주인공이고 젤다는 그냥 잡혀있는 공주인데, 게임 타이틀에 젤다가 나와있다고 자꾸 사람들이 이렇게 착각하니까 정신병에 걸릴 위기에 놓인 것이다.

하여튼 젤다...아니 링크는 이 동굴의 반대편 출구, 제일 오른쪽 아래 칸인 [N-1][N-1]까지 이동해야 한다. 동굴의 각 칸마다 도둑루피가 있는데, 이 칸을 지나면 해당 도둑루피의 크기만큼 소지금을 잃게 된다. \
링크는 잃는 금액을 최소로 하여 동굴 건너편까지 이동해야 하며, 한 번에 상하좌우 인접한 곳으로 1칸씩 이동할 수 있다.

링크가 잃을 수밖에 없는 최소 금액은 얼마일까?

### 입력
입력은 여러 개의 테스트 케이스로 이루어져 있다. 

각 테스트 케이스의 첫째 줄에는 동굴의 크기를 나타내는 정수 N이 주어진다. (2 ≤ N ≤ 125) 
N = 0인 입력이 주어지면 전체 입력이 종료된다.

이어서 N개의 줄에 걸쳐 동굴의 각 칸에 있는 도둑루피의 크기가 공백으로 구분되어 차례대로 주어진다. 도둑루피의 크기가 k면 이 칸을 지나면 k루피를 잃는다는 뜻이다. 
여기서 주어지는 모든 정수는 0 이상 9 이하인 한 자리 수다.
### 출력
각 테스트 케이스마다 한 줄에 걸쳐 정답을 형식에 맞춰서 출력한다. 형식은 예제 출력을 참고하시오.

## 02. 문제 풀이

- 첫 번째 방법 <br>
  해당 문제는 [0][0]에서 시작해서 [N-1][N-1]로 이동할 때, 최소 비용인 경로를 구하는 문제다. 
  출발점과 도착점이 정해져 있고, 가중치가 양수이기 때문에 다익스트라(Dijkstra)가 효율적이라 판단하여 처음에는 Dijkstra를 사용해서 문제를 접근했다.

    <코드>
    ```
    from heapq import heappop, heappush
    import sys
    input = sys.stdin.readline
    
    DIRECTIONS = [(1, 0), (0, 1), (-1, 0), (0, -1)]
    INIT_V = 9 * 125 + 1
    
    def dijkstra(start_x, start_y):
        distance = [[INIT_V] * N for _ in range(N)]
        cost = graph[start_x][start_y]
        distance[start_x][start_y] = cost
        heap = []
        heappush(heap, (cost, start_x, start_y))
    
        while heap:
            dist, x, y = heappop(heap)
    
            if distance[x][y] < dist: continue
    
            for dx, dy in DIRECTIONS:
                nx = dx + x
                ny = dy + y
    
                if 0 > nx or nx >= N or 0 > ny or ny >= N: continue
    
                new_cost = dist + graph[nx][ny]
    
                if distance[nx][ny] <= new_cost: continue
    
                distance[nx][ny] = new_cost
                heappush(heap, (new_cost, nx, ny))
    
        return distance[N-1][N-1]
    
    tc = 1
    
    while True:
        N = int(input())
        if N == 0 : break
    
        graph = [list(map(int, input().split())) for _ in range(N)]
    
        print(f'Problem {tc}: {dijkstra(0, 0)}')
        tc += 1
    ```
![solve](solve1.png)
  - 두번째 방법 <br>
    다른 사람들의 코드를 보며 Heap(우선순위 큐)의 본질을 다시 생각하게 되었다.
    Heap을 사용하면 항상 현재까지 비용이 가장 작은 경로가 우선적으로 pop된다.
    즉, 우리가 일일이 distance 배열을 관리하며 최솟값을 비교하지 않아도,
    힙에서 꺼내는 시점에는 이미 그 노드가 현재 탐색 가능한 경로 중 최소 비용이라는 사실이 보장된다.

    이 점을 깨닫고 나니, distance 배열이 필요가 없다는 것을 깨닫게 되었다.
    
    ```python
    from heapq import heappop, heappush
    import sys
    input = sys.stdin.readline
  
    DIRECTIONS = [(1, 0), (0, 1), (-1, 0), (0, -1)]
  
  
    def bfs(r, c):
  
        visited = [[False] * N for _ in range(N)]
        visited[0][0] = True
        heap = [(r, 0, 0)]
  
        while heap:
            rupee, x, y = heappop(heap)
            if x == N -1 and y == N -1 :
                return f'Problem {c}: {rupee}'
  
            for dx, dy in DIRECTIONS:
                nx = dx + x
                ny = dy + y
  
                if 0 <= nx < N and 0 <= ny < N:
                    if visited[nx][ny] : continue
  
                    visited[nx][ny] = True
                    heappush(heap, (rupee + cave[nx][ny], nx, ny))
  
  
    tc = 1
    result = []
    while True:
        N = i
        # 로직 종료 조건
        if N == 0 : break
  
        cave = [list(map(int, input().split())) for _ in range(N)]
        result.append(bfs(cave[0][0], tc))
        tc += 1
  
    print('\n'.join(result))nt(input())

    ```
    ![img.png](solve2.png)

    그런데 해당 코드는 사실 틀릴 가능성도 존재한다.
    이 코드의 문제는 이미 방문한 노드는 최단 경로 계산을 생략한다는 점이다.
    그 결과, 해당 노드를 경유하는 더 작은 비용의 경로가 나중에 발견되더라도, 그 칸을 다시 힙에 담지 않는다.
    이로 인해 일부 상황에서는 최단 경로가 제대로 계산되지 않을 수 있으며,
    이를 방지하려면 거리 배열(dist)을 사용해 더 작은 비용이 나오면 언제든 갱신할 수 있는 정석 다익스트라 방식을 쓰는 것이 안전하다.
    (해당 문제는 입력 구성상 BFS로도 풀 수 있도록 설계된 것 같다.)
    그래도 BFS를 구현할 때 deque 대신 heapq를 쓰면 더 효율적일 수 있다는 점을 배웠다.