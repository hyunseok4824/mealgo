- **문제** : 백준 1240번번 - 노드사이의 거리
- **난이도** : 골드 5
- **문제 유형** : bfs
- **푼 언어** : java

## 01. 문제 설명

<p><mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"> <mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D441 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>N</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext"></span></mjx-container>개의 노드로 이루어진 트리가 주어지고 M개의 두 노드 쌍을 입력받을 때 두 노드 사이의 거리를 출력하라.</p>

### 입력 

 <p>첫째 줄에 노드의 개수 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D441 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>N</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext"></span></mjx-container>과 거리를 알고 싶은 노드 쌍의 개수 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D440 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>M</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext"></span></mjx-container>이 입력되고 다음 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D441 TEX-I"></mjx-c></mjx-mi><mjx-mo class="mjx-n" space="3"><mjx-c class="mjx-c2212"></mjx-c></mjx-mo><mjx-mn class="mjx-n" space="3"><mjx-c class="mjx-c31"></mjx-c></mjx-mn></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>N</mi><mo>−</mo><mn>1</mn></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext"></span></mjx-container>개의 줄에 트리 상에 연결된 두 점과 거리를 입력받는다. 그 다음 줄에는 거리를 알고 싶은 <mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D440 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>M</mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext"></span></mjx-container>개의 노드 쌍이 한 줄에 한 쌍씩 입력된다.</p>

### 출력 

 <p><mjx-container class="MathJax" jax="CHTML" style="font-size: 109%; position: relative;"> <mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D440 TEX-I"></mjx-c></mjx-mi></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi></mi></math></mjx-assistive-mml><span aria-hidden="true" class="no-mathjax mjx-copytext">M</span></mjx-container>개의 줄에 차례대로 입력받은 두 노드 사이의 거리를 출력한다.</p>


## 02. 문제 풀이

방법<br>
1. 그래프로 연결하기 <br>
2. Queue에 거리를 같이 관리하면서 그래프 탐색 

- *주의 !!* 크루스칼 <br>
크루스칼은 시간 복잡도가 O(N^3) N <=400 경우만 사용

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M;
        static class Pair{
            int x, y;
            Pair(int x, int y){
                this.x = x;
                this.y = y;
            }
        }
        static ArrayList<Pair>[] adj;
        static int[] vis;
        static Queue<Pair> q = new LinkedList<>();
        static int bfs(int cur, int nxt){
            q = new LinkedList<>();
            vis = new int[N+1];
            q.add(new Pair(cur,0));
            vis[cur] = 1;
            while(!q.isEmpty()){
                Pair curi = q.poll();
                int d = curi.y;
                int curx = curi.x;
                if(curx == nxt){
                    return d;
                }
                for(Pair p : adj[curx]){
                    int k = p.x;
                    int nd = p.y;
                    if(vis[k] == 1) continue;
                    q.add(new Pair(k, nd+d));
                    vis[k] = 1;
                }
            }
            return -1;
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            adj = new ArrayList[N+1];
            for(int i=1; i<=N;i++){
                adj[i] = new ArrayList<>();
            }
            for(int i=0;i<(N-1);i++){
                st = new StringTokenizer(br.readLine());
                int a = Integer.parseInt(st.nextToken());
                int b = Integer.parseInt(st.nextToken());
                int d = Integer.parseInt(st.nextToken());
                adj[a].add(new Pair(b,d));
                adj[b].add(new Pair(a,d));
            }
            for(int i=0;i<M;i++){
                st = new StringTokenizer(br.readLine());
                int k1 = Integer.parseInt(st.nextToken());
                int k2 = Integer.parseInt(st.nextToken());
                int k3 = bfs(k1,k2);
                System.out.println(k3);
            }
        }
    }
    ```

