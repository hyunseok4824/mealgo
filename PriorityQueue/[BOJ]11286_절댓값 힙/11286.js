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