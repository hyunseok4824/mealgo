- **문제** : 백준 1261번 - 알고스팟
- **난이도** : 골드 4
- **문제 유형** : Dijkstra
- **푼 언어** : java

## 01. 문제 설명

<p>알고스팟 운영진이 모두 미로에 갇혔다. 미로는 N*M 크기이며, 총 1*1크기의 방으로 이루어져 있다. 미로는 빈 방 또는 벽으로 이루어져 있고, 빈 방은 자유롭게 다닐 수 있지만, 벽은 부수지 않으면 이동할 수 없다.</p>

<p>알고스팟 운영진은 여러명이지만, 항상 모두 같은 방에 있어야 한다. 즉, 여러 명이 다른 방에 있을 수는 없다. 어떤 방에서 이동할 수 있는 방은 상하좌우로 인접한 빈 방이다. 즉, 현재 운영진이 (x, y)에 있을 때, 이동할 수 있는 방은 (x+1, y), (x, y+1), (x-1, y), (x, y-1) 이다. 단, 미로의 밖으로 이동 할 수는 없다.</p>

<p>벽은 평소에는 이동할 수 없지만, 알고스팟의 무기 AOJ를 이용해 벽을 부수어 버릴 수 있다. 벽을 부수면, 빈 방과 동일한 방으로 변한다.</p>

<p>만약 이 문제가 <a href="https://www.algospot.com">알고스팟</a>에 있다면, 운영진들은 궁극의 무기 sudo를 이용해 벽을 한 번에 다 없애버릴 수 있지만, 안타깝게도 이 문제는 <a href="https://www.acmicpc.net">Baekjoon Online Judge</a>에 수록되어 있기 때문에, sudo를 사용할 수 없다.</p>

<p>현재 (1, 1)에 있는 알고스팟 운영진이 (N, M)으로 이동하려면 벽을 최소 몇 개 부수어야 하는지 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 미로의 크기를 나타내는 가로 크기 M, 세로 크기 N (1 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 미로의 상태를 나타내는 숫자 0과 1이 주어진다. 0은 빈 방을 의미하고, 1은 벽을 의미한다.</p>

<p>(1, 1)과 (N, M)은 항상 뚫려있다.</p>

### 출력 

 <p>첫째 줄에 알고스팟 운영진이 (N, M)으로 이동하기 위해 벽을 최소 몇 개 부수어야 하는지 출력한다.</p>


## 02. 문제 풀이

방법<br>
1. 우선순위 큐에 (0, 시작점) 추가<br>
2. 거리가 가장 작은 원소 선택, 해당 거리가 최단 거리 테이블에 있는 값과 다를 경우 3번 continue<br>
3. 원소가 가리키는 정점을 v라고 할 때, v와 이웃한 정점들에 대해 최단 거리 테이블 값보다 v를 거쳐 가는 것이 더 작은 값을 가질 경우 최단 거리 테이블의 값을 갱신하고 우선순위 큐에 (거리, 이웃한 정점 좌표) 추가<br>
4. 우선순위 큐가 빌 때 까지 2,3 반복<br>


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int[] dx = {1,0,-1,0};
        static int[] dy = {0,1,0,-1};
        static class Pair{
            int x, y, z;
            Pair(int x, int y, int z){
                this.x = x;
                this.y = y;
                this.z = z;
            }
        }
        static int N,M;
        static int[][] board, dist;
        static PriorityQueue<Pair> pq = new PriorityQueue<>((o1,o2)->{
            return o1.x-o2.x;
        });
        static void dj(){
            while(!pq.isEmpty()){
                Pair p = pq.poll();
                if(p.x != dist[p.y][p.z]) continue;
                for(int dir = 0; dir < 4; dir++){
                    int nx = dx[dir] + p.y;
                    int ny = dy[dir] + p.z;
                    if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
                    if(p.x+board[nx][ny] >= dist[nx][ny]) continue;
                    dist[nx][ny] = p.x+board[nx][ny];
                    pq.add(new Pair(dist[nx][ny], nx, ny));
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            M = Integer.parseInt(st.nextToken());
            N = Integer.parseInt(st.nextToken());
            board = new int[N][M];
            dist = new int[N][M];
            for(int i=0;i<N;i++){
                Arrays.fill(dist[i],Integer.MAX_VALUE);
            }
            for(int i=0;i<N;i++){
                String s = br.readLine();
                for(int j=0;j<M;j++){
                    board[i][j] = s.charAt(j) - '0';
                }
            }
            dist[0][0] = 0;
            pq.add(new Pair(0,0,0));
            dj();
            System.out.print(dist[N-1][M-1]);
        }
    }
    ```

*주의 !!* BFS 가중치 -> 다익스트라 <br>
- 유형 몰랐으면 말이 되고픈 원숭이 처럼 풀려고 했을 듯<br>
- 가중치 있냐 없냐 -> 0-1 BFS & 다익스트라<br>

*비슷한 문제*<br>
- 이차원 배열에서의 다익스트라 -> 젤다 문제<br>
- 0-1 bfs -> 숨바꼭질 3 문제<br>