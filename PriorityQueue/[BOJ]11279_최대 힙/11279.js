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