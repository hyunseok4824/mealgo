const fs = require('fs')
const filepath = process.platform === 'linux' ? '/dev/stdin' : '9935_input.txt'
const [str, bomb] = fs.readFileSync(filepath).toString().trim().split('\n')

const lastChr = bomb[bomb.length-1]

const stack = []
for ( let i=0; i < str.length; i++ ) {
  stack.push(str[i])
  if ( str[i] === lastChr && stack.length >= bomb.length ) {
    let isExploded = true
    let startPoint = stack.length - bomb.length 
    for ( let j=0; j < bomb.length; j++) {
      if (stack[startPoint+ j] !== bomb[j]) {
        isExploded = false
        break
      }
    }
    if (isExploded) {
      stack.length -= bomb.length
    }
  }
}

if (stack.length > 0) console.log(stack.join(''))
else console.log('FRULA')