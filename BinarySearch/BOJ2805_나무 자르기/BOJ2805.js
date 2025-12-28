const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : 'BOJ2805_input_2.txt'
const [[treesNum, requiredHeight], treesHeight] = fs.readFileSync(filePath).toString()
  .trim()
  .split('\n')
  .map(
    (line) => line.split(' ').map(
      (num) => parseInt(num)
    )
  )
  let start = 1
  let end = Math.max(...treesHeight)
  let ans = 0
  let mid, heightCnt
  
while ( start <= end ) {
  mid = Math.floor((start + end) / 2)
  heightCnt = 0

  for ( let height of treesHeight ) {
    if ( height > mid) {
      heightCnt += ( height - mid )  
    }   
  }

  if ( heightCnt >= requiredHeight ) { 
    start = mid + 1 
  }
  else end = mid - 1
}

console.log(end)
