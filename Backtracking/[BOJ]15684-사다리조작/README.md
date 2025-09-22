- **문제** : 백준 15684번 - 사다리 조작
- **난이도** : 골드 3
- **문제 유형** : 백트래킹
- **푼 언어** : java

## 01. 문제 설명

<p>사다리 게임은 N개의 세로선과 M개의 가로선으로 이루어져 있다. 인접한 세로선 사이에는 가로선을 놓을 수 있는데, 각각의 세로선마다 가로선을 놓을 수 있는 위치의 개수는 H이고, 모든 세로선이 같은 위치를 갖는다. 아래 그림은 N = 5, H = 6 인 경우의 그림이고, 가로선은 없다.</p>

<p style="text-align: center;"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15684/1.png" style="width: 390px; height: 300px;"></p>

<p>초록선은 세로선을 나타내고, 초록선과 점선이 교차하는 점은 가로선을 놓을 수 있는 점이다. 가로선은 인접한 두 세로선을 연결해야 한다. 단, 두 가로선이 연속하거나 서로 접하면 안 된다. 또, 가로선은 점선 위에 있어야 한다.</p>

<p style="text-align: center;"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15684/2.png" style="width: 390px; height: 300px;"></p>

<p>위의 그림에는 가로선이 총 5개 있다. 가로선은 위의 그림과 같이 인접한 두 세로선을 연결해야 하고, 가로선을 놓을 수 있는 위치를 연결해야 한다.</p>

<p>사다리 게임은 각각의 세로선마다 게임을 진행하고, 세로선의 가장 위에서부터 아래 방향으로 내려가야 한다. 이때, 가로선을 만나면 가로선을 이용해 옆 세로선으로 이동한 다음, 이동한 세로선에서 아래 방향으로 이동해야 한다.</p>

<p>위의 그림에서 1번은 3번으로, 2번은 2번으로, 3번은 5번으로, 4번은 1번으로, 5번은 4번으로 도착하게 된다. 아래 두 그림은 1번과 2번이 어떻게 이동했는지 나타내는 그림이다.</p>

<table class="table table table-bordered" style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 50%; text-align: center;"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15684/3.png" style="width: 390px; height: 300px;"></td>
			<td style="width: 50%; text-align: center;"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15684/4.png" style="width: 390px; height: 300px;"></td>
		</tr>
		<tr>
			<td style="width: 50%; text-align: center;">1번 세로선</td>
			<td style="width: 50%; text-align: center;">2번 세로선</td>
		</tr>
	</tbody>
</table>

<p>사다리에 가로선을 추가해서, 사다리 게임의 결과를 조작하려고 한다. 이때, i번 세로선의 결과가 i번이 나와야 한다. 그렇게 하기 위해서 추가해야 하는 가로선 개수의 최솟값을 구하는 프로그램을 작성하시오.</p>

### 입력
<p>첫째 줄에 세로선의 개수 N, 가로선의 개수 M, 세로선마다 가로선을 놓을 수 있는 위치의 개수 H가 주어진다. (2 ≤ N ≤ 10, 1 ≤ H ≤ 30, 0 ≤ M ≤ (N-1)×H)</p>

<p>둘째 줄부터 M개의 줄에는 가로선의 정보가 한 줄에 하나씩 주어진다.</p>

<p>가로선의 정보는 두 정수 a과 b로 나타낸다. (1 ≤ a ≤ H, 1 ≤ b ≤ N-1) b번 세로선과 b+1번 세로선을 a번 점선 위치에서 연결했다는 의미이다.</p>

<p>가장 위에 있는 점선의 번호는 1번이고, 아래로 내려갈 때마다 1이 증가한다. 세로선은 가장 왼쪽에 있는 것의 번호가 1번이고, 오른쪽으로 갈 때마다 1이 증가한다.</p>

<p>입력으로 주어지는 가로선이 서로 연속하는 경우는 없다.</p>

### 출력
<p>i번 세로선의 결과가 i번이 나오도록 사다리 게임을 조작하려면, 추가해야 하는 가로선 개수의 최솟값을 출력한다. 만약, 정답이 3보다 큰 값이면 -1을 출력한다. 또, 불가능한 경우에도 -1을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 사다리 타는 함수 만들기 <br>
2. 어디에 사다리 둘 지 조합 만들기 

- *주의 !!* DFS의 깊이와 탐색 범위 <br>
깊이가 3일 때 답을 찾았다고 해서 탐색을 중단했는데, 사실 깊이가 1일 때도 이후 탐색 과정에서 더 최적의 답이 나올 수 있음을 간과 함 -> min 함수로 갱신하기

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M,H;
        static int[][] board, vis;
        static boolean chk(){
            for(int i=1; i<=N;i++){
                int h = 1;
                int y = i;
                while(h <= H){
                    if(board[h][y] == 1){
                        y+=1;
                    }else if(board[h][y-1] == 1){
                        y-=1;
                    }
                    h+=1;
                }
                if(y!=i){
                    return false;
                }
            }
            return true;
        }
        static int mn = Integer.MAX_VALUE;
        static void dfs(int k){
            if(1 == k || 2 == k){
                if(chk() == true){
                    mn = Math.min(mn,k);
                };
            }
            if(3 == k){
                if(chk() == true){
                    mn = Math.min(mn,k);
                };
                return;
            }
            for(int i=1;i<=H;i++){
                for(int j=1;j<N;j++){
                    if(board[i][j] == 1) continue;
                    board[i][j] = 1;
                    dfs(k+1);
                    board[i][j] = 0;
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            H = Integer.parseInt(st.nextToken());
            vis = new int[H+1][N+1];
            board = new int[H+1][N+1];
            for(int i=0;i<M;i++){
                st = new StringTokenizer(br.readLine());
                int a = Integer.parseInt(st.nextToken());
                int b = Integer.parseInt(st.nextToken());
                board[a][b] = 1;
            }
            if(chk()== true){
                System.out.println(0);
            }else{
                dfs(0);
                if(mn == Integer.MAX_VALUE){
                    System.out.println(-1);
                }else{
                    System.out.println(mn);
                }
                
            }
            
            
        }
    }
    ```
