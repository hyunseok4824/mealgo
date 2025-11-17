- **문제** : 백준 1162번 - 도로포장
- **난이도** : 플레 5
- **문제 유형** : Dijkstra + dp
- **푼 언어** : java

## 01. 문제 설명

<p>준영이는 매일 서울에서 포천까지 출퇴근을 한다. 하지만 잠이 많은 준영이는 늦잠을 자 포천에 늦게 도착하기 일쑤다. 돈이 많은 준영이는 고민 끝에 K개의 도로를 포장하여 서울에서 포천까지 가는 시간을 단축하려 한다.</p>

<p>문제는 N개의 도시가 주어지고 그 사이 도로와 이 도로를 통과할 때 걸리는 시간이 주어졌을 때 최소 시간이 걸리도록 하는 K개의 이하의 도로를 포장하는 것이다. 도로는 이미 있는 도로만 포장할 수 있고, 포장하게 되면 도로를 지나는데 걸리는 시간이 0이 된다. 또한 편의상 서울은 1번 도시, 포천은 N번 도시라 하고 1번에서 N번까지 항상 갈 수 있는 데이터만 주어진다.</p>

### 입력 

 <p>첫 줄에는 도시의 수 N(1 ≤ N ≤ 10,000)과 도로의 수 M(1 ≤ M ≤ 50,000)과 포장할 도로의 수 K(1 ≤ K ≤ 20)가 공백으로 구분되어 주어진다. M개의 줄에 대해 도로가 연결하는 두 도시와 도로를 통과하는데 걸리는 시간이 주어진다. 도로들은 양방향 도로이며, 걸리는 시간은 1,000,000보다 작거나 같은 자연수이다.</p>

### 출력 

 <p>첫 줄에 K개 이하의 도로를 포장하여 얻을 수 있는 최소 시간을 출력한다.</p>


## 02. 문제 풀이

방법<br>
1. dist 배열을 2차원으로 두고, 도로를 포장하고, 포장 안하고 계산하면서 다익스트라<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main

    {   
        static long INF = Long.MAX_VALUE;
        static class Pair{
            int x;
            long y;
            Pair(int x, long y){
                this.x = x;
                this.y = y;
            }
        }
        static class Triple{
            int y,z;
            long x;
            Triple(long x, int y, int z){
                this.x = x;
                this.y = y;
                this.z = z;
            }
        }
        static ArrayList<Pair>[] adj;
        static long[][] dist;
        static PriorityQueue<Triple> pq = new PriorityQueue<>((o1,o2)->{
            return Long.compare(o1.x,o2.x);
        });
        static int N,M,K;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            K = Integer.parseInt(st.nextToken());
            adj = new ArrayList[N+1];
            for(int i=1;i<=N;i++){
                adj[i] = new ArrayList<>();
            }
            dist = new long[N+1][K+1];
            for(int i=0;i<=N;i++){
                Arrays.fill(dist[i], INF);
            }
            for(int i=0;i<M;i++){
                st = new StringTokenizer(br.readLine());
                int u = Integer.parseInt(st.nextToken());
                int v = Integer.parseInt(st.nextToken());
                int d = Integer.parseInt(st.nextToken());
                adj[u].add(new Pair(v,d));
                adj[v].add(new Pair(u,d));
            }
            dist[1][0] = 0;
            pq.add(new Triple(0,1,0));
            while(!pq.isEmpty()){
                Triple cur = pq.poll();
                if(cur.x != dist[cur.y][cur.z]) continue;
                for(Pair nxt : adj[cur.y]){
                    if(dist[nxt.x][cur.z] > nxt.y + cur.x){
                        dist[nxt.x][cur.z] = nxt.y + cur.x;
                        pq.add(new Triple(dist[nxt.x][cur.z], nxt.x, cur.z));
                    }
                    if(cur.z < K && dist[nxt.x][cur.z + 1] > cur.x){
                        dist[nxt.x][cur.z + 1] = cur.x;
                        pq.add(new Triple(dist[nxt.x][cur.z + 1] , nxt.x, cur.z+1));
                    }
                }
            }
            long mx = Long.MAX_VALUE;
            for(int i=0;i<=K;i++){
                mx = Math.min(mx, dist[N][i]);
            }
            System.out.println(mx);
        }
    }
    ```

*주의 !!* 오버플로우 주의 <br>

*비슷한 문제*<br>
- dp + 다익스트라 -> 말이 되고픈 원숭이 문제<br>