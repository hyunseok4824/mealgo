const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '11399_input.txt'
const input = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')

const N = Number(input[0])
const P = input[1].split(' ').map(Number).sort((a, b) => a - b)

let ans = 0
for ( let i=0; i < N; i++ ) {
  ans += P[i] * (N-i)
}

console.log(ans)
