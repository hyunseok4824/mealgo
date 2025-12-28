const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : 'BOJ1106_input_4.txt'
let [[targetNum, citiesNum], ...citesInfo] = fs.readFileSync(filePath)
  .toString()
  .split('\n')
  .map((line) => 
    line.split(' ').map(
      (num) => parseInt(num)
    )
  )

citesInfo.sort((a, b) => b[1] - a[1])
let tableLimit = targetNum + citesInfo[0][1]
const maxCost = (tableLimit * 100) + 1 


const dpTable = Array(tableLimit+1).fill(maxCost)
dpTable[0] = 0

let cost, effect 

for ( let i=0; i<citiesNum; i++ ) {
  cost = citesInfo[i][0]
  effect = citesInfo[i][1]
  for ( let j=effect; j < tableLimit+1; j++) {
    dpTable[j] = Math.min(dpTable[j-effect]+cost, dpTable[j])
  }
}

let ans = maxCost
for ( let i = targetNum; i <= tableLimit; i++ ) {
  ans = Math.min(ans, dpTable[i])
}


console.log(ans)