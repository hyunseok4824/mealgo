- **문제** : 백준 5719번 - 거의 최단 경로
- **난이도** : 플레 5
- **문제 유형** : Dijkstra
- **푼 언어** : java

## 01. 문제 설명

<p>요즘 많은 자동차에서는 GPS 네비게이션 장비가 설치되어 있다. 네비게이션은 사용자가 입력한 출발점과 도착점 사이의 최단 경로를 검색해 준다. 하지만, 교통 상황을 고려하지 않고 최단 경로를 검색하는 경우에는 극심한 교통 정체를 경험할 수 있다.</p>

<p>상근이는 오직 자기 자신만 사용 가능한 네비게이션을 만들고 있다. 이 네비게이션은 절대로 최단 경로를 찾아주지 않는다. 항상 거의 최단 경로를 찾아준다.</p>

<p>거의 최단 경로란 최단 경로에 포함되지 않는 도로로만 이루어진 경로 중 가장 짧은 것을 말한다. </p>

<p>예를 들어, 도로 지도가 아래와 같을 때를 생각해보자. 원은 장소를 의미하고, 선은 단방향 도로를 나타낸다. 시작점은 S, 도착점은 D로 표시되어 있다. 굵은 선은 최단 경로를 나타낸다. (아래 그림에 최단 경로는 두 개가 있다)거의 최단 경로는 점선으로 표시된 경로이다. 이 경로는 최단 경로에 포함되지 않은 도로로 이루어진 경로 중 가장 짧은 경로이다. 거의 최단 경로는 여러 개 존재할 수도 있다. 예를 들어, 아래 그림의 길이가 3인 도로의 길이가 1이라면, 거의 최단 경로는 두 개가 된다. 또, 거의 최단 경로가 없는 경우도 있다.</p>

<p><img alt="" src="https://www.acmicpc.net/upload/images/almost.png" style="height:174px; width:265px"></p>

### 입력 

 <p>입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫째 줄에는 장소의 수 N (2 ≤ N ≤ 500)과 도로의 수 M (1 ≤ M ≤ 10<sup>4</sup>)가 주어진다. 장소는 0부터 N-1번까지 번호가 매겨져 있다. 둘째 줄에는 시작점 S와 도착점 D가 주어진다. (S ≠ D; 0 ≤ S, D < N) 다음 M개 줄에는 도로의 정보 U, V, P가 주어진다. (U ≠ V ; 0 ≤ U, V < N; 1 ≤ P ≤ 10<sup>3</sup>) 이 뜻은 U에서 V로 가는 도로의 길이가 P라는 뜻이다. U에서 V로 가는 도로는 최대 한 개이다. 또, U에서 V로 가는 도로와 V에서 U로 가는 도로는 다른 도로이다. </p>

<p>입력의 마지막 줄에는 0이 두 개 주어진다.</p>

### 출력 

 <p>각 테스트 케이스에 대해서, 거의 최단 경로의 길이를 출력한다. 만약, 거의 최단 경로가 없는 경우에는 -1을 출력한다.</p>


## 02. 문제 풀이

방법<br>
1. 다익스트라로 최단 경로 계산<br>
2. 역추적<br>
3. 역추적하면서 removed 배열에 최단 경로 간선 저장<br>
4. removed 배열 제외하고 최단 경로 다익스트라로 또 한번 계산<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M,S,D;
        static class Pair{
            int x,y,z;
            Pair(int x, int y, int z){
                this.x = x;
                this.y = y;
                this.z = z;
            }
            Pair(int x, int y){
                this.x = x;
                this.y = y;
            }
        }
        static boolean[][] removed;
        static ArrayList<Integer>[] pre;
        static ArrayList<Pair>[] adj;
        static PriorityQueue<Pair> pq;
        static int[] dist;
        static void removeP(){
            Queue<Integer> q = new LinkedList<>();
            boolean[] vis = new boolean[N];
            
            q.add(D);
            vis[D] = true;
            
            while(!q.isEmpty()){
                int v = q.poll();
                for(int u : pre[v]){
                    if(removed[u][v] == false){
                        removed[u][v] = true;
                        if(!vis[u]){
                            vis[u] = true;
                            q.add(u);
                        }
                    }
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            while(true){
                StringTokenizer st = new StringTokenizer(br.readLine());
                N = Integer.parseInt(st.nextToken());
                M = Integer.parseInt(st.nextToken());
                if(N == 0 && M == 0){
                    break;
                }
                pq = new PriorityQueue<Pair>((o1,o2)->{
                    return o1.x - o2.x;
                });
                dist = new int[N];
                adj = new ArrayList[N];
                pre = new ArrayList[N];
                removed = new boolean[N][N];
                for(int i=0;i<N;i++){
                    dist[i] = Integer.MAX_VALUE;
                    adj[i] = new ArrayList<>();
                    pre[i] = new ArrayList<>();
                }
                st = new StringTokenizer(br.readLine());
                S = Integer.parseInt(st.nextToken());
                D = Integer.parseInt(st.nextToken());
                dist[S] = 0;
                pq.add(new Pair(0,S));
                for(int i=0;i<M;i++){
                    st = new StringTokenizer(br.readLine());
                    int U = Integer.parseInt(st.nextToken());
                    int V = Integer.parseInt(st.nextToken());
                    int P = Integer.parseInt(st.nextToken());
                    adj[U].add(new Pair(V,P));
                }
                while(!pq.isEmpty()){
                    Pair p = pq.poll();
                    if(dist[p.y] != p.x) continue;
                    for(Pair nxt : adj[p.y]){
                        if(dist[nxt.x] > dist[p.y] + nxt.y){
                            dist[nxt.x] = dist[p.y] + nxt.y;
                            pq.add(new Pair(dist[nxt.x],nxt.x));
                            pre[nxt.x].clear();
                            pre[nxt.x].add(p.y);
                        }else if(dist[nxt.x] == dist[p.y] + nxt.y){
                            pre[nxt.x].add(p.y);
                        }
                    }
                }
                removeP();
                Arrays.fill(dist,Integer.MAX_VALUE);
                dist[S] = 0;
                pq.add(new Pair(0,S));
                while(!pq.isEmpty()){
                    Pair p = pq.poll();
                    if(dist[p.y] != p.x) continue;
                    for(Pair nxt : adj[p.y]){
                        if(removed[p.y][nxt.x]) continue;
                        if(dist[nxt.x] > dist[p.y] + nxt.y){
                            dist[nxt.x] = dist[p.y] + nxt.y;
                            pq.add(new Pair(dist[nxt.x],nxt.x));
                        }
                    }
                }
                int ans = dist[D];
                if(ans == Integer.MAX_VALUE){
                    ans = -1;
                }
                System.out.println(ans);
            }
        }
    }
    ```

03. 회고 
- 역추적 할 떄 큐 써서 bfs + 제외할 간선 remove 배열쓰기 늘 하던건데 또 생각을 못했다.. 하아