- **문제** : 백준 1766번 - 문제집
- **난이도** : 골드 3
- **문제 유형** : 위상정렬
- **푼 언어** : java

## 01. 문제 설명

<p>민오는 1번부터 N번까지 총 N개의 문제로 되어 있는 문제집을 풀려고 한다. 문제는 난이도 순서로 출제되어 있다. 즉 1번 문제가 가장 쉬운 문제이고 N번 문제가 가장 어려운 문제가 된다.</p>

<p>어떤 문제부터 풀까 고민하면서 문제를 훑어보던 민오는, 몇몇 문제들 사이에는 '먼저 푸는 것이 좋은 문제'가 있다는 것을 알게 되었다. 예를 들어 1번 문제를 풀고 나면 4번 문제가 쉽게 풀린다거나 하는 식이다. 민오는 다음의 세 가지 조건에 따라 문제를 풀 순서를 정하기로 하였다.</p>

<ol>
	<li>N개의 문제는 모두 풀어야 한다.</li>
	<li>먼저 푸는 것이 좋은 문제가 있는 문제는, 먼저 푸는 것이 좋은 문제를 반드시 먼저 풀어야 한다.</li>
	<li>가능하면 쉬운 문제부터 풀어야 한다.</li>
</ol>

<p>예를 들어서 네 개의 문제가 있다고 하자. 4번 문제는 2번 문제보다 먼저 푸는 것이 좋고, 3번 문제는 1번 문제보다 먼저 푸는 것이 좋다고 하자. 만일 4-3-2-1의 순서로 문제를 풀게 되면 조건 1과 조건 2를 만족한다. 하지만 조건 3을 만족하지 않는다. 4보다 3을 충분히 먼저 풀 수 있기 때문이다. 따라서 조건 3을 만족하는 문제를 풀 순서는 3-1-4-2가 된다.</p>

<p>문제의 개수와 먼저 푸는 것이 좋은 문제에 대한 정보가 주어졌을 때, 주어진 조건을 만족하면서 민오가 풀 문제의 순서를 결정해 주는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 문제의 수 N(1 ≤ N ≤ 32,000)과 먼저 푸는 것이 좋은 문제에 대한 정보의 개수 M(1 ≤ M ≤ 100,000)이 주어진다. 둘째 줄부터 M개의 줄에 걸쳐 두 정수의 순서쌍 A,B가 빈칸을 사이에 두고 주어진다. 이는 A번 문제는 B번 문제보다 먼저 푸는 것이 좋다는 의미이다.</p>

<p>항상 문제를 모두 풀 수 있는 경우만 입력으로 주어진다.</p>

### 출력 

 <p>첫째 줄에 문제 번호를 나타내는 1 이상 N 이하의 정수들을 민오가 풀어야 하는 순서대로 빈칸을 사이에 두고 출력한다.</p>

## 02. 문제 풀이

1. 방법<br>
    1. 맨 처음 모든 간선을 읽으며 indegree 테이블을 채움<br>
    2. indegree가 0인 정점들을 모두 큐에 넣음<br>
    3. 큐에서 정점을 꺼내어 위상 정렬 결과에 추가<br>
    4. 해당 정점으로부터 연결된 모든 정점의 indegree 값을 1 감소시킴 이 때 indegree가 0이 되었다면 그 정점을 큐에추가<br>
    5. 큐가 빌 때 까지 3,4번 과정을 반복<br>


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M;
        static int[] deg,ans;
        static ArrayList<Integer>[] adj;
        static PriorityQueue<Integer> pq = new PriorityQueue<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            adj = new ArrayList[N+1];
            deg = new int[N+1];
            ans = new int[N];
            for(int i = 1; i<=N;i++){
                adj[i] = new ArrayList<>();
            }
            for(int i=0;i<M;i++){
                st = new StringTokenizer(br.readLine());
                int a = Integer.parseInt(st.nextToken());
                int b = Integer.parseInt(st.nextToken());
                adj[a].add(b);
                deg[b]+=1;
            }
            int idx = 0;
            for(int i=1;i<=N;i++){
                if(deg[i]==0) pq.add(i);
            }
            while(!pq.isEmpty()){
                int cur = pq.poll();
                ans[idx++] = cur;
                for(int k : adj[cur]){
                    deg[k] -= 1;
                    if(deg[k]==0) pq.add(k);
                }
            }
            for(int i=0;i<N;i++){
                System.out.print(ans[i] + " ");
            }
        }
    }
    ```

## 03. 회고
문제가 그대로 위상정렬 설명?