const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1806_input.txt'
const [[N, S], numList] = fs.readFileSync(filePath).toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

let left = 0
let right = 0
let sum = 0
let minLen = 100001

while (right<=N) {
  if ( sum >= S ) {
    minLen = Math.min(minLen, right - left)
    sum -= numList[left++]
  } else {
    sum += numList[right++] || 0
  }
}

console.log(minLen === 100001 ? 0 : minLen)