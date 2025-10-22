- **문제** : 백준 1911번 - 흙길 보수하기
- **난이도** : 골드 5
- **문제 유형** : 정렬
- **푼 언어** : Javascript

## 01. 문제 설명
어젯밤 겨울 캠프 장소에서 월드 본원까지 이어지는, 흙으로 된 비밀길 위에 폭우가 내려서 N(1 ≤ N ≤ 10,000)개의 물웅덩이가 생겼다. 월드학원은 물웅덩이를 덮을 수 있는 길이가 L(1 ≤ L ≤ 1,000,000)인 널빤지들을 충분히 가지고 있어서, 이들로 다리를 만들어 물웅덩이들을 모두 덮으려고 한다. 물웅덩이들의 위치와 크기에 대한 정보가 주어질 때, 모든 물웅덩이들을 덮기 위해 필요한 널빤지들의 최소 개수를 구하여라.

### 입력
첫째 줄에 두 정수 N과 L이 들어온다.

둘째 줄부터 N+1번째 줄까지 총 N개의 줄에 각각의 웅덩이들의 정보가 주어진다. 웅덩이의 정보는 웅덩이의 시작 위치와 끝 위치로 이루어진다. 각 위치는 0 이상 1,000,000,000 이하의 정수이다. 입력으로 주어지는 웅덩이는 겹치지 않는다.

### 출력
첫째 줄에 모든 물웅덩이들을 덮기 위해 필요한 널빤지들의 최소 개수를 출력한다.

## 02. 문제 풀이 
우선 탐색을 쉽게 하기 위해 각 물웅덩이의 시작 위치를 기준으로 오름차순 정렬한다. 그다음, `plankStart`라는 변수를 이용해 현재까지 깔린 널빤지의 끝 위치를 추적할 것이다.

반복문을 돌면서 $puddle_i$의 시작점(`s`)과 끝점(`e`)을 확인한다.
만약 `plankStart`가 $puddle_i$에 닿지 않았다면 (`plankStart < s`) `plankStart`를 웅덩이의 시작점으로 이동시킨다.
반면에 이미 널빤지가 해당 웅덩이의 끝까지 덮고 있다면(`plankStart >= e`) 아무 작업도 하지 않는다.

덮이지 않은 구간을 발견한다면 (`e - plankStart`) 길이를 계산하고,
이 구간을 덮기 위해 필요한 널빤지의 개수를 `Math.ceil((e - plankStart) / L)`로 구한다. ceil 메소드를 사용하면 소수는 소수점을 버리고 1을 더한다.

이후, 필요한 널빤지 개수를 결과값(`result`)에 더하고, `plankStart`를 `need * L`만큼 증가시켜 널빤지를 덮은 위치까지 이동시킨다.

이 과정을 모든 웅덩이에 대해 반복하면, 최종적으로 모든 웅덩이를 덮기 위해 필요한 널빤지의 최소 개수를 구할 수 있다.
<코드>
```javascript
const fs  = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1911_input.txt'
const [[N, L], ...puddles] = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

puddles.sort((a, b) => a[0] - b[0])

let result = 0
let plankStart = puddles[0][0]

for ( let i=0; i < N; i++ ) {
  const [s, e] = puddles[i]
  
  if ( plankStart < s ) plankStart = s
  
  if (plankStart >= e) continue

  const need = Math.ceil((e - plankStart) / L)
  result += need
  plankStart += need * L
}

console.log(result)

```
## 회고
- 메소드를 잘 알면 쉽게 풀 수 있는 문제였다. 언어 공부를 열심히 하자