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