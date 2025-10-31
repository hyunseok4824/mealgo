const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '21610_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const DIRECTIONS = [[], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]]

const [N, M] = input[0].split(' ').map(Number) // [격자 크기, 이동 명령 수]
const array = []                               // 격자
let nextCloudCandidates = []                    // 물 2 이상인 바구니 위치들

for (let i=1; i<=N; i++) {
  const line = input[i].split(' ').map(Number)
  for (j=0; j<N; j++) {
    if (line[j] >= 2) {
      nextCloudCandidates.push([i-1, j])      
    }
  }
  array.push(line)
}
const commands = []
for (let i=N+1; i<=N+M; i++) {
  const command = input[i].split(' ').map(Number)
  commands.push(command)
}

let curCloudLoc = [[N-2, 0], [N-2, 1], [N-1, 0], [N-1, 1]]  // 구름의 위치

function moveCloud = (d, s) => {                               // [방향, 이동거리]

  // 구름 이동
  const [dx, dy] = DIRECTIONS[d]

  for ( let i=0; i<curCloudLoc.length; i++ ) {

    const [x, y] = curCloudLoc[i];
    const nx = ((x + dx * s) % N + N) % N; 
    const ny = ((y + dy * s) % N + N) % N;
    array[nx][ny] += 1;  // 비내리기
    curCloudLoc[i] = [nx, ny]
  } 
}

// 물복사
const waterDuplication = (newCloudCandidates, wasCloud) => {

  // 물복사
  for ( let i=0; i<curCloudLoc.length; i++ ) {
    const [x, y] = curCloudLoc[i];
    for (let i=2; i<=8; i+=2) {
      const [dx, dy] = DIRECTIONS[i]
      const [nx, ny] = [x + dx, y + dy]
      if ( 0 > nx || nx >= N || 0 > ny || ny >= N) continue  // 범위 벗어날 시
      if ( array[nx][ny] === 0 ) continue                    // 물이 들어있는지 여부 파악
      array[x][y] += 1
    }
    if (array[x][y] >= 2) newCloudCandidates.push([x, y])
    wasCloud[x][y] = true
  }
} 

const makeCloud = (nextCloudCadidates, newCloudCadidates, newCludeLoc, wasCloud) => {

  // 구름 생성
  for (let i=0; i < nextCloudCadidates.length; i++) {
    const [x, y] = nextCloudCadidates[i]

    if ( wasCloud[x][y] === false ) {
      newCludeLoc.push([x, y])
      array[x][y] -= 2
      if ( array[x][y] >= 2 )
        newCloudCadidates.push([x, y])
    }
  }  
}


for ( const [diretion, distance] of commands ) {
  const newCludeLoc = []                                                         // 새로운 구름 위치
  const wasCloud = Array.from({ length: N }, () => Array(N).fill(false));        // 이전 구름 위치 체크
  const newCloudCandidates = []                                                   // 새로운 물 2 이상인 바구니 위치들

  moveCloud(diretion, distance)
  waterDuplication(newCloudCandidates, wasCloud)
  makeCloud(nextCloudCandidates, newCloudCandidates, newCludeLoc, wasCloud)

  curCloudLoc = newCludeLoc
  nextCloudCandidates = newCloudCandidates
}

// 개수 세기
let cnt = 0
for (let i=0; i<N; i++) {
  for (let j=0; j<N; j++) {
    cnt += array[i][j]
  }
}

console.log(cnt)
