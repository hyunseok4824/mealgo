const fs  = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1911_input.txt'
const [[N, L], ...puddles] = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

puddles.sort((a, b) => a[0] - b[0])

let result = 0
let plankStart = puddles[0][0]

for ( let i=0; i < N; i++ ) {
  const [s, e] = puddles[i]
  
  if ( plankStart < s ) plankStart = s
  
  if (plankStart >= e) continue

  const need = Math.ceil((e - plankStart) / L)
  result += need
  plankStart += need * L
}

console.log(result)
