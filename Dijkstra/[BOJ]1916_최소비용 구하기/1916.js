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
