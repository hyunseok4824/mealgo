- **문제** : 백준 1043 - 거짓말
- **난이도** : 골드 4
- **문제 유형** : union-find
- **푼 언어** : javascript

## 01. 문제 설명
지민이는 파티에 가서 이야기 하는 것을 좋아한다. 파티에 갈 때마다, 지민이는 지민이가 가장 좋아하는 이야기를 한다. 지민이는 그 이야기를 말할 때, 있는 그대로 진실로 말하거나 엄청나게 과장해서 말한다. 당연히 과장해서 이야기하는 것이 훨씬 더 재미있기 때문에, 되도록이면 과장해서 이야기하려고 한다. 하지만, 지민이는 거짓말쟁이로 알려지기는 싫어한다. 문제는 몇몇 사람들은 그 이야기의 진실을 안다는 것이다. 따라서 이런 사람들이 파티에 왔을 때는, 지민이는 진실을 이야기할 수 밖에 없다. 당연히, 어떤 사람이 어떤 파티에서는 진실을 듣고, 또다른 파티에서는 과장된 이야기를 들었을 때도 지민이는 거짓말쟁이로 알려지게 된다. 지민이는 이런 일을 모두 피해야 한다.

사람의 수 N이 주어진다. 그리고 그 이야기의 진실을 아는 사람이 주어진다. 그리고 각 파티에 오는 사람들의 번호가 주어진다. 지민이는 모든 파티에 참가해야 한다. 이때, 지민이가 거짓말쟁이로 알려지지 않으면서, 과장된 이야기를 할 수 있는 파티 개수의 최댓값을 구하는 프로그램을 작성하시오.

### 입력
첫째 줄에 사람의 수 N과 파티의 수 M이 주어진다.

둘째 줄에는 이야기의 진실을 아는 사람의 수와 번호가 주어진다. 진실을 아는 사람의 수가 먼저 주어지고 그 개수만큼 사람들의 번호가 주어진다. 사람들의 번호는 1부터 N까지의 수로 주어진다.

셋째 줄부터 M개의 줄에는 각 파티마다 오는 사람의 수와 번호가 같은 방식으로 주어진다.

N, M은 50 이하의 자연수이고, 진실을 아는 사람의 수는 0 이상 50 이하의 정수, 각 파티마다 오는 사람의 수는 1 이상 50 이하의 정수이다.

### 출력
첫째 줄에 문제의 정답을 출력한다.

## 02. 문제 풀이
해당 문제의 핵심은 한 번이라도 진실을 아는 사람과 같은 파티에 참석하면, 그 사람들도 모두 진실을 알게 된다는 점이다. 결국 파티를 통해 사람들은 하나의 그룹으로 연결된다.

그렇기에 유니온-파인드 알고리즘을 이용해 파티로 연결된 사람들을 같은 집합을으로 묶었다. 그다음 진실을 알고 있는 사람들의 루트 노드를 찾아 Set에 담아두었다. 이렇게 한 이유는 탐색 속도를 빠르게 하고, 동시에 중복을 제거하기 때문이다. 
마지막으로, 각 파티의 참가자들을 순회하면서 루트 노드를 확인하고, 만약 그 루트가 Set에 포함되어 있지 않다면 해당 파티에서는 과장된 이야기를 해도 문제가 없으므로 ans를 1 증가시켰다.

  <코드>
```javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1043_input.txt'
const [[N, M], [tn,...truthKnowers], ...paties ] = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

const find = (x) => {
  if (parents[x] !== x) parents[x] = find(parents[x])
  return parents[x]
}
const union = (a, b) => {
  const pA = find(a)
  const pB = find(b)
  
  if (pA >= pB) parents[pA] = pB
  else parents[pB] = pA
} 

const parents = Array.from({ length: N + 1 }, (_, i) => i); 

// 만났던 파티 참가자 그룹 만들기 (union-find)
for (let i=0; i<M; i++) {
  const [mn,...members] = paties[i]       // [파티 참가인원 수, 피티 참가 명단]
  for (let j=1; j<mn; j++) {
    union(members[0], members[j])
  }
}
const truthRoots = new Set()
for (const p of truthKnowers) {
  truthRoots.add(find(p));
}


let ans = 0
for (let i=0; i<M; i++) {
  const [mn,...members] = paties[i]       // [파티 참가인원 수, 피티 참가 명단]
  let canLie = true
  for (let j=0; j<mn; j++) {
    if (truthRoots.has(find(members[j]))) {
      canLie = false
      break
    }
  }
  if (canLie) ans ++
}

console.log(ans)
  ```