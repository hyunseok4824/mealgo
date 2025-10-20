- **문제** : 백준 13913번 - 숨바꼭질 4
- **난이도** : 골드 4
- **문제 유형** : BFS
- **푼 언어** : Javascript

## 01. 문제 설명
수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

### 입력
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

### 출력
첫째 줄에 수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

둘째 줄에 어떻게 이동해야 하는지 공백으로 구분해 출력한다.

## 02. 문제 풀이
해당 문제는 N에서 K까지 도달하는데 걸리는 가장 빠른 시간과 그 경로를 구하는 문제다.
BFS를 사용해서 탐색하며 최단 시간을 구하였다. 현재 위치에서 이동할 수 있는 방법은 `[cur+1, cur *2, cur-1]`다. 이동이 가능하다면 K를 찾을 때 까지, 시간을 기록하며(`distance[nxt] = distance[cur] + 1`) 갈 수 있는 경로를 queue에 담는다. 
이 때 현재 경로에서 다음 경로로 간다는 것을 표시해 놔야 한다. 예를 들어 3에서 4로 이동한다면, `parent[4] = 3` 이런 식으로 표기한다. 이후 K를 찾으면 K를 시작으로 parent를 N이 나올 때까지 역으로 탐색하여 경로를 탐색한다. 그리고 K까지 오는데 걸린 시간 `distance[K]`와 경로를 출력하면 문제가 해결된다.

- 최적화 방안
1. 불필요한 메모리를 줄이기 위해, 문제 해결에 사용되는 배열의 크기를 K + 2로 설정했다. 
2. 입력을 받고 N이 K와 같거나, N이 K보다 크다면 굳이 BFS 탐색을 하지 않고 값을 바로 계산할 수 있다. 이 부분을 처리하여 불필요한 계산을 줄였다.
3. path를 처음에 queue에 담아서 탐색하였다. 그러나 queue에 담은게 많아질 수록 공간 복잡도와 시간 복잡도 측면에서 비효율적었다. 그래서 따로 parent를 만들어 경로를 기록하였다.

  <코드>
  ```javascript
  const fs = require('fs')
  const filePath = process.platform === 'linux' ? 'dev/stdin' : '13913_input.txt'
  const [N, K] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number)

  if ( N === K ) return console.log(0 + "\n" + K) 
    
  if ( N > K ) {
    const path = []
    for ( let i = N; i >= K; i-- ) {
      path.push(i)
    }
    return console.log(N - K + '\n' + path.join(' '))
  }

  const LIMIT = K + 2

  const distance = Array(LIMIT).fill(-1)
  const parent = Array(LIMIT).fill(-1); // 이전 위치(경로 복원용)
  distance[N] = 0

  const q = [N]
  let front = 0

  while ( q.length > front ) {
    const cur = q[front++]

    if ( cur === K ) {
      const path = [K]
      for ( let i = parent[K]; i !== -1; i = parent[i] ) path.push(i)
      
      path.reverse()
      console.log(distance[K] + '\n' + path.join(' '))
      break
    }
    
    const candidates = cur > K ? [cur - 1] : [cur - 1, cur + 1, cur * 2];
    
    for ( const nxt of candidates ) {
      if ( 0 <= nxt  && nxt <= LIMIT && distance[nxt] === -1 )  {
        distance[nxt] = distance[cur] + 1
        parent[nxt] = cur
        q.push( nxt )
      }
    }
  }
  ```

