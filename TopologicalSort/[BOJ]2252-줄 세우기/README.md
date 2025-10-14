- **문제** : 백준 2252번 - 줄 세우기
- **난이도** : 골드 3
- **문제 유형** : 위상정렬
- **푼 언어** : java

## 01. 문제 설명

<<p>N명의 학생들을 키 순서대로 줄을 세우려고 한다. 각 학생의 키를 직접 재서 정렬하면 간단하겠지만, 마땅한 방법이 없어서 두 학생의 키를 비교하는 방법을 사용하기로 하였다. 그나마도 모든 학생들을 다 비교해 본 것이 아니고, 일부 학생들의 키만을 비교해 보았다.</p>

<p>일부 학생들의 키를 비교한 결과가 주어졌을 때, 줄을 세우는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 N(1 ≤ N ≤ 32,000), M(1 ≤ M ≤ 100,000)이 주어진다. M은 키를 비교한 횟수이다. 다음 M개의 줄에는 키를 비교한 두 학생의 번호 A, B가 주어진다. 이는 학생 A가 학생 B의 앞에 서야 한다는 의미이다.</p>

<p>학생들의 번호는 1번부터 N번이다.</p>

### 출력 

 <p>첫째 줄에 학생들을 앞에서부터 줄을 세운 결과를 출력한다. 답이 여러 가지인 경우에는 아무거나 출력한다.</p>

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
        static int[] indegree;
        static PriorityQueue<Integer> pq = new PriorityQueue<>((o1,o2)->{
            return o1 - o2;
        });
        static Queue<Integer> q = new LinkedList<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            adj = new ArrayList[N+1];
            indegree = new int[N+1];
            for(int i=1;i<=N;i++){
                adj[i] = new ArrayList<>();
            }
            for(int i=0;i<M;i++){
                st = new StringTokenizer(br.readLine());
                int A = Integer.parseInt(st.nextToken());
                int B = Integer.parseInt(st.nextToken());
                adj[A].add(B);
                indegree[B] +=1;
            }
            for(int i=1;i<=N;i++){
                if(indegree[i] == 0){
                    q.add(i);
                }
            }
        while(!q.isEmpty()){
                int k = q.poll();
                System.out.print(k + " ");
                pq.add(k);
                for(int nxt : adj[k]){
                    indegree[nxt]-=1;
                    if(indegree[nxt] == 0){
                        q.add(nxt);
                    }
                }
            }
        }
    }
    ```

## 03. 회고
- *주의 !!* 우선순위 -> PQ 떠올리기<br>
위상정렬 유형 몰랐으면 못풀었을 문제<br>