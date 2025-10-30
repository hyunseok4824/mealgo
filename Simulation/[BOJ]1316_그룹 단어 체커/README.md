- **문제** : 백준 1316번: 그룹 단어 체커
- **난이도** : 실버 5
- **문제 유형** : 구현
- **푼 언어** : Javascript

## 01. 문제 설명
그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.

### 입력
첫째 줄에 단어의 개수 N이 들어온다. N은 100보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 단어가 들어온다. 단어는 알파벳 소문자로만 되어있고 중복되지 않으며, 길이는 최대 100이다.

### 출력
첫째 줄에 그룹 단어의 개수를 출력한다.

## 02. 문제 풀이 
단어의 첫글자를 Set에 저장하였다. Set은 중복 제거와 요소 탐색이 빠르기 때문에 Set을 사용하였다.

이후 단어를 for문으로 한 글자씩 탐색하였다. 
만약 Set에 이미 있으면서, 바로 전 글자와 다른 글자일 경우 연속되지 않은 글자라 판명했다. 그래서 바로 해당 단어의 탐색을 종료하고 `isGroupWord`를 false로 바꾸어주었다.
해당 조건에 걸리지 않으면 그 단어는 연속된 단어 또는 새로 나온 단어임으로 Set에 담아주었다.

해당 단어의 탐색이 종료된 후 isGroupWord가 true일 경우에만 result를 1씩 증가하였다. 

모든 단어들의 탐색이 끝나고 result를 출력해준다.

<코드>
```javascript
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
```
