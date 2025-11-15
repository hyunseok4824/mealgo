- **문제** : 백준 11657번 - 타임머신 
- **난이도** : 골드 4
- **문제 유형** : 벨만–포드
- **푼 언어** : java

## 01. 문제 설명

<p>N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 버스가 M개 있다. 각 버스는 A, B, C로 나타낼 수 있는데, A는 시작도시, B는 도착도시, C는 버스를 타고 이동하는데 걸리는 시간이다. 시간 C가 양수가 아닌 경우가 있다. C = 0인 경우는 순간 이동을 하는 경우, C < 0인 경우는 타임머신으로 시간을 되돌아가는 경우이다.</p>

<p>1번 도시에서 출발해서 나머지 도시로 가는 가장 빠른 시간을 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 도시의 개수 N (1 ≤ N ≤ 500), 버스 노선의 개수 M (1 ≤ M ≤ 6,000)이 주어진다. 둘째 줄부터 M개의 줄에는 버스 노선의 정보 A, B, C (1 ≤ A, B ≤ N, -10,000 ≤ C ≤ 10,000)가 주어진다. </p>

### 출력 

 <p>만약 1번 도시에서 출발해 어떤 도시로 가는 과정에서 시간을 무한히 오래 전으로 되돌릴 수 있다면 첫째 줄에 -1을 출력한다. 그렇지 않다면 N-1개 줄에 걸쳐 각 줄에 1번 도시에서 출발해 2번 도시, 3번 도시, ..., N번 도시로 가는 가장 빠른 시간을 순서대로 출력한다. 만약 해당 도시로 가는 경로가 없다면 대신 -1을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 최단 경로 갱신 : 모든 간선을 V-1번 반복 검사, 현재 경로가 기존 경로보다 짧다면 해당 경로로 완화 <br>
2. 음수 사이클 확인 : 최단 경로가 확정된 후에도, 다시 모든 간선을 검사하여 최단 경로가 더 짧아지는 경로가 있다면, 이는 음수 사이클이 존재함을 의미 <br>

    <코드>
    ```java
        import java.util.*;
        import java.io.*;

        public class Main
        {
            static int N, M;
            static class Pair{
                int x,y;
                Pair(int x, int y){
                    this.x = x;
                    this.y = y;
                }
            }
            static boolean isC = false;
            static long[] dist;
            static ArrayList<Integer> alst = new ArrayList<>();
            static long INF = Long.MAX_VALUE;
            static ArrayList<Pair>[] adj;
            public static void main(String[] args) throws IOException {
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                StringTokenizer st = new StringTokenizer(br.readLine());
                N = Integer.parseInt(st.nextToken());
                M = Integer.parseInt(st.nextToken());
                adj = new ArrayList[N+1];
                for(int i=1;i<=N;i++){
                    adj[i] = new ArrayList<>();
                }
                for(int i=0;i<M;i++){
                    st = new StringTokenizer(br.readLine());
                    int a = Integer.parseInt(st.nextToken());
                    int b = Integer.parseInt(st.nextToken());
                    int c = Integer.parseInt(st.nextToken());
                    adj[a].add(new Pair(b,c));
                }
                dist = new long[N+1];
                Arrays.fill(dist, INF);
                dist[1] = 0;
                for(int i=0;i<N;i++){
                    for(int here = 1; here <= N; here++){
                        for(Pair p : adj[here]){
                            int to = p.x;
                            int nxtd = p.y;
                            if(dist[here] != INF && dist[to] > dist[here] + (long) nxtd){
                                if(i == N-1){
                                    isC = true;
                                    alst.add(to);
                                }
                                dist[to] = dist[here] + (long) nxtd;
                            }
                        }
                    }
                }
                if(isC){
                    System.out.println("-1");
                    return;
                }
                for(int i = 2; i<dist.length;i++){
                    if(dist[i] == INF){
                        System.out.println("-1");
                    }else{
                        System.out.println(dist[i]);
                    }
                }
            }
        }
    ```
# 03. 회고
- *주의 !!* 오버플로우 주의 <br>
음수 간선 계속 되면 30억 이므로 long 타입 해야함
