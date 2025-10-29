const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '4179_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const [R, C] = input.shift().split(' ').map(Number)  // R: 행(세로), C: 열(가로)
const miro = input.map((line) => line.split(''))
let jihunQueue = [];
let fireQueue = [];

// 데이터 분류 => 진훈의 위치와 불의 위치를 식별하여 각각의 배열에 저장 
for ( let r = 0; r < R; r++ ) {
  for ( let c = 0; c < C; c++ ) {
    if ( miro[r][c] === 'J' ) {
      jihunQueue.push([r, c])
    }

    else if ( miro[r][c] === 'F' ) {
      fireQueue.push([r, c])
    }
  }
}

// 지훈 이동 (BFS)
const stepJihun = (q) => {
  const nxtQueue = []
  let front = 0
  while (front < q.length) {
    const [x, y] = q[front++]
    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue
      if (miro[nx][ny] !== '.') continue
      miro[nx][ny] = 'J'
      nxtQueue.push([nx, ny])
    }
  }
  return nxtQueue
}

// 불 확산 (BFS)
const fireSpread = (q) => {
  const nxtQueue = []
  let front = 0
  while (front < q.length) {
    const [x, y] = q[front++]
    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue
      if (miro[nx][ny] !== '.' && miro[nx][ny] !== 'J' ) continue
      miro[nx][ny] = 'F'
      nxtQueue.push([nx, ny])
    }
  }
  return nxtQueue
}

const check = () => {
  for ( let r = 0; r < R; r++ ) {
    if ( miro[r][0] === 'J' || miro[r][C-1] === 'J' ) return true
  }
  for ( let c = 0; c < C; c++ ) {
    if ( miro[0][c] === 'J' || miro[R-1][c] === 'J' ) return true
  }
  return false
}

let cnt = 0
let isFound = false

while ( jihunQueue.length ) {
  if (check()) {
    isFound = true
    console.log(cnt + 1)   // 이번 분에 탈출
    break
  }
  fireQueue = fireSpread(fireQueue)
  jihunQueue = stepJihun(jihunQueue)

  cnt ++
}
if (!isFound) console.log("IMPOSSIBLE")