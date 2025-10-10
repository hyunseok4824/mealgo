- **문제** : 백준 9935 - 문자열 폭발
- **난이도** : 골드 4
- **문제 유형** : 구현
- **푼 언어** : Javascript

## 01. 문제 설명
상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.

폭발은 다음과 같은 과정으로 진행된다.

문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.
새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.
폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.
상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.

폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.

### 입력
첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.

둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.

두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.

### 출력
첫째 줄에 모든 폭발이 끝난 후 남은 문자열을 출력한다.

## 02. 문제 풀이
문자열을 왼쪽에서 오른쪽으로 하나씩 확인하며 스택에 문자를 쌓는다. 만약 현재 문자가 폭발 문자열의 마지막 문자와 같고, 스택의 길이가 폭발 문자열의 길이 이상이라면 스택의 뒷부분이 폭발 문자열인지 확인한다. 이후 폭발 문자열이라면 스택에서 해당 문자열을 제거한다.

이 과정을 문자열 끝까지 반복하면, 모든 폭발이 끝난 상태의 문자열이 스택에 남는다. 남은 문자를 합쳐 출력하고, 아무 문자도 남지 않았다면 "FRULA"를 출력한다. 


  <코드>
```javascript
const fs = require('fs')
const filepath = process.platform === 'linux' ? '/dev/stdin' : '9935_input.txt'
const [str, bomb] = fs.readFileSync(filepath).toString().trim().split('\n')

const lastChr = bomb[bomb.length-1]

const stack = []
for ( let i=0; i < str.length; i++ ) {
  stack.push(str[i])
  if ( str[i] === lastChr && stack.length >= bomb.length ) {
    let isExploded = true
    let startPoint = stack.length - bomb.length 
    for ( let j=0; j < bomb.length; j++) {
      if (stack[startPoint+ j] !== bomb[j]) {
        isExploded = false
        break
      }
    }
    if (isExploded) {
      stack.length -= bomb.length
    }
  }
}

if (stack.length > 0) console.log(stack.join(''))
else console.log('FRULA')

```
## 03. 회고
처음에는 for문으로 탐색하고 폭발 문자열을 제거한 새로운 문자열을 만들어서 기존 문자열을 업데이트 하는 방식을 사용했다. 이를 폭발 문자열이 나오지 않을 때까지 반복해서 문제를 해결하려고 했으나 메모리 초과가 발생하였다. 

다른 사람들이 푸는걸 보니까 스택을 사용해서 해결했었다. 스택을 사용하니 for문 한번에 문제가 해결되었다. 이렇게 자료구조를 활용하면 문제 해결이 좀 더 간단해지고, 효율적이라는 것을 다시 한번 느끼게 되는 기회였다. 다음에는 내가 알고 있는 자료구조들을 좀 더 활용하는 방안으로 생각을 해봐야겠다.
<br>
<틀린 코드>

```javascript

while (str) {

  let newStr = ''
  let i = 0

  while (i < str.length) {
    let isExploded = true  
    for (let j=0; j < bomb.length; j++) {
      if ( str[i+j] !== bomb[j] ) {
        isExploded = false
        break
      }
    }
    if (isExploded) {
      i += bomb.length
    }
    else {
      newStr += str[i]
      i++
    }
  }
  if (newStr != str) {
    str = newStr
  }
  else break
}


if (str.length > 1) {
  console.log(str)
} else {
  console.log('FRULA')
}
```