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

## 03. 회고
- *주의 !!* 유연한 완탐 <br>
처음에 완탐이라고 못떠올림. n = 26
조합을 순열로 풀지 말기 <- 시초 원인