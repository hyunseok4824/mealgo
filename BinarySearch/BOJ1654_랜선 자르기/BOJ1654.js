const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : 'BOJ1654_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const [