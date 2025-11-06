- **문제** : 백준 9184번 - 신나는 함수 실행
- **난이도** : 실버 2
- **문제 유형** : DP
- **푼 언어** : Javascript

## 01. 문제 설명
재귀 호출만 생각하면 신이 난다! 아닌가요?

다음과 같은 재귀함수 w(a, b, c)가 있다.
```
if a <= 0 or b <= 0 or c <= 0, then w(a, b, c) returns:
    1

if a > 20 or b > 20 or c > 20, then w(a, b, c) returns:
    w(20, 20, 20)

if a < b and b < c, then w(a, b, c) returns:
    w(a, b, c-1) + w(a, b-1, c-1) - w(a, b-1, c)

otherwise it returns:
    w(a-1, b, c) + w(a-1, b-1, c) + w(a-1, b, c-1) - w(a-1, b-1, c-1)
```
위의 함수를 구현하는 것은 매우 쉽다. 하지만, 그대로 구현하면 값을 구하는데 매우 오랜 시간이 걸린다. (예를 들면, a=15, b=15, c=15)

a, b, c가 주어졌을 때, w(a, b, c)를 출력하는 프로그램을 작성하시오.

### 입력
입력은 세 정수 a, b, c로 이루어져 있으며, 한 줄에 하나씩 주어진다. 입력의 마지막은 -1 -1 -1로 나타내며, 세 정수가 모두 -1인 경우는 입력의 마지막을 제외하면 없다.

### 출력
입력으로 주어진 각각의 a, b, c에 대해서, w(a, b, c)를 출력한다.

## 02. 문제 풀이 
3개의 매개변수의 조합에 따라 답이 달라지기 때문에, dp 테이블을 3차원으로 만들었다. 이 dp 테이블에 이미 계산된 값들을 모두 저장하여, 같은 입력이 들어왔을 때 바로 호출할 수 있도록 하였다.  

<코드>
```javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '9184_input.txt'
const input = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')


const limit = 21
const dp = Array.from({ length: limit }, () =>
  Array.from({ length: limit }, () =>
    Array(limit).fill(0)
  )
)

const solve = (x, y, z) => {
  
  if ( x <= 0 || y <= 0 || z <= 0 ) return 1
  if ( x > 20 || y > 20 || z > 20 ) return solve(20, 20, 20)
  
  if ( dp[x][y][z] ) return dp[x][y][z]

  if ( x < y && y < z ) {
    dp[x][y][z] = solve(x, y, z-1) + solve(x, y-1, z-1) - solve(x, y-1, z)
    return dp[x][y][z]
  } else {
    dp[x][y][z] = solve(x-1, y, z) + solve(x-1, y-1, z) + solve(x-1, y, z-1) - solve(x-1, y-1, z-1)
    return dp[x][y][z]
  }
}

let output = ""  
for (let i=0; i<input.length-1; i++) {
  const [a, b, c] = input[i].split(' ').map(Number)
  output = output.concat(`w(${a}, ${b}, ${c}) = ${solve(a, b, c)}\n`) 
}

console.log(output)
```
