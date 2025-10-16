- **문제** : 백준 2146번 - 다리 만들기
- **난이도** : 골드 3
- **문제 유형** : bfs
- **푼 언어** : java

## 01. 문제 설명

<p>여러 섬으로 이루어진 나라가 있다. 이 나라의 대통령은 섬을 잇는 다리를 만들겠다는 공약으로 인기몰이를 해 당선될 수 있었다. 하지만 막상 대통령에 취임하자, 다리를 놓는다는 것이 아깝다는 생각을 하게 되었다. 그래서 그는, 생색내는 식으로 한 섬과 다른 섬을 잇는 다리 하나만을 만들기로 하였고, 그 또한 다리를 가장 짧게 하여 돈을 아끼려 하였다.</p>

<p>이 나라는 N×N크기의 이차원 평면상에 존재한다. 이 나라는 여러 섬으로 이루어져 있으며, 섬이란 동서남북으로 육지가 붙어있는 덩어리를 말한다. 다음은 세 개의 섬으로 이루어진 나라의 지도이다.</p>

<p style="text-align: center;"><img alt="" height="225" src="https://www.acmicpc.net/JudgeOnline/upload/201008/bri.PNG" width="243"></p>

<p>위의 그림에서 색이 있는 부분이 육지이고, 색이 없는 부분이 바다이다. 이 바다에 가장 짧은 다리를 놓아 두 대륙을 연결하고자 한다. 가장 짧은 다리란, 다리가 격자에서 차지하는 칸의 수가 가장 작은 다리를 말한다. 다음 그림에서 두 대륙을 연결하는 다리를 볼 수 있다.</p>

<p style="text-align: center;"><img alt="" height="220" src="https://www.acmicpc.net/JudgeOnline/upload/201008/b2.PNG" width="247"></p>

<p>물론 위의 방법 외에도 다리를 놓는 방법이 여러 가지 있으나, 위의 경우가 놓는 다리의 길이가 3으로 가장 짧다(물론 길이가 3인 다른 다리를 놓을 수 있는 방법도 몇 가지 있다).</p>

<p>지도가 주어질 때, 가장 짧은 다리 하나를 놓아 두 대륙을 연결하는 방법을 찾으시오.</p>

### 입력 

 <p>첫 줄에는 지도의 크기 N(100이하의 자연수)가 주어진다. 그 다음 N줄에는 N개의 숫자가 빈칸을 사이에 두고 주어지며, 0은 바다, 1은 육지를 나타낸다. 항상 두 개 이상의 섬이 있는 데이터만 입력으로 주어진다.</p>

### 출력 

 <p>첫째 줄에 가장 짧은 다리의 길이를 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. dfs로 섬을 라벨링하기<br>
2. 각 섬의 가장자리에서 다른 섬까지 최단거리 bfs 로 구하기<br> 

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N;
        static int[][] board;
        static int[][] vis, dist;
        static int[] dx = {1,0,-1,0};
        static int[] dy = {0,1,0,-1};
        static void dfs(int curx, int cury, int k){
            board[curx][cury] = k;
            for(int dir = 0; dir < 4; dir++){
                int nx = curx + dx[dir];
                int ny = cury + dy[dir];
                if(nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
                if(vis[nx][ny] != 0 || board[nx][ny] == 0) continue;
                    vis[nx][ny] = 1;
                    board[nx][ny] = k;
                    dfs(nx,ny,k);
            }
        }
        
        static class Pair{
            int x, y;
            Pair(int x, int y){
                this.x = x;
                this.y = y;
            }
        }
        static int ans = Integer.MAX_VALUE;
        static Queue<Pair> q = new LinkedList<>();
        static void bfs(int curc){
            while(!q.isEmpty()){
                Pair cur = q.poll();
                if(board[cur.x][cur.y] != 0 && board[cur.x][cur.y] != curc){
                    ans = Math.min(ans,(dist[cur.x][cur.y]));
                    return;
                }
                for(int dir = 0; dir < 4; dir++){
                    int nx = dx[dir] + cur.x;
                    int ny = dy[dir] + cur.y;
                    if(nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
                    if(dist[nx][ny] >= 2) continue;
                    if(board[nx][ny] == curc) continue;
                    dist[nx][ny] = dist[cur.x][cur.y] + 1;
                    q.add(new Pair(nx,ny));
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            board = new int[N][N];
            vis = new int[N][N];
            for(int i=0;i<N;i++){
                StringTokenizer st = new StringTokenizer(br.readLine());
                for(int j=0;j<N;j++){
                    board[i][j] = Integer.parseInt(st.nextToken());
                }
            }
            int ks = 2;
            for(int i=0;i<N;i++){
                for(int j=0;j<N;j++){
                    if(board[i][j] == 0 || vis[i][j] == 1) continue;
                    dfs(i,j,ks);
                    ks+=1;
                }
            }
            dist = new int[N][N];
            for(int i=0;i<N;i++){
                for(int j=0;j<N;j++){
                    int tmpc = board[i][j];
                    if(tmpc != 0){
                        q = new LinkedList<>();
                        dist = new int[N][N];
                        dist[i][j] = 1;
                        q.add(new Pair(i,j));
                        bfs(tmpc);
                    }
                }
            }
    
            System.out.println(ans-2);
        }
    }
    ```

## 03. 회고
- *주의 !!*
1. 라벨링 하는 아이디어<br>
2. 분기 처리 꼼꼼하게<br>
3. 멀티 bfs 까먹지 말기<br>
4. 초기값, 초기화 신경 쓰기<br>