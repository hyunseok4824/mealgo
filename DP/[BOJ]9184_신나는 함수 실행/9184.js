const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '9184_input.txt'
const input = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')


const limit = 21
const dp = Array.from({ length: limit }, () =>
  Array.from({ length: limit }, () =>
    Array(limit).fill(0)
  )
)

const solve = (x, y, z) => {
  
  if ( x <= 0 || y <= 0 || z <= 0 ) return 1
  if ( x > 20 || y > 20 || z > 20 ) return solve(20, 20, 20)
  
  if ( dp[x][y][z] ) return dp[x][y][z]

  if ( x < y && y < z ) {
    dp[x][y][z] = solve(x, y, z-1) + solve(x, y-1, z-1) - solve(x, y-1, z)
    return dp[x][y][z]
  } else {
    dp[x][y][z] = solve(x-1, y, z) + solve(x-1, y-1, z) + solve(x-1, y, z-1) - solve(x-1, y-1, z-1)
    return dp[x][y][z]
  }
}

let output = ""  
for (let i=0; i<input.length-1; i++) {
  const [a, b, c] = input[i].split(' ').map(Number)
  output = output.concat(`w(${a}, ${b}, ${c}) = ${solve(a, b, c)}\n`) 
}

console.log(output)