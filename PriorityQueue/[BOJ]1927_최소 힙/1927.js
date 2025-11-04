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