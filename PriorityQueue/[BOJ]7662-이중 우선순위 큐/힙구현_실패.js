const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7662_input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input[0]);
let idx = 1;

class MinHeap {
  constructor() {
    this.heap = []; 
  }
  size() { return this.heap.length; }
  peek() { return this.size() ? this.heap[0] : undefined; }

  heapPush(value) {
    this.heap.push(value);
    let i = this.size() - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  heapPop() {
    const n = this.size();
    if (n === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (n > 1) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1, r = l + 1;
        let s = i;
        if (l < this.size() && this.heap[l] < this.heap[s]) s = l;
        if (r < this.size() && this.heap[r] < this.heap[s]) s = r;
        if (s === i) break;
        [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
        i = s;
      }
    }
    return top;
  }
}

const out = [];

for (let tc = 0; tc < T; tc++) {
  const K = Number(input[idx++]);
  const minHeap = new MinHeap();
  const maxHeap = new MinHeap(); // 음수로 넣어 최대힙처럼 사용
  const counts = new Map(); // value -> 유효 개수

  const inc = (x) => counts.set(x, (counts.get(x) || 0) + 1);
  const dec = (x) => {
    const c = counts.get(x);
    if (!c) return;
    if (c === 1) counts.delete(x);
    else counts.set(x, c - 1);
  };

  const cleanMin = () => {
    while (minHeap.size()) {
      const v = minHeap.peek();
      if ((counts.get(v) || 0) > 0) break; // 유효
      minHeap.heapPop(); // 유령 제거
    }
  };
  const cleanMax = () => {
    while (maxHeap.size()) {
      const v = -maxHeap.peek();
      if ((counts.get(v) || 0) > 0) break; // 유효
      maxHeap.heapPop(); // 유령 제거
    }
  };

  for (let i = 0; i < K; i++) {
    let [cmd, numStr] = input[idx++].split(' ');
    if (cmd === 'I') {
      const x = Number(numStr);
      minHeap.heapPush(x);
      maxHeap.heapPush(-x);
      inc(x);
    } else { // 'D'
      if (numStr === '1') { // delete max
        cleanMax();
        if (maxHeap.size()) {
          const mx = -maxHeap.heapPop();
          dec(mx);
        }
      } else { // delete min
        cleanMin();
        if (minHeap.size()) {
          const mn = minHeap.heapPop();
          dec(mn);
        }
      }
    }
  }

  // 최종 정리 후 결과 산출
  cleanMin();
  cleanMax();

  if (!minHeap.size() || !maxHeap.size() || counts.size === 0) {
    out.push('EMPTY');
  } else {
    const maxV = -maxHeap.peek();
    const minV = minHeap.peek();
    out.push(`${maxV} ${minV}`);
  }
}

console.log(out.join('\n'));