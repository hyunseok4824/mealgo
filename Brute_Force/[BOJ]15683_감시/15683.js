const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '15683_input.txt'
const [ [N, M], ...room ] = fs.readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))

const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const CCTV_VIEW = {
  1:[[0], [1], [2], [3]],
  2:[[0, 1], [2, 3]],
  3:[[0, 2], [0, 3], [1, 2], [1, 3]],
  4:[[0, 1, 2], [0, 1, 3], [2, 3, 0], [2, 3, 1]],
  5:[[0, 1, 2, 3]]
}

// CCTV가 볼 수 있는 한 방향 시야 계산하는 함수
const watchSet = ( x, y, dirs ) => {
  let res = new Set()
  for ( const dir of dirs ) {
    const [dx, dy] = DIRECTIONS[dir]
    let [nx, ny] = [dx + x, dy + y]
    while ( ( 0 <= nx && nx < N && 0 <= ny && ny < M ) && room[nx][ny] !== 6 ) {
      if ( room[nx][ny] === 0 ) res.add(`${nx},${ny}`)
      nx += dx
      ny += dy
    }
  }


  return res
}

const cctvOptions = []   // CCTV 시야범위 배열 
let blind = 0       // 빈 공간 개수

for ( let r = 0; r < N; r++ ) {
  for ( let c = 0; c < M; c++ ) {
    if ( room[r][c] === 0 ) {
      blind ++
    } 
    else if ( room[r][c] !== 6 ) {
      // 현재 CCTV의 시야범위 계산
      const cctvNum = room[r][c]
      const opts = []
      for ( let cctvDir of CCTV_VIEW[cctvNum] ) {
        opts.push(watchSet(r, c, cctvDir))
      }
      cctvOptions.push(opts)
    }
  }
}


let maxCovered = 0

const dfs = ( depth, coverd ) => {
  if ( depth === cctvOptions.length ) {
    maxCovered = Math.max( maxCovered, coverd.size )
    return
  }

  for ( let curSet of cctvOptions[depth] ) {
    const nextSet = new Set(coverd)
    for ( const key of curSet ) nextSet.add(key) 

    dfs( depth + 1, nextSet )
  }
}


dfs( 0, new Set() )
console.log(blind - maxCovered)



