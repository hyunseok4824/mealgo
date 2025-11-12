- **문제** : 백준 11286번 : 절댓값 힙
- **난이도** : 실버 1
- **문제 유형** : 우선순위 큐
- **푼 언어** : Javascript

## 01. 문제 설명
절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.

1. 배열에 정수 x (x ≠ 0)를 넣는다.
2. 배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다. 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수를 출력하고, 그 값을 배열에서 제거한다.

프로그램은 처음에 비어있는 배열에서 시작하게 된다.

### 입력

첫째 줄에 연산의 개수 N(1≤N≤100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 0이 아니라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 절댓값이 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 정수는 $-2^{31}$보다 크고, $2^{31}$보다 작다.

### 출력
입력에서 0이 주어진 회수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 절댓값이 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

## 02. 문제 풀이
배열 안에 있는 최솟값이나 최댓값을 구하는 기본적인 heap과 달리 절댓값이 가장 작은 값을 구하는 문제이다. 또한 절댓값이 여러 개일 때에는 가장 작은 수를 출력해야 한다. 즉 절댓값을 비교하고, 절댓값이 같으면 수의 크기를 비교하는 로직이 필요하다. 

- **compare**
각 두 변수의 절댓값을 구하고 비교하는 함수다. `x`는 작은 수를 놓고, `y`는 큰 수가 온다는 것을 가정한다. 리턴 값은 boolan 타입이며, 만약 두 변수의 절댓값이 다르다면 절댓값으로 크기를 비교할 수 있다는 의미이므로 `absX < absY`를 리턴한다. 만약 x가 y보다 작다면 true가 리턴될 것이며, 그렇지 않다면 false가 리턴될 것이다.
반면, 두 값의 절댓값이 같다면, `x < y`를 리턴한다.

- **heapPush** 
추가하고자 하는 요소를 heap배열의 끝에 넣고 추가된 노드가 자신보다 작은값을 찾거나 최상단에 도달할 때까지 부모노드들과 비교하며 자리를 바꿀 것이다. 
현재 노드를 부모노드(`현재 노드 / 2`)와 `compare`함수를 사용하여 비교한다. 만약 현재 노드가 부모노드보다 작다면 위치를 교환한다. 이를 현재 노드보다 값이 작은 노드를 만나거나, 배열 최상단 부분에 올때까지 반복한다.

- heapPop
제일 최상단의 요소(최솟값, `idx =0`)를 빼내고, 제일 끝에 있는 노드(`idx= heap.length-1`)를 최상단으로 가져온다. 현재 최상단에 있는 노드가 배열의 제일 끝으로 가거나 자신보다 큰 값을 찾을 때 까지 비교를 계속 진행할 것이다.  
현재 노드를 기준으로 좌측 자식 노드 (`idx * 2 + 1`), 우측 자식 노드 (`idx * 2 + 2`)를 찾은 뒤, 현재 노드와 `compare`함수를 사용하여 비교하며, 가장 값이 작은 노드를 찾는다. 이후 현재 노드와 최솟값의 노드와 교환한다. 이렇게 자리를 찾을 때 까지 반복한다.  


  <코드>
```Javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '11286_input.txt'
const [N, ...commandList] = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const minHeap = []

const compare = (x, y) => {
  const absX = Math.abs(x)
  const absY = Math.abs(y)
  if ( absX !== absY ) return absX < absY
  return x < y
}


const heapPush = (x, heap) => {

  heap.push(x)
  let idx = heap.length - 1
  
  while ( idx > 0 ) {
    let parentIdx = Math.floor((idx - 1) / 2)
    const parentValue = heap[parentIdx]
    if ( !compare(x, heap[parentIdx]) ) break

    [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]]
    idx = parentIdx
  }
}

const heapPop = (heap) => {
  if ( heap.length === 0 ) return 0
  if ( heap.length === 1 ) return heap.pop()
    
  const top = heap[0]
  heap[0] = heap.pop()

  let idx = 0
  const heapSize = heap.length

  while ( true ) {
    let best = idx 
    let leftIdx = (idx * 2) + 1
    let rightIdx = (idx * 2) + 2

    if ( leftIdx < heapSize && compare(heap[leftIdx], heap[best]) ) best = leftIdx
    if ( rightIdx < heapSize && compare(heap[rightIdx], heap[best])) best = rightIdx
    if ( best === idx ) break

    [heap[idx], heap[best]] = [heap[best], heap[idx]]
    idx = best
  }
  return top
}

let result = ''
for ( let i=0; i<N; i++ ) {
  if ( commandList[i] === 0 ) {
  result += `${heapPop(minHeap)}\n`

  }
  else {
    heapPush(commandList[i], minHeap)
  }
}

console.log(result)
```
