const fs = require('fs')
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9375_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const T = Number(input[0])
let tc = 1
let idx = 1
const result = []

while (tc <= T) {
  const N = Number(input[idx++]) 
  const clothesTypes = new Map()
  for (let i = idx; i < (N + idx); i++) {
    const [name, type] = input[i].split(' ')
    clothesTypes.set(type, (clothesTypes.get(type) || 0 ) + 1)
  }
  
  let ans = 1

  for (const type_cnt of clothesTypes.values()) {

    ans *= (type_cnt+ 1)
  }

  ans -= 1
  result.push(ans)
  idx += N
  tc ++
}

console.log(result.join('\n'))