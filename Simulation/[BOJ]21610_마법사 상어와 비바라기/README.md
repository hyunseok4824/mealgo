- **문제** : 백준 21610번 : 마법사 상어와 비바라기
- **난이도** : 골드 5
- **문제 유형** : 구현
- **푼 언어** : Javascript

## 01. 문제 설명
마법사 상어는 파이어볼, 토네이도, 파이어스톰, 물복사버그 마법을 할 수 있다. 오늘 새로 배운 마법은 비바라기이다. 비바라기를 시전하면 하늘에 비구름을 만들 수 있다. 오늘은 비바라기를 크기가 N×N인 격자에서 연습하려고 한다. 격자의 각 칸에는 바구니가 하나 있고, 바구니는 칸 전체를 차지한다. 바구니에 저장할 수 있는 물의 양에는 제한이 없다. (r, c)는 격자의 r행 c열에 있는 바구니를 의미하고, A[r][c]는 (r, c)에 있는 바구니에 저장되어 있는 물의 양을 의미한다.

격자의 가장 왼쪽 윗 칸은 (1, 1)이고, 가장 오른쪽 아랫 칸은 (N, N)이다. 마법사 상어는 연습을 위해 1번 행과 N번 행을 연결했고, 1번 열과 N번 열도 연결했다. 즉, N번 행의 아래에는 1번 행이, 1번 행의 위에는 N번 행이 있고, 1번 열의 왼쪽에는 N번 열이, N번 열의 오른쪽에는 1번 열이 있다.

비바라기를 시전하면 (N, 1), (N, 2), (N-1, 1), (N-1, 2)에 비구름이 생긴다. 구름은 칸 전체를 차지한다. 이제 구름에 이동을 M번 명령하려고 한다. i번째 이동 명령은 방향 di과 거리 si로 이루어져 있다. 방향은 총 8개의 방향이 있으며, 8개의 정수로 표현한다. 1부터 순서대로 ←, ↖, ↑, ↗, →, ↘, ↓, ↙ 이다. 이동을 명령하면 다음이 순서대로 진행된다.

1. 모든 구름이 di 방향으로 si칸 이동한다.
2. 각 구름에서 비가 내려 구름이 있는 칸의 바구니에 저장된 물의 양이 1 증가한다.
3. 구름이 모두 사라진다.
4. 2에서 물이 증가한 칸 (r, c)에 물복사버그 마법을 시전한다. 물복사버그 마법을 사용하면, 대각선 방향으로 거리가 1인 칸에 물이 있는 바구니의 수만큼 (r, c)에 있는 바구니의 물이 양이 증가한다.
- 이때는 이동과 다르게 경계를 넘어가는 칸은 대각선 방향으로 거리가 1인 칸이 아니다.
- 예를 들어, (N, 2)에서 인접한 대각선 칸은 (N-1, 1), (N-1, 3)이고, (N, N)에서 인접한 대각선 칸은 (N-1, N-1)뿐이다.
5. 바구니에 저장된 물의 양이 2 이상인 모든 칸에 구름이 생기고, 물의 양이 2 줄어든다. 이때 구름이 생기는 칸은 3에서 구름이 사라진 칸이 아니어야 한다.

M번의 이동이 모두 끝난 후 바구니에 들어있는 물의 양의 합을 구해보자.

### 입력
첫째 줄에 N, M이 주어진다.

둘째 줄부터 N개의 줄에는 N개의 정수가 주어진다. r번째 행의 c번째 정수는 A[r][c]를 의미한다.

다음 M개의 줄에는 이동의 정보 di, si가 순서대로 한 줄에 하나씩 주어진다.

### 출력
첫째 줄에 M번의 이동이 모두 끝난 후 바구니에 들어있는 물의 양의 합을 출력한다.

### 제한
- 2 ≤ N ≤ 50
- 1 ≤ M ≤ 100
- 0 ≤ A[r][c] ≤ 100
- 1 ≤ di ≤ 8
- 1 ≤ si ≤ 50

## 02. 문제 풀이

1. movCloude
구름을 이동시키는 함수. 구름을 d방향으로 s만큼 이동시킨 후, 이동한 위치에 +1을 해준다.
이후 curCloudLoc에 저장되어 있는 구름의 기존 위치를 이동한 구름위치로 업데이트 한다.

2. waterDuplication
물복사 버그를 실행하는 함수. 구름이 있는 칸의 바구니들을 탐색한다. 현재 칸 `array[x][y]`의 대각선에 물이 있는 바구니가 존재하면,  그 수만큼 `array[x][y]`에 + 1을 해준다. 그리고 현재 구름의 위치를 나타내는 `wasClude`에 체크해준다.
만약 `array[x][y]`에 담긴 물의 양이 2가 넘는다면 다다음 턴에 구름이 되므로 `newCloudCandidate`에 담아준다.

3. makeCloud
구름을 생성하는 함수. `nextCloudCadidates`에는 전체 array에서 물의 양이 2 이상인 바구니들의 위치가 담겨있다. 현재 구름이 있던 위치에서는 구름이 생성되지 않기 때문에 `wasClude`가 false인 위치에만  -2를 해준다. 만약 그래도 물의 양이 2보다 많다면 `newCloudCandidate`에 담아준다.

해당 함수들을 순서대로 commands의 수만큼 반복해 준다. 그리고 마지막마다 `curCloudLoc`(현재 구름의 위치)을 `newCludeLoc`(새로운 구름의 위치)로, `nextCloudCandidates`(다음 구름 후보군)를 `newCloudCandidates`(새로운 구름 후보군)으로 업데이트 시켜주어 다음 함수의 매개변수로 사용한다.

모든 반복이 끝나면 전체 array의 바구니들을 탐색하며 물의 양을 더한 후 출력한다.

  <코드>
```javascript
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

```
## 회고
1. 변수명을 짓는데 꽤 까다로웠다. 뭐라 지어야할지 아이디어가 떠오르지 않았다. 그러다 보니 비슷한 변수명들을 많이 사용한 것 같다. 변수명이 비슷해보여서 잘못 기입하는 실수도 많이 범했다. 그래서 꽤 오래 걸렸던 것 같다. 다음에는 GPT를 적극 사용해서 구분이 쉬운 변수명을 생각해봐야겠다.

