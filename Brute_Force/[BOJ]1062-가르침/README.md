- **문제** : 백준 1062번 - 가르침
- **난이도** : 골드 4
- **문제 유형** : 완탐
- **푼 언어** : java

## 01. 문제 설명

<p>남극에 사는 김지민 선생님은 학생들이 되도록이면 많은 단어를 읽을 수 있도록 하려고 한다. <span style="line-height:1.6em">그러나 지구온난화로 인해 얼음이 녹아서 곧 학교가 무너지기 때문에, 김지민은 K개의 글자를 가르칠 시간 밖에 없다. 김지민이 가르치고 난 후에는, 학생들은 그 K개의 글자로만 이루어진 단어만을 읽을 수 있다. 김지민은 어떤 K개의 글자를 가르쳐야 학생들이 읽을 수 있는 단어의 개수가 최대가 되는지 고민에 빠졌다.</span></p>

<p>남극언어의 모든 단어는 "anta"로 시작되고, "tica"로 끝난다. 남극언어에 단어는 N개 밖에 없다고 가정한다. 학생들이 읽을 수 있는 단어의 최댓값을 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 단어의 개수 N과 K가 주어진다. N은 50보다 작거나 같은 자연수이고, K는 26보다 작거나 같은 자연수 또는 0이다. 둘째 줄부터 N개의 줄에 남극 언어의 단어가 주어진다. 단어는 영어 소문자로만 이루어져 있고, 길이가 8보다 크거나 같고, 15보다 작거나 같다. 모든 단어는 중복되지 않는다.</p>

### 출력 

 <p>첫째 줄에 김지민이 K개의 글자를 가르칠 때, 학생들이 읽을 수 있는 단어 개수의 최댓값을 출력한다.</p>


## 02. 문제 풀이

방법<br>
1. 5개 문자를 제외하고 K-5만큼 다른 문자 조합으로 뽑기<br>
2. 뽑은 문자로 몇개의 문자열을 가르칠 수 있는지 count 하면서 완탐 + 최댓값 갱신<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,K, mx;
        static String[] strs;
        static int[] vis;
        static void cal(){
            int cnt = 0; int flag = 0;
            for(int i =0;i<N;i++){
                String s = strs[i];
                flag = 0;
                for(int j=0;j<s.length();j++){
                    char c = s.charAt(j);
                    if(vis[c-'a'] == 0){
                        flag = 1;
                        break;
                    }
                }
                if(flag == 0){
                    cnt += 1;
                }
                
            }
            mx = Math.max(mx,cnt);
        }
        static void dfs(int st, int k){
            if(k==K-5){
                cal();
                return;
            }
            for(int i=st;i<26;i++){
                if(vis[i] == 0){
                    vis[i] = 1;
                    dfs(i+1,k+1);
                    vis[i] = 0;
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            vis = new int[26];
            strs = new String[N];
            K = Integer.parseInt(st.nextToken());
            for(int i=0;i<N;i++){
                strs[i] = br.readLine();
            }
            vis['a'-'a'] = 1; vis['n'-'a'] = 1; vis['t'-'a'] = 1; vis['i'-'a'] = 1; vis['c'-'a'] = 1;
            if(K<5){
                System.out.println(0);
                return;
            }else if(K==26){
                System.out.println(N);
                return;
            }
            dfs(0,0);
            System.out.println(mx);
        }
    }
    ```

- 방법 2 (비트마스크)
1. 공통 글자 처리
모든 단어는 "anta"로 시작되고, "tica"로 끝난다. 즉, 'a', 'c', 'i', 'n', 't' 이 5개의 단어들은 무조건 배워야 한다. 그렇기에 5보다 K가 작다면 `0`을 출력하고 종료한다. 
이후 불필요한 메모리와 탐색을 줄이기 위해 모든 단어에서 "anta"와 "tica"를 잘라내고 중간에 나오는 글자들만 사용한다. 또한, 항상 포함되는 공통 글자 다섯 개는 Set에 두었다. 해당 Set에 글자들이 포함되어 있는지 빠르게 탐색하려고 Set을 사용했다. 
이 다섯 글자를 제외한 나머지 글자들만 따로 `commonWordSet`에 담는다. Set을 사용하면 중복이 제거되기 때문에 이후 더 적은 양의 연산이 가능하게 만들어 준다.

2. 단어를 비트마스크로 변환하기
알파벳 26개를 각각 하나의 비트로 대응시켜서, 각 단어를 배우기 위해 “어떤 알파벳이 필요한지”를 나타내는 비트로 표현한다. 예를 들어 a는 0번, b는 1번, ... z는 25번으로 매핑하고, 해당 글저가 등장하면 매핑된 비트에 1로 표시한다.

3. 조합(DFS)으로 알파벳 선택 + 읽을 수 있는 단어 수 계산
`charSet`에는 공통 글자 5개를 제외한 글자만 들어있다. 이제 이 집합에서 최대 K - 5개를 선택해서 가르칠 수 있다. `charSet`에 담겨있는 글자들은 이후 비트마스킹을 위해 bit로 변환시키고, 조합을 사용하여 단어들을 고른다. 그리고 고른 단어들로 몇 개의 단어를 배울 수 있는지 체크한 후 `cnt`를 증가시킨다. 이후 `ans`와 비교하여 큰 값으로 업데이트 한다.


```javascript
const fs = require('fs')
const filePath = process.platform === 'linux' ? 'dev/stdin' : '1062_input.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n')

const [N, K] = input[0].split(' ').map(Number)

// K가 5 미만이면 어떤 단어도 못 읽음
if (K < 5) {
  console.log(0)
  process.exit(0)
}


const charSet = new Set()
const commonWordSet = new Set(['a', 'c', 'i', 'n', 't'])

// 단어를 비트로 변환
const word2Bit = (word) => {
  let bit = 0
  
  for (let char of word) {
    if (!commonWordSet.has(char)) {
      charSet.add(char)   // 중복 단어 제거
      bit |= (1 << (char.charCodeAt(0) - 65))
    }
  }
  return bit
}

const word2BitList = []

for ( let i=1; i<=N; i++ ) {
  const curWord = input[i].slice(4, input[i].length - 4)
  word2BitList.push(word2Bit(curWord))
}

const charList = Array.from(charSet)
const charToBitList = charList.map(ch => 1 << (ch.charCodeAt(0) - 97))
const limit = Math.min(K - 5, charList.length)
let ans = 0

const combine = (depth, lev, mask) => {
  if ( depth === limit ) {
    let cnt = 0
    for (const wordBit of word2BitList) {
      if ((wordBit & ~mask) === 0) cnt++
    }
    
    if (cnt > ans) ans = cnt
    return
  }
  for(let i = lev; i < charToBitList.length; i++) {
    combine(depth + 1, i + 1, mask | charToBitList[i])
  }

}
  
combine(0, 0, 0)
console.log(ans)
```

## 03. 회고
- *주의 !!* 유연한 완탐 <br>
처음에 완탐이라고 못떠올림. n = 26
조합을 순열로 풀지 말기 <- 시초 원인