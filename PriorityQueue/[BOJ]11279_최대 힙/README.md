- **문제** : 백준 11279번 : 최대 힙
- **난이도** : 실버 2
- **문제 유형** : 우선순위 큐
- **푼 언어** : Javascript

## 01. 문제 설명
널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

1. 배열에 자연수 x를 넣는다.
2. 배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.

프로그램은 처음에 비어있는 배열에서 시작하게 된다.

### 입력
첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 큰 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 자연수는 231보다 작다.

### 출력
입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 큰 값을 출력하라고 한 경우에는 0을 출력하면 된다.

## 02. 문제 풀이
힙 자료구조를 함수로 구현하여 문제를 해결한다.

- heapPush 
추가하고자 하는 요소를 heap배열의 끝에 넣고 추가된 노드가 자신보다 큰 값을 찾거나 최상단에 도달할 때까지 부모노드들과 비교하며 자리를 바꿀 것이다. 
현재 노드를 부모노드(`현재 노드 / 2`)와 비교한다. 만약 현재 노드가 부모노드보다 크다면 위치를 교환한다. 이를 현재 노드보다 값이 큰 노드를 만나거나, 배열 최상단 부분에 올때까지 반복한다.

- heapPop
제일 최상단의 요소(최댓값, `idx =0`)를 빼내고, 제일 끝에 있는 노드(`idx= heap.length-1`)를 최상단으로 가져온다. 현재 최상단에 있는 노드가 배열의 제일 끝으로 가거나 자신보다 작은 값을 찾을 때 까지 비교를 계속 진행할 것이다.  
현재 노드를 기준으로 좌측 자식 노드 (`idx * 2 + 1`), 우측 자식 노드 (`idx * 2 + 2`)를 찾은 뒤, 현재 노드와 비교하여 가장 값이 큰 노드를 찾는다. 이후 현재 노드와 최댓값의 노드와 교환한다. 이렇게 자리를 찾을 때 까지 반복한다.  


  <코드>
```Javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '11279_input.txt'
const [N, ...commands] = fs.readFileSync(filePath).toString().trim().split('\n').map(Number)

const heap = []

const heapPush = (x, heap) => {
  heap.push(x)
  let idx = heap.length - 1

  while (idx > 0) {
    let parentIdx = Math.floor((idx - 1) / 2)
    if (heap[idx] <= heap[parentIdx]) break
    ;[heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]]
    idx = parentIdx
  }
}

const heapPop = (heap) => {
  if (heap.length === 0) return 0
  if (heap.length === 1) return heap.pop()

  const top = heap[0]
  heap[0] = heap.pop()

  let idx = 0
  const size = heap.length  

  while (true) {
    const leftIdx = idx * 2 + 1
    const rightIdx = idx * 2 + 2
    let maxIdx = idx

    if (leftIdx < size && heap[leftIdx] > heap[maxIdx]) maxIdx = leftIdx
    if (rightIdx < size && heap[rightIdx] > heap[maxIdx]) maxIdx = rightIdx

    if (maxIdx === idx) break

    [heap[idx], heap[maxIdx]] = [heap[maxIdx], heap[idx]]
    idx = maxIdx
  }
  return top
}

const ans = []

for (let i = 0; i < N; i++) {
  const command = commands[i]
  if (command === 0) ans.push(heapPop(heap))
  else heapPush(command, heap)
}

console.log(ans.join('\n'))
```
