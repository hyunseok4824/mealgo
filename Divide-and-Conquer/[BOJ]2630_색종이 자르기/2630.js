const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' :  '2630_input.txt'
let [N, ...paper ] = fs.readFileSync(filePath).toString().trim().split('\n')

N = Number(N)
paper = paper.map((line) => line.split(' ').map(Number))
let white = 0
let blue = 0

const solve = (startX, startY, limit) => {
  const color = paper[startX][startY]
  for (let r = startX; r < startX + limit; r++) {
    for (let c = startY; c < startY + limit; c++) {
      if ( color !== paper[r][c] ) {
        const halfLimit = Math.floor(limit / 2)
        solve(startX, startY, halfLimit)
        solve(startX + halfLimit, startY, halfLimit)
        solve(startX, startY + halfLimit, halfLimit)
        solve(startX + halfLimit, startY + halfLimit, halfLimit )
        return
      }
    }
  }
  if ( color === 0 ) white ++
  else blue ++
}

solve(0, 0, N)
console.log(`${white}\n${blue}`)