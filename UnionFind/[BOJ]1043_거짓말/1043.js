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