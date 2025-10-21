const fs  = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '2179_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const N = Number(input[0])
const lineInfo = input.slice(1)
  .map((line) => line.split(' ').map(Number))
  .sort((a, b) => a[0] - b[0])

let start = lineInfo[0][0]
let end = lineInfo[0][1]
let ans = 0

for ( let i=1; i < N; i++ ) {
  const [s, e] = lineInfo[i]
  if ( s > end ) {
    ans += end - start
    start = s
    end = e    
    continue
  } 

  end = Math.max(e, end)
}

ans += end - start
console.log(ans)

