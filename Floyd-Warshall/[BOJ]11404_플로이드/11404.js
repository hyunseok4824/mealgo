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
