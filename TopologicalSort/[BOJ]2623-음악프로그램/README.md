- **문제** : 백준 2623번 - 음악프로그램
- **난이도** : 골드 3
- **문제 유형** : 위상정렬
- **푼 언어** : java

## 01. 문제 설명

<p>인터넷 방송 KOI(Korea Open Internet)의 음악 프로그램 PD인 남일이는 자기가 맡은 프로그램 '뮤직 KOI'에서 가수의 출연 순서를 정하는 일을 매우 골치 아파한다. 순서를 정하기 위해서는 많은 조건을 따져야 한다.</p>

<p>그래서 오늘 출연 예정인 여섯 팀의 가수에 대해서 남일이가 보조 PD 세 명에게 각자 담당한 가수의 출연 순서를 정해오게 하였다. 보조 PD들이 가져온 것은 아래와 같다.</p>

<ul>
	<li>1 4 3</li>
	<li>6 2 5 4</li>
	<li>2 3</li>
</ul>

<p>첫 번째 보조 PD는 1번 가수가 먼저, 다음에 4번 가수, 다음에 3번 가수가 출연하기로 순서를 정했다. 두 번째 보조 PD는 6번, 2번, 5번, 4번 순으로 자기 담당 가수들의 순서를 정했다. 한 가수를 여러 보조 PD가 담당할 수도 있다. 마지막으로, 세 번째 보조 PD는 2번 먼저, 다음에 3번으로 정했다.</p>

<p>남일이가 할 일은 이 순서들을 모아서 전체 가수의 순서를 정하는 것이다. 남일이는 잠시 생각을 하더니 6 2 1 5 4 3으로 순서를 정했다. 이렇게 가수 순서를 정하면 세 보조 PD가 정해온 순서를 모두 만족한다. 물론, 1 6 2 5 4 3으로 전체 순서를 정해도 괜찮다.</p>

<p>경우에 따라서 남일이가 모두를 만족하는 순서를 정하는 것이 불가능할 수도 있다. 예를 들어, 세 번째 보조 PD가 순서를 2 3 대신에 3 2로 정해오면 남일이가 전체 순서를 정하는 것이 불가능하다. 이번에 남일이는 우리 나라의 월드컵 4강 진출 기념 음악제의 PD를 맡게 되었는데, 출연 가수가 아주 많다. 이제 여러분이 해야 할 일은 보조 PD들이 가져 온 순서들을 보고 남일이가 가수 출연 순서를 정할 수 있도록 도와 주는 일이다.</p>

<p>보조 PD들이 만든 순서들이 입력으로 주어질 때, 전체 가수의 순서를 정하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에는 가수의 수 N과 보조 PD의 수 M이 주어진다. 가수는 번호 1, 2,…,N 으로 표시한다. 둘째 줄부터 각 보조 PD가 정한 순서들이 한 줄에 하나씩 나온다. 각 줄의 맨 앞에는 보조 PD가 담당한 가수의 수가 나오고, 그 뒤로는 그 가수들의 순서가 나온다. N은 1이상 1,000이하의 정수이고, M은 1이상 100이하의 정수이다.</p>

### 출력 

 <p>출력은 N 개의 줄로 이뤄지며, 한 줄에 하나의 번호를 출력한 다. 이들은 남일이가 정한 가수들의 출연 순서를 나타낸다. 답이 여럿일 경우에는 아무거나 하나를 출력 한다. 만약 남일이가 순서를 정하는 것이 불가능할 경우에는 첫째 줄에 0을 출력한다.</p>

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
        static ArrayList<Integer>[] adj;
        static ArrayList<Integer> lst;
        static int[] deg,ans;
        static PriorityQueue<Integer> pq = new PriorityQueue<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            adj = new ArrayList[N+1];
            deg = new int[N+1];
            ans = new int[N];
            for(int i=1;i<=N;i++){
                adj[i] = new ArrayList<>();
            }
            for(int i=0;i<M;i++){
                lst = new ArrayList<>();
                st = new StringTokenizer(br.readLine());
                int sz = Integer.parseInt(st.nextToken());
                while(sz-->0){
                    int k = Integer.parseInt(st.nextToken());
                    lst.add(k);
                }
                for(int j=1;j<lst.size();j++){
                    adj[lst.get(j-1)].add(lst.get(j));
                    deg[lst.get(j)]+=1;
                }
            }
            for(int i=1;i<=N;i++){
                if(deg[i] == 0) pq.add(i);
            }
            int idx = 0;
            while(!pq.isEmpty()){
                int cur = pq.poll();
                ans[idx++] = cur;
                for(int k : adj[cur]){
                    deg[k] -= 1;
                    if(deg[k] == 0) pq.add(k);
                }
            }
            if(idx != N){
                System.out.println("0");
                return;
            }
            for(int i=0;i<N;i++){
                System.out.println(ans[i]);
            }
        }
    }
    ```

## 03. 회고
- "아무거나"라서 pq가 아니라 queue 써도 됨
- 안될때 0 처리 안함