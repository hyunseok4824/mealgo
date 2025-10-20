- **문제** : 백준 2250번 - 트리의 높이와 너비
- **난이도** : 골드 2
- **문제 유형** : tree
- **푼 언어** : java

## 01. 문제 설명

<p>이진트리를 다음의 규칙에 따라 행과 열에 번호가 붙어있는 격자 모양의 틀 속에 그리려고 한다. 이때 다음의 규칙에 따라 그리려고 한다.</p>

<ol>
	<li>이진트리에서 같은 레벨(level)에 있는 노드는 같은 행에 위치한다.</li>
	<li>한 열에는 한 노드만 존재한다.</li>
	<li>임의의 노드의 왼쪽 부트리(left subtree)에 있는 노드들은 해당 노드보다 왼쪽의 열에 위치하고, 오른쪽 부트리(right subtree)에 있는 노드들은 해당 노드보다 오른쪽의 열에 위치한다.</li>
	<li>노드가 배치된 가장 왼쪽 열과 오른쪽 열 사이엔 아무 노드도 없이 비어있는 열은 없다.</li>
</ol>

<p>이와 같은 규칙에 따라 이진트리를 그릴 때 각 레벨의 너비는 그 레벨에 할당된 노드 중 가장 오른쪽에 위치한 노드의 열 번호에서 가장 왼쪽에 위치한 노드의 열 번호를 뺀 값 더하기 1로 정의한다. 트리의 레벨은 가장 위쪽에 있는 루트 노드가 1이고 아래로 1씩 증가한다.</p>

<p>아래 그림은 어떤 이진트리를 위의 규칙에 따라 그려 본 것이다. 첫 번째 레벨의 너비는 1, 두 번째 레벨의 너비는 13, 3번째, 4번째 레벨의 너비는 각각 18이고, 5번째 레벨의 너비는 13이며, 그리고 6번째 레벨의 너비는 12이다.</p>

<p style="text-align: center;"><img alt="" src="https://upload.acmicpc.net/4e4aaa17-dc1d-4af9-a36a-3144259fb7d2/-/preview/" style="width: 488px; height: 176px;"></p>

<p>우리는 주어진 이진트리를 위의 규칙에 따라 그릴 때에 너비가 가장 넓은 레벨과 그 레벨의 너비를 계산하려고 한다. 위의 그림의 예에서 너비가 가장 넓은 레벨은 3번째와 4번째로 그 너비는 18이다. 너비가 가장 넓은 레벨이 두 개 이상 있을 때는 번호가 작은 레벨을 답으로 한다. 그러므로 이 예에 대한 답은 레벨은 3이고, 너비는 18이다.</p>

<p>임의의 이진트리가 입력으로 주어질 때 너비가 가장 넓은 레벨과 그 레벨의 너비를 출력하는 프로그램을 작성하시오</p>

### 입력 

 <p>첫째 줄에 노드의 개수를 나타내는 정수 N(1 ≤ N ≤ 10,000)이 주어진다. 다음 N개의 줄에는 각 줄마다 노드 번호와 해당 노드의 왼쪽 자식 노드와 오른쪽 자식 노드의 번호가 순서대로 주어진다. 노드들의 번호는 1부터 N까지이며, 자식이 없는 경우에는 자식 노드의 번호에 -1이 주어진다.</p>

### 출력 

 <p>첫째 줄에 너비가 가장 넓은 레벨과 그 레벨의 너비를 순서대로 출력한다. 너비가 가장 넓은 레벨이 두 개 이상 있을 때에는 번호가 작은 레벨을 출력한다.</p>


## 02. 문제 풀이

- 방법 <br>
1. dfs로 트리 높이 구하기<br>
2. 중위순회한 결과가 지문의 사진의 x축과 같음<br>
3. 중위순회하면서 x축 값 구하기<br>
4. root는 부모가 0인걸로 찾기<br>
5. 순회하면서 최대값 구하기<br> 
6. 트리 입력은 배열 3개로 받는다. 왼쪽 자식 저장하는 배열, 오른쪽 자식 저장하는 배열, 부모 저장 -> 왼쪽, 오른쪽 자식 저장 index를 부모로함 값을 자식의 노드 번호<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {   
        static int N;
        static int[] parent, lc, rc, he;
        static int[][] ans;
        static int mxh;
        static int anss = -1;
        static int ansn = -1;
        static void dfs(int cur, int d){
            if(cur == -1) return;
            he[cur] = d;
            mxh = Math.max(mxh,d);
            dfs(lc[cur], d+1);
            dfs(rc[cur], d+1);
        }
        static int idx = 1;
        static void inorder(int cur){
            if(lc[cur] != -1) inorder(lc[cur]);
            if(ans[he[cur]][0] == 0){
                ans[he[cur]][0] = idx;   
            }
            ans[he[cur]][1] = Math.max(ans[he[cur]][1], idx);
            idx++;
            if(rc[cur] != -1) inorder(rc[cur]);
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            he = new int[N+1];
            parent = new int[N+1];
            lc = new int[N+1];
            rc = new int[N+1];
            for(int i=0;i<N;i++){
                StringTokenizer st = new StringTokenizer(br.readLine());
                int p = Integer.parseInt(st.nextToken());
                int l = Integer.parseInt(st.nextToken());
                int r = Integer.parseInt(st.nextToken());
                lc[p] = l; rc[p] = r;
                if(l != -1) parent[l] = p;
                if(r != -1) parent[r] = p;
            }
            int root = -1;
            for(int i=1; i<=N; i++){
                if(parent[i] == 0){
                    root = i;
                }
            }
            dfs(root,1);
            ans = new int[mxh+1][2];
            inorder(root);
            for(int i=1;i<=mxh;i++){
                int dff = (ans[i][1] - ans[i][0]);
                if(dff > anss){
                    ansn = i;
                    anss = dff;
                }
            }
            System.out.println(ansn + " " + (anss+1));
        }
    }
    ```

## 03. 회고
- *주의 !!*
1. 트리 순회 방법 응요하는 문제였음 -> 입력 형식으로 유추가능<br>
2. root가 정해져 있는지 찾아야 하는지 판단<br>
3. 트리문제 -> 순회 기억하기<br>