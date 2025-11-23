const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1865_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

let idx = 0
let TC = Number(input[idx++])
let answer = ''

const bellmanFord = (N, edgeList) => {

  const dist = Array(N + 1).fill(0)

  for (let i = 1; i <= N; i++) {
    let updated = false
    for (const [s, e, cost] of edgeList) {
      if (dist[e] > dist[s] + cost) {
        dist[e] = dist[s] + cost
        updated = true

        if (i === N-1) {
          return 'YES'
        }
      }
    }

    if (!updated) break
  }

  return 'NO'
}

while (TC--) {
  let [N, M, W] = input[idx++].split(' ').map(Number)
  const edges = []

  while (M--) {
    const [start, end, cost] = input[idx++].split(' ').map(Number)
    edges.push([start, end, cost])
    edges.push([end, start, cost])
  }

  while (W--) {
    const [start, end, cost] = input[idx++].split(' ').map(Number)
    edges.push([start, end, -cost])
  }

  answer += bellmanFord(N, edges) + '\n'
}

console.log(answer.trim())