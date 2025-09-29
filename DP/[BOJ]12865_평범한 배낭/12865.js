const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '12865_input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const items = input.slice(1).map(line => line.split(' ').map(Number)); 

const dp = Array(K + 1).fill(0); 

for (let i = 0; i < N; i++) {
  const [w, v] = items[i];
  for (let cap = K; cap >= w; cap--) {
    dp[cap] = Math.max(dp[cap], dp[cap - w] + v);
  }
}

console.log(dp[K])
