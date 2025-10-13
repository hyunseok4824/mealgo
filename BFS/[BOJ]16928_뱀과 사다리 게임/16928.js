const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '16928_input.txt'
const input = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ')) 

const [N, M] = input[0].map(Number)
const boardMap = {}

for (let i=1; i <= N+M; i++) {
  const [s, e] = input[i]
  boardMap[s] = Number(e)
}

const visited = Array(101).fill(100)
visited[1] = 0

const q = [1]
let front = 0

while (q.length > front) {
  const cur = q[front++]
  
  if (cur === 100) {
    console.log(visited[cur])
    break
  }

  for (let i = 1; i <= 6; i++) {
    let nxt = cur + i 
    if ( nxt <= 100 && visited[nxt] === 100 ) {
      visited[nxt] = visited[cur] + 1
      if (boardMap[nxt]) {
        const key = boardMap[nxt]
        if ( visited[key] === 100 )
          visited[boardMap[nxt]] = visited[nxt]
          q.push(key)
      } 
      else q.push(nxt)
    } 
  }

}

