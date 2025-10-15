- **문제** : 백준 16933번 - 벽 부수고 이동하기 3
- **난이도** : 골드 1
- **문제 유형** : bfs
- **푼 언어** : java

## 01. 문제 설명

<p>N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다. 최단경로는 맵에서 가장 적은 개수의 칸을 지나는 경로를 말하는데, 이때 시작하는 칸과 끝나는 칸도 포함해서 센다. 이동하지 않고 같은 칸에 머물러있는 경우도 가능하다. 이 경우도 방문한 칸의 개수가 하나 늘어나는 것으로 생각해야 한다.</p>

<p>이번 문제에서는 낮과 밤이 번갈아가면서 등장한다. 가장 처음에 이동할 때는 낮이고, 한 번 이동할 때마다 낮과 밤이 바뀌게 된다. 이동하지 않고 같은 칸에 머무르는 경우에도 낮과 밤이 바뀌게 된다.</p>

<p>만약에 이동하는 도중에 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 K개 까지 부수고 이동하여도 된다. 단, 벽은 낮에만 부술 수 있다.</p>

<p>한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.</p>

<p>맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000), K(1 ≤ K ≤ 10)이 주어진다. 다음 N개의 줄에 M개의 숫자로 맵이 주어진다. (1, 1)과 (N, M)은 항상 0이라고 가정하자.</p>

### 출력 

 <p>첫째 줄에 최단 거리를 출력한다. 불가능할 때는 -1을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. bfs로 q에 낮/밤, 몇번 벽 깼는지 까지 들고 이동<br>
2. 한번 대기 해야하는 곳은 어딘지 생각 -> dx,dy에서 빼기<br>

- *주의 !!* 무엇을 기준으로 분기할건지 <br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M,K;
        static int[][] board;
        static class Pair{
            int x, y, z, t;
            Pair(int x, int y, int z, int t){
                this.x = x;
                this.y = y;
                this.z = z;
                this.t = t;
            }
        }
        static int[] dx = {1,0,-1,0};
        static int[] dy = {0,1,0,-1};
        static int[][][][] vis;
        static int ans = -1;
        static Queue<Pair> q = new LinkedList<>();
        static void bfs(){
            while(!q.isEmpty()){
                Pair p = q.poll();
                if(p.x == (N-1) && p.y == (M-1)){
                    ans = vis[p.x][p.y][p.z][p.t];
                    break;
                }
                for(int dir =0; dir<4; dir++){
                    int nx = p.x + dx[dir];
                    int ny = p.y + dy[dir];
                    if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
                    if(board[nx][ny] == 0){
                        if(vis[nx][ny][1-p.z][p.t] == 0){
                            vis[nx][ny][1-p.z][p.t] = vis[p.x][p.y][p.z][p.t] + 1;
                            q.add(new Pair(nx,ny,1-p.z,p.t));
                        }
                    }else{
                        if(p.z == 0 && p.t < K && vis[nx][ny][1-p.z][p.t+1] == 0){
                            vis[nx][ny][1-p.z][p.t+1] = vis[p.x][p.y][p.z][p.t] + 1;
                            q.add(new Pair(nx,ny,1-p.z,p.t+1));
                        }
                    }
                }
                if(vis[p.x][p.y][1-p.z][p.t] == 0){
                    vis[p.x][p.y][1-p.z][p.t] = vis[p.x][p.y][p.z][p.t] + 1;
                    q.add(new Pair(p.x,p.y,1-p.z,p.t));
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            K = Integer.parseInt(st.nextToken());
            vis = new int[N][M][2][K+1];
            board = new int[N][M];
            for(int i=0;i<N;i++){
                String s = br.readLine();
                for(int j=0;j<M;j++){
                    board[i][j] = s.charAt(j) - '0';
                }
            }
            vis[0][0][0][0] = 1;
            q.add(new Pair(0,0,0,0));
            bfs();
            System.out.println(ans);
        }
    }
    ```
