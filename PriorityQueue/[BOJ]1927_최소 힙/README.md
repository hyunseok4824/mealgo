- **문제** : 백준 1927번 : 최소 힙
- **난이도** : 실버 2
- **문제 유형** : 우선순위 큐
- **푼 언어** : Javascript

## 01. 문제 설명
널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

1. 배열에 자연수 x를 넣는다.
2. 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.

프로그램은 처음에 비어있는 배열에서 시작하게 된다.

### 입력
첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. x는 231보다 작은 자연수 또는 0이고, 음의 정수는 입력으로 주어지지 않는다.

### 출력
입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

## 02. 문제 풀이
힙 자료구조를 구현하여 문제를 해결한다.
- heapPush 
추가하고자 하는 요소를 heap배열의 끝에 넣고 추가된 노드가 자신보다 작은값을 찾거나 최상단에 도달할 때까지 부모노드들과 비교하며 자리를 바꿀 것이다. 
현재 노드를 부모노드(`현재 노드 / 2`)와 비교한다. 만약 현재 노드가 부모노드보다 작다면 위치를 교환한다. 이를 현재 노드보다 값이 작은 노드를 만나거나, 배열 최상단 부분에 올때까지 반복한다.

- heapPop
제일 최상단의 요소(최솟값, `idx =0`)를 빼내고, 제일 끝에 있는 노드(`idx= heap.length-1`)를 최상단으로 가져온다. 현재 최상단에 있는 노드가 배열의 제일 끝으로 가거나 자신보다 큰 값을 찾을 때 까지 비교를 계속 진행할 것이다.  
현재 노드를 기준으로 좌측 자식 노드 (`idx * 2 + 1`), 우측 자식 노드 (`idx * 2 + 2`)를 찾은 뒤, 현재 노드와 비교하여 가장 값이 작은 노드를 찾는다. 이후 현재 노드와 최솟값의 노드와 교환한다. 이렇게 자리를 찾을 때 까지 반복한다.  


  <코드>
```Javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1927_input.txt'
const [N, ...command] = fs.readFileSync(filePath).toString().trim().split('\n').map(Number)


class MinHeap {
  constructor() {
    this.heap = []
  }
  size() { return this.heap.length; }

  // 요소 추가
  heapPush(x) {
    this.heap.push(x)
    let idx = this.size() - 1

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break
      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx
    } 
  }

  // 요소 삭제
  heapPop() {
    if (this.size() === 0) return 0
    if (this.size() === 1) return this.heap.pop()
    
    const top = this.heap[0]
    this.heap[0] = this.heap.pop()

    let idx = 0

    while (true) {
      let leftIdx = idx * 2 + 1
      let rightIdx = idx * 2 + 2
      let minIdx = idx
     
      if ( leftIdx < this.size() && this.heap[leftIdx] < this.heap[minIdx]) minIdx = leftIdx
      if ( rightIdx < this.size() && this.heap[rightIdx] < this.heap[minIdx]) minIdx = rightIdx

      if (minIdx === idx) break

      [this.heap[idx], this.heap[minIdx]] = [this.heap[minIdx], this.heap[idx]];
      idx = minIdx
    }
    return top
  }
}


const heap = new MinHeap()
const result = []

for ( let i=0; i<N; i++) {
  if ( command[i] === 0 ) result.push(heap.heapPop())
  else heap.heapPush(command[i])
  
}
console.log(result.join('\n'))
```
