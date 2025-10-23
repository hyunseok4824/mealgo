- **문제** : 백준 1916번 - 최소비용 구하기
- **난이도** : 골드 5
- **문제 유형** : Dijkstra
- **푼 언어** : Javascript

## 01. 문제 설명
N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 M개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. A번째 도시에서 B번째 도시까지 가는데 드는 최소비용을 출력하여라. 도시의 번호는 1부터 N까지이다.

### 입력
첫째 줄에 도시의 개수 N(1 ≤ N ≤ 1,000)이 주어지고 둘째 줄에는 버스의 개수 M(1 ≤ M ≤ 100,000)이 주어진다. 그리고 셋째 줄부터 M+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.

그리고 M+3째 줄에는 우리가 구하고자 하는 구간 출발점의 도시번호와 도착점의 도시번호가 주어진다. 출발점에서 도착점을 갈 수 있는 경우만 입력으로 주어진다.

### 출력
첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.

## 02. 문제 풀이 
이 문제는 지정된 출발점에서 최단 비용을 찾는 문제로, 모든 간선의 가중치가 양수이기 때문에 다익스트라(Dijkstra) 알고리즘을 사용하는 것이 적절하다. 다익스트라는 시작 노드에서 출발해 인접한 노드로 이동하면서, 각 노드까지의 최소 비용(거리) 을 점진적으로 갱신하는 방식으로 동작한다.

우선 각 도시를 정점으로, 버스를 간선으로 하는 가중치 그래프를 인접 리스트 형태로 구성한다. 이후 시작 도시를 기준으로 거리를 0으로 초기화하고, 다른 도시는 충분히 큰 값으로 설정한다.
큐(Queue)를 이용해 현재 방문한 도시에서 이동 가능한 모든 도시를 탐색하며, 현재 도시까지의 거리 + 이동 비용이 기존 거리보다 작다면 그 값을 새로 갱신하고 큐에 추가한다. 이 과정을 큐가 빌 때까지 반복하면, 모든 도시까지의 최소 이동 비용이 계산된다.

이 문제에서는 출발점에서 도착점까지의 최소 비용만 요구하므로, 다익스트라 알고리즘 수행 후 distance[end] 값을 출력하면 된다.


<코드>
```javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1916_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const N = Number(input[0])  // 도시의 개수
const M = Number(input[1])  // 버스의 개수

const graph = Array.from({ length: N + 1 }, () => []);

for (let i=2; i < 2+M; i++) {
  const [s, e, c] = input[i].split(' ').map(Number)
  graph[s].push([e, c])
}
const LIMIT = 100001
const distance = Array(N+1).fill(LIMIT)  // 도시 

const [start, end] = input[2+M].split(' ').map(Number)

const dijkstra = x => {

  distance[x] = 0
  
  const q = [[x, 0]]
  let front = 0

  while ( front < q.length ) {
    const [cur, curDist] = q[front++]

    if ( distance[cur] < curDist ) continue

    for (const [nxt, nxtDist] of graph[cur]) {
      const newDist = curDist + nxtDist 
      if ( newDist >= distance[nxt] ) continue

      distance[nxt] = newDist
      q.push([nxt, newDist])
    }
  }

} 

dijkstra(start)
console.log(distance[end])


```
## 회고
- 메소드를 잘 알면 쉽게 풀 수 있는 문제였다. 언어 공부를 열심히 하자