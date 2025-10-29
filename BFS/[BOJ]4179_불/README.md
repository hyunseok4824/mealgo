- **문제** : 백준 4179 - 불!
- **난이도** : 골드 3
- **문제 유형** : BFS
- **푼 언어** : Javascript

## 01. 문제 설명
지훈이는 미로에서 일을 한다. 지훈이를 미로에서 탈출하도록 도와주자!

미로에서의 지훈이의 위치와 불이 붙은 위치를 감안해서 지훈이가 불에 타기전에 탈출할 수 있는지의 여부, 그리고 얼마나 빨리 탈출할 수 있는지를 결정해야한다.

지훈이와 불은 매 분마다 한칸씩 수평또는 수직으로(비스듬하게 이동하지 않는다) 이동한다.

불은 각 지점에서 네 방향으로 확산된다.

지훈이는 미로의 가장자리에 접한 공간에서 탈출할 수 있다.

지훈이와 불은 벽이 있는 공간은 통과하지 못한다.


### 입력
입력의 첫째 줄에는 공백으로 구분된 두 정수 R과 C가 주어진다. 단, 1 ≤ R, C ≤ 1000 이다. R은 미로 행의 개수, C는 열의 개수이다.

다음 입력으로 R줄동안 각각의 미로 행이 주어진다.

각각의 문자들은 다음을 뜻한다.

- #: 벽
- .: 지나갈 수 있는 공간
- J: 지훈이의 미로에서의 초기위치 (지나갈 수 있는 공간)
- F: 불이 난 공간

J는 입력에서 하나만 주어진다.
### 출력
지훈이가 불이 도달하기 전에 미로를 탈출 할 수 없는 경우 IMPOSSIBLE 을 출력한다.

지훈이가 미로를 탈출할 수 있는 경우에는 가장 빠른 탈출시간을 출력한다.
## 02. 문제 풀이
불이 확산하는 것과 지훈이가 이동하는 과정을 번갈아 가며 BFS로 시뮬레이션했다.
이때 BFS는 분 단위로 이동을 표현해야 정확한 결과를 얻을 수 있기 때문에, 현재 위치에서 이동 가능한 칸은 같은 시간대가 아닌 다음 시간대의 큐(nxtQueue)에 담았다.

또한 매 반복마다 check 함수를 두어 지훈이가 이미 가장자리에 도달했는지를 검사했다. 이 과정을 통해 불이 번지는 것과 지훈의 이동을 동시에 고려하면서, 각 턴(분)마다 탈출 가능 여부를 즉시 판단할 수 있게 했다.

만약 모든 반복이 끝날 때까지 check에서 탈출 조건을 만족하지 못했다면, 이는 지훈이가 끝내 미로 밖으로 나가지 못한 것이므로 "IMPOSSIBLE"을 출력하도록 했다.

<코드>
``` javascript

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
```