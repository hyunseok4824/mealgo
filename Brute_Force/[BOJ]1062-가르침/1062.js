const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1062_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const [N, K] = input[0].split(' ').map(Number)

// K가 5 미만이면 어떤 단어도 못 읽음
if (K < 5) {
  console.log(0)
  process.exit(0)
}


const charSet = new Set()
const commonWordSet = new Set(['a', 'c', 'i', 'n', 't'])

// 단어를 비트로 변환
const word2Bit = (word) => {
  let bit = 0
  
  for (let char of word) {
    if (!commonWordSet.has(char)) {
      charSet.add(char)   // 중복 단어 제거
      bit |= (1 << (char.charCodeAt(0) - 65))
    }
  }
  return bit
}

const word2BitList = []

for ( let i=1; i<=N; i++ ) {
  const curWord = input[i].slice(4, input[i].length - 4)
  word2BitList.push(word2Bit(curWord))
}

const charList = Array.from(charSet)
const charToBitList = charList.map(ch => 1 << (ch.charCodeAt(0) - 65))
const limit = Math.min(K - 5, charList.length)
let ans = 0

const combine = (depth, lev, mask) => {
  if ( depth === limit ) {
    let cnt = 0
    for (const wordBit of word2BitList) {
      if ((wordBit & ~mask) === 0) cnt++
    }
    
    if (cnt > ans) ans = cnt
    return
  }
  for(let i = lev; i < charToBitList.length; i++) {
    combine(depth + 1, i + 1, mask | charToBitList[i])
  }

}
  
combine(0, 0, 0)
console.log(ans)

