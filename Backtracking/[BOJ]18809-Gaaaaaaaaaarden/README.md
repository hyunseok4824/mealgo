- **문제** : 백준 18809번 - Gaaaaaaaaaarden
- **난이도** : 골드 1
- **문제 유형** : 백트래킹
- **푼 언어** : java

## 01. 문제 설명

<p>길고 길었던 겨울이 끝나고 BOJ 마을에도 봄이 찾아왔다. BOJ 마을에서는 꽃을 마을 소유의 정원에 피우려고 한다. 정원은 땅과 호수로 이루어져 있고 2차원 격자판 모양이다.</p>

<p>인건비 절감을 위해 BOJ 마을에서는 직접 사람이 씨앗을 심는 대신 초록색 배양액과 빨간색 배양액을 땅에 적절하게 뿌려서 꽃을 피울 것이다. 이 때 배양액을 뿌릴 수 있는 땅은 미리 정해져있다.</p>

<p>배양액은 매 초마다 이전에 배양액이 도달한 적이 없는 인접한 땅으로 퍼져간다.</p>

<p>아래는 초록색 배양액 2개를 뿌렸을 때의 예시이다. 하얀색 칸은 배양액을 뿌릴 수 없는 땅을, 황토색 칸은 배양액을 뿌릴 수 있는 땅을, 하늘색 칸은 호수를 의미한다.</p>

<p style="text-align: center;"><img alt="" src="https://upload.acmicpc.net/6c58580b-a750-4824-a9a0-2dd79eab545b/-/preview/"></p>

<p>초록색 배양액과 빨간색 배양액이 동일한 시간에 도달한 땅에서는 두 배양액이 합쳐져서 꽃이 피어난다. 꽃이 피어난 땅에서는 배양액이 사라지기 때문에 더 이상 인접한 땅으로 배양액을 퍼트리지 않는다.</p>

<p>아래는 초록색 배양액 2개와 빨간색 배양액 2개를 뿌렸을 때의 예시이다.</p>

<p style="text-align: center;"><img alt="" src="https://upload.acmicpc.net/f396d82b-ce1d-42f6-a43b-49ddff720d64/-/preview/"></p>

<p>배양액은 봄이 지나면 사용할 수 없게 되므로 주어진 모든 배양액을 남김없이 사용해야 한다. 예를 들어 초록색 배양액 2개와 빨간색 배양액 2개가 주어졌는데 초록색 배양액 1개를 땅에 뿌리지 않고, 초록색 배양액 1개와 빨간색 배양액 2개만을 사용하는 것은 불가능하다.</p>

<p>또한 모든 배양액은 서로 다른 곳에 뿌려져야 한다.</p>

<p>정원과 두 배양액의 개수가 주어져있을 때 피울 수 있는 꽃의 최대 개수를 구해보자.</p>

### 입력 

 <p>첫째 줄에 정원의 행의 개수와 열의 개수를 나타내는 N(2 ≤ N ≤ 50)과 M(2 ≤ M ≤ 50), 그리고 초록색 배양액의 개수 G(1 ≤ G ≤ 5)와 빨간색 배양액의 개수 R(1 ≤ R ≤ 5)이 한 칸의 빈칸을 사이에 두고 주어진다.</p>

<p>그 다음 N개의 줄에는 각 줄마다 정원의 각 행을 나타내는 M개의 정수가 한 개의 빈 칸을 사이에 두고 주어진다. 각 칸에 들어가는 값은 0, 1, 2이다. 0은 호수, 1은 배양액을 뿌릴 수 없는 땅, 2는 배양액을 뿌릴 수 있는 땅을 의미한다.</p>

<p>배양액을 뿌릴 수 있는 땅의 수는 R+G개 이상이고 10개 이하이다.</p>

### 출력 

 <p>첫째 줄에 피울 수 있는 꽃의 최대 개수를 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. dfs로 빨간색 씨앗, 초록색 씨앗 조합으로 나눔<br>
2. bfs를 동시에 돌림 -> 큐에 씨앗 다 넣고 q에 씨앗 색깔, 시간 까지 같이 넣고 한번에 돌린다<br>
3. 분기 처리 많이 해야함<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main {
        static class Pair {
            int x, y, z, t;

            Pair(int x, int y, int z, int t) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.t = t;
            }
            Pair(int x, int y) {
                this.x = x;
                this.y = y;
            }
        }

        static int N, M, G, R, all, ans;
        static int[][] board, tmpboard;
        static int[] GG, RR;
        static int[] dx = { 1, 0, -1, 0 };
        static int[] dy = { 0, 1, 0, -1 };
        static ArrayList<Pair> alst = new ArrayList<>();
        static Queue<Pair> q = new LinkedList<>();
        static int[][] time = new int[N][M];
        static int[][] color;
        static int flower = 0;

        static void bfs() {
            flower = 0;
            while (!q.isEmpty()) {
                Pair cur = q.poll();
                int curx = cur.x;
                int cury = cur.y;
                int curcol = cur.z;
                int curt = cur.t;
                if (color[curx][cury] == 3)
                    continue;
                for (int dir = 0; dir < 4; dir++) {
                    int nx = dx[dir] + curx;
                    int ny = dy[dir] + cury;
                    if (nx < 0 || ny < 0 || nx >= N || ny >= M)
                        continue;
                    if (board[nx][ny] == 0)
                        continue;
                    if (time[nx][ny] == -1) {
                        time[nx][ny] = curt + 1;
                        color[nx][ny] = curcol;
                        q.add(new Pair(nx, ny, curcol, curt + 1));
                    } else {
                        if (time[nx][ny] == (curt + 1) && color[nx][ny] != curcol && color[nx][ny] != 3) {
                            color[nx][ny] = 3;
                            flower += 1;
                        }
                    }
                }
            }
        }

        static void dfs(int k, int rR, int rG, int sts) {
            if (k == all) {
                if (rR != R || rG != G) return;
                time = new int[N][M];
                color = new int[N][M];
                q = new LinkedList<>();
                for (int i = 0; i < N; i++) {
                    Arrays.fill(time[i], -1);
                }
                for (int i = 0; i < rR; i++) {
                    Pair p = alst.get(RR[i]);
                    color[p.x][p.y] = 2;
                    time[p.x][p.y] = 0;
                    q.add(new Pair(p.x, p.y, 2, 0));
                }
                for (int i = 0; i < rG; i++) {
                    Pair p = alst.get(GG[i]);
                    color[p.x][p.y] = 1;
                    time[p.x][p.y] = 0;
                    q.add(new Pair(p.x, p.y, 1, 0));
                }
                bfs();
                ans = Math.max(ans, flower);
                return;
            }
            for (int i = sts; i < alst.size(); i++) {
                if (rR < R) {
                    RR[rR] = i;
                    dfs(k + 1, rR + 1, rG, i + 1);
                }
                if (rG < G) {
                    GG[rG] = i;
                    dfs(k + 1, rR, rG + 1, i + 1);
                }
            }
        }

        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            G = Integer.parseInt(st.nextToken());
            R = Integer.parseInt(st.nextToken());
            board = new int[N][M];
            all = G + R;
            for (int i = 0; i < N; i++) {
                st = new StringTokenizer(br.readLine());
                for (int j = 0; j < M; j++) {
                    board[i][j] = Integer.parseInt(st.nextToken());
                    if (board[i][j] == 2) {
                        alst.add(new Pair(i, j));
                    }
                }
            }
            RR = new int[R];
            GG = new int[G];
            dfs(0, 0, 0, 0);
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
*주의 !!* dfs 조합인데 그 안에서 그룹 분리하는 것 / bfs 동시에 돌리기<br>
- 불이랑 비슷한데 이건 동시에 돌려야함 <br>
- dfs 그룹1, 그룹2 카운트 같이 하면서 조합 돌리기<br>
- k == all 할 때 그룹1, 그룹2 각각 갯수 맞는 지 확인하는 과정 거쳐야함<br>
