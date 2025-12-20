- **문제** : 백준 1806번 - 누적합   
- **난이도** : 실버 2
- **문제 유형** : 이분 탐색
- **푼 언어** : Javascript

## 01. 문제 설명
집에서 시간을 보내던 오영식은 박성원의 부름을 받고 급히 달려왔다. 박성원이 캠프 때 쓸 N개의 랜선을 만들어야 하는데 너무 바빠서 영식이에게 도움을 청했다.

이미 오영식은 자체적으로 K개의 랜선을 가지고 있다. 그러나 K개의 랜선은 길이가 제각각이다. 박성원은 랜선을 모두 N개의 같은 길이의 랜선으로 만들고 싶었기 때문에 K개의 랜선을 잘라서 만들어야 한다. 예를 들어 300cm 짜리 랜선에서 140cm 짜리 랜선을 두 개 잘라내면 20cm는 버려야 한다. (이미 자른 랜선은 붙일 수 없다.)

편의를 위해 랜선을 자르거나 만들 때 손실되는 길이는 없다고 가정하며, 기존의 K개의 랜선으로 N개의 랜선을 만들 수 없는 경우는 없다고 가정하자. 그리고 자를 때는 항상 센티미터 단위로 정수길이만큼 자른다고 가정하자. N개보다 많이 만드는 것도 N개를 만드는 것에 포함된다. 이때 만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성하시오.


### 입력 
첫째 줄에는 오영식이 이미 가지고 있는 랜선의 개수 K, 그리고 필요한 랜선의 개수 N이 입력된다. K는 1이상 10,000이하의 정수이고, N은 1이상 1,000,000이하의 정수이다. 그리고 항상 K ≦ N 이다. 그 후 K줄에 걸쳐 이미 가지고 있는 각 랜선의 길이가 센티미터 단위의 정수로 입력된다. 랜선의 길이는 $231^{-1}$보다 작거나 같은 자연수이다.

### 출력 
첫째 줄에 N개를 만들 수 있는 랜선의 최대 길이를 센티미터 단위의 정수로 출력한다.


## 02. 문제 풀이
이분 탐색을 사용하여 문제를 해결한다. 

1. 1을 `start`, 랜선의 길이 중 가장 긴 값을 `end`로 설정한다. 
이분 탐색 특성 상 `start - end` 범위 내에서만 탐색을 진행할 수 있다. 그렇기에 정확한 값을 얻기 위해선 할 수 있는 가장 넓은 범위로 `start`와 `end`를 설정하는 것이 좋다. `start`는 문제에서 주어진 랜선의 가장 작은 길이 1을, `end`는 가장 긴 랜선의 길이로 설정했다.

2. 범위를 좁혀가며 최대 랜선의 길이를 탐색한다. 
매 반복마다 현재의 `start`와 `end` 값을 기준으로 `mid`를 갱신한다.
이후 각 랜선의 길이(`lanLengths`)를 `mid`로 나누어, 몇개의 랜선을 만들 수 있는지(`possibleCount`)를 계산한다. 

현재 문제에서 요구하는 것은 필요한 랜선 수(`requiredCount`) 이상을 만들 수 있는, 랜선의 최대 길이다. 그렇기 때문에 만들 수 있는 랜선의 개수가 필요한 랜선보타 많거나 같다면, `start`를 `mid + 1`로 갱신한다. 그러지 않다면 `end`를 `mid - 1`로 갱신한다. 
위 과정을 `start`가 end보다 커질 때까지 반복한다. 이후 `end`를 출력하면 된다.


<코드>
```javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : 'BOJ1654_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const [_, requiredCount] = input[0].split(' ').map(Number)
const lanLengths = input.slice(1).map(Number)

let start = 1 
let end = Math.max(...lanLengths)

let mid, possibleCount

while ( start <= end ) {
  mid = Math.floor((start + end) / 2 ) 
  possibleCount = 0

  for ( const length of lanLengths ) {
    possibleCount += Math.floor(length / mid)
  }
  if ( possibleCount >= requiredCount ) {
    start = mid + 1
  }
  else {
    end = mid - 1
  }
}

console.log(end)
```
## 03. 회고
처음에는 `possibleCount`(만들 수 있는 랜선 수)와 `requiredCount`(필요한 랜선 수)가 같으면 최대값이 나올거라 예상했다. 그런데 여러 사람들의 코드를 보니 다 같더라도 탐색을 계속 진행하는 것이었다. 그래서 곰곰히 생각해보니 `possibleCount`과 `requiredCount`가 같아도 더 긴 길이의 값들이 나올 수 있다는 것을 생각 못했던 것 같다. 오늘도 시야가 조금 넓어지는 느낌을 경험했다.