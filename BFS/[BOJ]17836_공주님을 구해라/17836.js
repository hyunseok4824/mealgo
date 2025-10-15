const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '17836_input.txt'
const [[N, M, T], ...castleMap] = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

// visited[r][c][g] : g=0(그람X), g=1(그람O) 일 때 (r,c)까지 걸린 시간
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array(2).fill(-1))
)
visited[0][0][0] = 0

const q = [[0, 0, 0]]  // [r, c, 그람 유무]
let front = 0
let isEnd = false
let ans = 0

while (q.length > front) {
  const [r, c, hasGram] = q[front++]
  const t = visited[r][c][hasGram]

  for ( const [dr, dc] of directions ) {
    const nr = dr + r
    const nc = dc + c

    if ( 0 > nr || nr >= N || 0 > nc || nc >= M || visited[nr][nc][hasGram] !== -1 ) continue

    if ( castleMap[nr][nc] === 1 && hasGram === 0 ) continue   // 벽이지만, 그람을 먹으면 탐색 가능
    
    let ng = hasGram
    if (castleMap[nr][nc] === 2) ng = 1

    visited[nr][nc][ng] = t + 1
    
    // 종료조건
    if (nr === N-1 && nc === M-1) {
      ans = visited[nr][nc][ng]
      isEnd = true
      break
    }
    if (visited[nr][nc][ng] < T)q.push([nr, nc, ng])
  }
  if (isEnd) break
}

console.log(ans !== 0 ? ans : 'Fail')