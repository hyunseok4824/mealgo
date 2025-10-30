const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1316_input.txt'
let [N, ...words] = fs.readFileSync(filePath).toString().trim().split('\n')

N = Number(N)
const wordSet = new Set()
let isGroupWord  // 그룹단어인지 확인하는 flag
let result = 0

for ( let i=0; i<N; i++ ) {
  const curWord = words[i]
  wordSet.add(curWord[0])
  isGroupWord = true

  for (let j=1; j<curWord.length; j++){
    if ( wordSet.has(curWord[j]) && curWord[j] !== curWord[j-1] ) {
      isGroupWord = false
      break
    }
    wordSet.add(curWord[j])
  }
  if (isGroupWord) result++
  wordSet.clear()
}

console.log(result)