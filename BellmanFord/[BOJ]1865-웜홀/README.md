- **문제** : 백준 1865번 - 웜홀
- **난이도** : 골드 3
- **문제 유형** : 벨만–포드
- **푼 언어** : java

## 01. 문제 설명

<p>때는 2020년, 백준이는 월드나라의 한 국민이다. 월드나라에는 N개의 지점이 있고 N개의 지점 사이에는 M개의 도로와 W개의 웜홀이 있다. (단 도로는 방향이 없으며 웜홀은 방향이 있다.) 웜홀은 시작 위치에서 도착 위치로 가는 하나의 경로인데, 특이하게도 도착을 하게 되면 시작을 하였을 때보다 시간이 뒤로 가게 된다. 웜홀 내에서는 시계가 거꾸로 간다고 생각하여도 좋다.</p>

<p>시간 여행을 매우 좋아하는 백준이는 한 가지 궁금증에 빠졌다. 한 지점에서 출발을 하여서 시간여행을 하기 시작하여 다시 출발을 하였던 위치로 돌아왔을 때, 출발을 하였을 때보다 시간이 되돌아가 있는 경우가 있는지 없는지 궁금해졌다. 여러분은 백준이를 도와 이런 일이 가능한지 불가능한지 구하는 프로그램을 작성하여라.</p>

### 입력 

 <p>첫 번째 줄에는 테스트케이스의 개수 TC(1 ≤ TC ≤ 5)가 주어진다. 그리고 두 번째 줄부터 TC개의 테스트케이스가 차례로 주어지는데 각 테스트케이스의 첫 번째 줄에는 지점의 수 N(1 ≤ N ≤ 500), 도로의 개수 M(1 ≤ M ≤ 2500), 웜홀의 개수 W(1 ≤ W ≤ 200)이 주어진다. 그리고 두 번째 줄부터 M+1번째 줄에 도로의 정보가 주어지는데 각 도로의 정보는 S, E, T 세 정수로 주어진다. S와 E는 연결된 지점의 번호, T는 이 도로를 통해 이동하는데 걸리는 시간을 의미한다. 그리고 M+2번째 줄부터 M+W+1번째 줄까지 웜홀의 정보가 S, E, T 세 정수로 주어지는데 S는 시작 지점, E는 도착 지점, T는 줄어드는 시간을 의미한다. T는 10,000보다 작거나 같은 자연수 또는 0이다.</p>

<p>두 지점을 연결하는 도로가 한 개보다 많을 수도 있다. 지점의 번호는 1부터 N까지 자연수로 중복 없이 매겨져 있다.</p>

### 출력 

 <p>TC개의 줄에 걸쳐서 만약에 시간이 줄어들면서 출발 위치로 돌아오는 것이 가능하면 YES, 불가능하면 NO를 출력한다.</p>

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
            static int TC, N, M, W;
            static class Pair{
                int x, y;
                Pair(int x, int y){
                    this.x = x;
                    this.y = y;
                }
            }
            static long[] dist;
            static boolean isC;
            static ArrayList<Pair>[] adj;
            static long INF = Long.MAX_VALUE;
            public static void main(String[] args) throws IOException {
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                TC = Integer.parseInt(br.readLine());
                while(TC-- > 0){
                    StringTokenizer st = new StringTokenizer(br.readLine());
                    N = Integer.parseInt(st.nextToken());
                    M = Integer.parseInt(st.nextToken());
                    W = Integer.parseInt(st.nextToken());
                    dist = new long[N+1];
                    adj = new ArrayList[N+1];
                    for(int i=1;i<=N;i++){
                        adj[i] = new ArrayList<>();
                    }
                    for(int i=0;i<M;i++){
                        st = new StringTokenizer(br.readLine());
                        int s = Integer.parseInt(st.nextToken());
                        int e = Integer.parseInt(st.nextToken());
                        int t = Integer.parseInt(st.nextToken());
                        adj[s].add(new Pair(e,t));
                        adj[e].add(new Pair(s,t));
                    }
                    for(int i=0;i<W;i++){
                        st = new StringTokenizer(br.readLine());
                        int s = Integer.parseInt(st.nextToken());
                        int e = Integer.parseInt(st.nextToken());
                        int t = Integer.parseInt(st.nextToken());
                        adj[s].add(new Pair(e,-1*t)); 
                    }
                    isC = false;
                    for(int i=0;i<N;i++){
                        for(int here = 1; here<=N; here++){
                            for(Pair p : adj[here]){
                                int to = p.x;
                                int d = p.y;
                                if(dist[here] + d < dist[to]){
                                    if(i==N-1){
                                        isC = true;
                                    }
                                    dist[to] = dist[here] + d;
                                }
                            }
                        }
                    }
                    System.out.println(isC ? "YES" : "NO");
                }
            }
        }
    ```
    ``` javascript
    const fs = require('fs')
    const filePath = process.platform === 'linux' ? 'dev/stdin' : '1865_input.txt'
    const input = fs.readFileSync(filePath).toString().trim().split('\n')

    let idx = 0
    let TC = Number(input[idx++])
    let answer = ''

    const bellmanFord = (N, edgeList) => {

    const dist = Array(N + 1).fill(0)

    for (let i = 1; i <= N; i++) {
        let updated = false
        for (const [s, e, cost] of edgeList) {
        if (dist[e] > dist[s] + cost) {
            dist[e] = dist[s] + cost
            updated = true

            if (i === N-1) {
            return 'YES'
            }
        }
        }

        if (!updated) break
    }

    return 'NO'
    }

    while (TC--) {
    let [N, M, W] = input[idx++].split(' ').map(Number)
    const edges = []

    while (M--) {
        const [start, end, cost] = input[idx++].split(' ').map(Number)
        edges.push([start, end, cost])
        edges.push([end, start, cost])
    }

    while (W--) {
        const [start, end, cost] = input[idx++].split(' ').map(Number)
        edges.push([start, end, -cost])
    }

    answer += bellmanFord(N, edges) + '\n'
    }

    console.log(answer.trim())

    ```
# 03. 회고
- *주의 !!* dist를 INF로 초기화 안해도 되는 이유<br>
- 백준 11657번 참고
- 11657은 1번 정점에서 다른 정점까지의 최단거리를 계산해야하고, 1번 정점에서 갈 수 없는 곳도 알아야함<br>
- 웜홀 문제는 음수 사이클이 있는 지만 판별하면 됨<br>
<br>
- 아직 벨만포드 이해가 잘 안된다. 좀 더 공부해야겠다. (현석)