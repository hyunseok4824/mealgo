- **문제** : 백준 1806번 - 누적합   
- **난이도** : 골드 4
- **문제 유형** : 누적합
- **푼 언어** : Python

## 01. 문제 설명

10,000 이하의 자연수로 이루어진 길이 N짜리 수열이 주어진다. 이 수열에서 연속된 수들의 부분합 중에 그 합이 S 이상이 되는 것 중, 가장 짧은 것의 길이를 구하는 프로그램을 작성하시오.

### 입력 
첫째 줄에 N (10 ≤ N < 100,000)과 S (0 < S ≤ 100,000,000)가 주어진다. 둘째 줄에는 수열이 주어진다. 수열의 각 원소는 공백으로 구분되어져 있으며, 10,000이하의 자연수이

### 출력 

첫째 줄에 구하고자 하는 최소의 길이를 출력한다. 만일 그러한 합을 만드는 것이 불가능하다면 0을 출력하면 된다.


## 02. 문제 풀이
left와 right. 두 개의 포인트를 생성한다.
right가 끝(`N`)에 도달할 때 까지 반복을 진행한다. 
1. 만약 `S`보다 현재까지 구한 누적합(`sum`) 이상이라면, 그 즉시 부분 수열의 가장 짧은 길이를 구한 값 `minLen`과 비교하여 가장 작은 값으로 업데이트 한다. 그리고 `left`를 조금씩 오른쪽으로 이동시켜 부분집합의 크기를 줄인다. 
2. 만약 `sum`이 `S`보다 작다면, right를 1씩 증가시켜 부분집합의 크기를 늘린다. 

그렇게 나욘 결과가 100001(문제에서 나올 수 있는 최댓값)이라면 합을 만드는게 불가능한 거니까 0을, 아니면 minLen을 출력한다.



<코드>
```javascript
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

```

## 03. 회고
*!!주의!!* 오버플로우 늘 주의하기 !!