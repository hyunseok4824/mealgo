- **문제** : 백준 1106번 - 호텔  
- **난이도** : 골드 5
- **문제 유형** : DP, 배낭 문제
- **푼 언어** : Javascript

## 01. 문제 설명
세계적인 호텔인 형택 호텔의 사장인 김형택은 이번에 수입을 조금 늘리기 위해서 홍보를 하려고 한다.

형택이가 홍보를 할 수 있는 도시가 주어지고, 각 도시별로 홍보하는데 드는 비용과, 그 때 몇 명의 호텔 고객이 늘어나는지에 대한 정보가 있다.

예를 들어, “어떤 도시에서 9원을 들여서 홍보하면 3명의 고객이 늘어난다.”와 같은 정보이다. 이때, 이러한 정보에 나타난 돈에 정수배 만큼을 투자할 수 있다. 즉, 9원을 들여서 3명의 고객, 18원을 들여서 6명의 고객, 27원을 들여서 9명의 고객을 늘어나게 할 수 있지만, 3원을 들여서 홍보해서 1명의 고객, 12원을 들여서 4명의 고객을 늘어나게 할 수는 없다.

각 도시에는 무한 명의 잠재적인 고객이 있다. 이때, 호텔의 고객을 적어도 C명 늘이기 위해 형택이가 투자해야 하는 돈의 최솟값을 구하는 프로그램을 작성하시오.

### 입력 
첫째 줄에 C와 형택이가 홍보할 수 있는 도시의 개수 N이 주어진다. C는 1,000보다 작거나 같은 자연수이고, N은 20보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에는 각 도시에서 홍보할 때 대는 비용과 그 비용으로 얻을 수 있는 고객의 수가 주어진다. 이 값은 100보다 작거나 같은 자연수이다.

### 출력 
첫째 줄에 문제의 정답을 출력한다.


## 02. 문제 풀이
이 문제는 각각의 도시에 얼마를 투자해야, 최소 비용으로 원하는 고객 수 이상을 달성할 수 있는지 찾는 문제다. 즉 `배낭문제`처럼 특정 조건을 달성하는 부분집합을 찾아야 한다. 

각각의 도시들의 정보(홍보 비용, 얻을 수 있는 고객수)를 담은 배열을 순회하면서 DP 테이블을 업데이트 한다. 여기서 DP 테이블은 투자를 할 때 증가하는 고객 수를 표현하며, 각 요소들의 값은 비용을 의미한다.

업데이트 할 때 사용하는 점화식은 `dpTable[j] = Math.min(dpTable[j-effect]+cost, dpTable[j])`으로, 해당 도시에 투자하면 증가하는 비용과 현재 위치의 값을 비교한다.

### 02-1 최적화 계획
1. **테이블 크기 제한 기준 설정**
`tableLimit`은 DP 테이블의 고객 수 범위를 결정하는 변수다.
가장 고객 증가 수가 큰 도시의 고객 증가 수를 사용하여 `tableLimit`를 계산하였다. 모든 도시 중 고객 증가 수의 최댓값은 반드시 해당 범위 내에 속한다. 

2. **최대 비용 설정**
각 도시의 홍보 비용은 최대 100이다. 최악의 경우 고객을 1명 늘리는 데마다 비용이 100이 든다고 가정하면, tableLimit명의 고객을 확보하는 데 드는 최대 비용은 `100 * tableLimit`이다.
따라서 DP 초기값으로 사용할 충분히 큰 값으로 `maxCost = (tableLimit * 100) + 1`을 설정하여 메모리를 절약하고자 하였다.


<코드>
```javascript
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
```
## 03. 회고
정렬을 하면 알고리즘이 더 빨라질 것이라 생각했는데, 그렇게 큰 영향은 없었다.. 그래도 정렬을 한 덕에 최대 테이블 크기를 구할 수 있어서, 메모리는 절약할 수 있었다.
