- **문제** : 백준 11404 - 플로이드
- **난이도** : 골드 4
- **문제 유형** : 풀루이드 워셜
- **푼 언어** : Javascript

## 01. 문제 설명
n(2 ≤ n ≤ 100)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1 ≤ m ≤ 100,000)개의 버스가 있다. 각 버스는 한 번 사용할 때 필요한 비용이 있다.

모든 도시의 쌍 (A, B)에 대해서 도시 A에서 B로 가는데 필요한 비용의 최솟값을 구하는 프로그램을 작성하시오.


### 입력
첫째 줄에 도시의 개수 n이 주어지고 둘째 줄에는 버스의 개수 m이 주어진다. 그리고 셋째 줄부터 m+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 버스의 정보는 버스의 시작 도시 a, 도착 도시 b, 한 번 타는데 필요한 비용 c로 이루어져 있다. 시작 도시와 도착 도시가 같은 경우는 없다. 비용은 100,000보다 작거나 같은 자연수이다.

시작 도시와 도착 도시를 연결하는 노선은 하나가 아닐 수 있다.

### 출력
n개의 줄을 출력해야 한다. i번째 줄에 출력하는 j번째 숫자는 도시 i에서 j로 가는데 필요한 최소 비용이다. 만약, i에서 j로 갈 수 없는 경우에는 그 자리에 0을 출력한다.

## 02. 문제 풀이
플루이드-워셜 알고리즘을 응용해서 문제를 해결하였다. 시작 도시와 도착 도시를 연결하는 노선은 하나가 아닐 수도 있기에 가장 작은 값으로 업데이트 되도록 하였다. 또 알고리즘이 종료되고 결과를 출력할 때, 연결되지 않은 곳(`distance[i][j] === INF`)은 0으로 처리해야하기에 map 메소드를 사용하여 0으로 바꿔주었다.  

<코드>
``` javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '11404_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const INF = 12e9

const N = Number(input[0])  // 도시의 개수
const M = Number(input[1])  // 버스의 개수

const distance = Array.from({length : N}, () => Array(N).fill(INF))

for ( let i=0; i < N; i++ ) distance[i][i] = 0

for ( let i=2; i < M+2; i++ ) {
  const [start, end, cost] = input[i].split(' ').map(Number)  // [ 출발 지역, 도착 지역, 비용 ]
  if ( distance[start-1][end-1] > cost ) distance[start-1][end-1] = cost
}

for ( let k=0; k < N; k++ ) {
  for ( let i=0; i < N; i++ ) {
    for ( let j=0; j < N; j++ ) {
      distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j])
    }
  }
}

const result = distance.map((line) => line
  .map((v) => v >= INF ? 0 : v)
  .join(' ')).join('\n')

console.log(result)

```
## 회고
INF의 값을 잘못 설정해서 계속 틀렸다. 다음에는 좀 더 넉넉한 값을 넣자