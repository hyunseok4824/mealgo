const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1012_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

let idx = 0
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const T = Number(input[idx++])
let result = ''


for ( let tc = 0; tc < T; tc++ ) {
  const [row, col, cabbageNum] = input[idx++].split(' ').map(Number)
  const farm = Array.from({length: row}, () => Array(col).fill(0))
  const visited = Array.from({length: row}, () => Array(col).fill(false))

  for (let i = idx; i < cabbageNum + idx; i++) {
    const [x, y] = input[i].split(' ').map(Number)
    farm[x][y] = 1
  }

  const bfs = (sx, sy) => {
    const q = [[sx, sy]]
    let front = 0
    visited[sx][sy] = true

    while (front < q.length) {
      const [x, y] = q[front++]

      for ( const [dx, dy] of directions ) {
        const nx = x + dx
        const ny = y + dy
        if ( 0 <= nx && nx < row && 0 <= ny && ny < col ) {
          if ( farm[nx][ny] === 1 && !visited[nx][ny] ) {
            visited[nx][ny] = true
            q.push([nx, ny])
          }
        }
      }
    }
  }

  let cnt = 0 

  for ( let r = 0; r < row; r++ ) {
    for ( let c = 0; c < col; c++ ) {
      if ( farm[r][c] === 1 && !visited[r][c] ) {
        bfs(r, c)
        cnt++
      }
    }
  }
  result += `${cnt}\n`

  idx += cabbageNum
}
console.log(result)