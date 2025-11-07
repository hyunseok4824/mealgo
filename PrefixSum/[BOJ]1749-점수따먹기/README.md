- **문제** : 백준 1749번 - 점수따먹기
- **난이도** : 골드 4
- **문제 유형** : 누적합
- **푼 언어** : java

## 01. 문제 설명

<p>동주는 항상 혼자 노느라 심심하다. 하지만 혼자 놀기의 고수가 된 동주는 매일매일 게임을 개발하여 혼자놀기의 진수를 우리에게 보여준다. 어느 날 동주는 새로운 게임을 개발하였다. 바로 점수 따먹기라는 게임인데 그다지 재밌어 보이지는 않는다.</p>

<p>동주가 개발한 게임은 이렇다. 일단 N*M 행렬을 그린 다음, 각 칸에 -10,000 이상 10,000 이하의 정수를 하나씩 쓴다. 그런 다음 그 행렬의 부분행렬을 그려 그 안에 적힌 정수의 합을 구하는 게임이다.</p>

<p>동주가 혼자 재밌게 놀던 중 지나가는 당신을 보고 당신을 붙잡고 게임을 하자고 한다. 귀찮은 당신은 정수의 합이 최대가 되는 부분행렬을 구하여 빨리 동주에게서 벗어나고 싶다.</p>

### 입력 

 <p>첫째 줄에 N (1 < N < 200), M (1 < M < 200)이 주어진다. 그 다음 N개의 줄에 M개씩 행렬의 원소가 주어진다.</p>

### 출력 

 <p>첫째 줄에 최대의 합을 출력하라.</p>


## 02. 문제 풀이

- 방법 <br>
1. 2차원 배열에서 누적합을 구하고<br>
    - ```psum[i][j] = psum[i][j-1] + psum[i-1][j] - psum[i-1][j-1] + arr[i-1][j-1];```
    - ```psum[x2][y2] - psum[x2][y1-1] - psum[x1-1][y2] + psum[x1-1][y1-1];```
2. 조합으로 모든 경우의 수 완탐하며 최댓값 갱신<br>


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M;
        static long mx =Long.MIN_VALUE;
        static long[][] psum;
        static int[][] arr;
        static long cal(int x1, int y1, int x2, int y2){
            return psum[x2][y2] - psum[x2][y1-1] - psum[x1-1][y2] + psum[x1-1][y1-1];
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            psum = new long[N+1][M+1];
            arr = new int[N][M];
            for(int i=0;i<N;i++){
                st = new StringTokenizer(br.readLine());
                for(int j=0;j<M;j++){
                    arr[i][j] = Integer.parseInt(st.nextToken());
                }
            }
            for(int i=1;i<=N;i++){
                for(int j=1;j<=M;j++){
                    psum[i][j] = psum[i][j-1] + psum[i-1][j] - psum[i-1][j-1] + arr[i-1][j-1];
                }
            }
            for(int i=1;i<=N;i++){
                for(int j=1;j<=M;j++){
                    for(int k = i; k<=N;k++){
                        for(int t = j; t <= M; t++){
                            long tmp = cal(i,j,k,t);
                            mx = Math.max(mx,tmp);
                        }
                    }
                }
            }
            System.out.println(mx);
        }
    }
    ```

## 03. 회고
*!!주의!!* 오버플로우 늘 주의하기 !!