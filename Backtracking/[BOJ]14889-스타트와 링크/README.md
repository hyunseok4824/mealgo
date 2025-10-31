- **문제** : 백준 14889번 - 스타트와 링크
- **난이도** : 실버 1
- **문제 유형** : 백트래킹
- **푼 언어** : java

## 01. 문제 설명

<p>오늘은 스타트링크에 다니는 사람들이 모여서 축구를 해보려고 한다. 축구는 평일 오후에 하고 의무 참석도 아니다. 축구를 하기 위해 모인 사람은 총 N명이고 신기하게도 N은 짝수이다. 이제 N/2명으로 이루어진 스타트 팀과 링크 팀으로 사람들을 나눠야 한다.</p>

<p>BOJ를 운영하는 회사 답게 사람에게 번호를 1부터 N까지로 배정했고, 아래와 같은 능력치를 조사했다. 능력치 S<sub>ij</sub>는 i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치이다. 팀의 능력치는 팀에 속한 모든 쌍의 능력치 S<sub>ij</sub>의 합이다. S<sub>ij</sub>는 S<sub>ji</sub>와 다를 수도 있으며, i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치는 S<sub>ij</sub>와 S<sub>ji</sub>이다.</p>

<p>N=4이고, S가 아래와 같은 경우를 살펴보자.</p>

<table class="table table-bordered" style="width:20%">
	<thead>
		<tr>
			<th>i\j</th>
			<th>1</th>
			<th>2</th>
			<th>3</th>
			<th>4</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>1</th>
			<td> </td>
			<td>1</td>
			<td>2</td>
			<td>3</td>
		</tr>
		<tr>
			<th>2</th>
			<td>4</td>
			<td> </td>
			<td>5</td>
			<td>6</td>
		</tr>
		<tr>
			<th>3</th>
			<td>7</td>
			<td>1</td>
			<td> </td>
			<td>2</td>
		</tr>
		<tr>
			<th>4</th>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td> </td>
		</tr>
	</tbody>
</table>

<p>예를 들어, 1, 2번이 스타트 팀, 3, 4번이 링크 팀에 속한 경우에 두 팀의 능력치는 아래와 같다.</p>

<ul>
	<li>스타트 팀: S<sub>12</sub> + S<sub>21</sub> = 1 + 4 = 5</li>
	<li>링크 팀: S<sub>34</sub> + S<sub>43</sub> = 2 + 5 = 7</li>
</ul>

<p>1, 3번이 스타트 팀, 2, 4번이 링크 팀에 속하면, 두 팀의 능력치는 아래와 같다.</p>

<ul>
	<li>스타트 팀: S<sub>13</sub> + S<sub>31</sub> = 2 + 7 = 9</li>
	<li>링크 팀: S<sub>24</sub> + S<sub>42</sub> = 6 + 4 = 10</li>
</ul>

<p>축구를 재미있게 하기 위해서 스타트 팀의 능력치와 링크 팀의 능력치의 차이를 최소로 하려고 한다. 위의 예제와 같은 경우에는 1, 4번이 스타트 팀, 2, 3번 팀이 링크 팀에 속하면 스타트 팀의 능력치는 6, 링크 팀의 능력치는 6이 되어서 차이가 0이 되고 이 값이 최소이다.</p>

### 입력 

 <p>첫째 줄에 N(4 ≤ N ≤ 20, N은 짝수)이 주어진다. 둘째 줄부터 N개의 줄에 S가 주어진다. 각 줄은 N개의 수로 이루어져 있고, i번 줄의 j번째 수는 S<sub>ij</sub> 이다. S<sub>ii</sub>는 항상 0이고, 나머지 S<sub>ij</sub>는 1보다 크거나 같고, 100보다 작거나 같은 정수이다.</p>

### 출력 

 <p>첫째 줄에 스타트 팀과 링크 팀의 능력치의 차이의 최솟값을 출력한다.</p>


## 02. 문제 풀이

방법<br>
1. nC2 조합 만들어서 2개씩 나누기<br>
2. 같은팀 능력치 구해서 최솟값 갱신<br>


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N, sm1, sm2;
        static int answer = Integer.MAX_VALUE;
        static int[] arr,vis;
        static int[][] board;
        static void dfs(int k, int start){
            if(k == N/2){sm1 = 0; sm2 = 0;
                for(int i=0;i<N;i++){
                    
                    for(int j=i+1;j<N;j++){
                        if(vis[i]==vis[j]){
                            if(vis[i]==0){
                                sm1 += board[i][j];
                                sm1 += board[j][i];
                            }else{
                                sm2 += board[i][j];
                                sm2 += board[j][i];
                            }
                        }
                    }
                }
                answer = Math.min(Math.abs(sm1 - sm2),answer);
                return;
            }
            for(int i=start;i<N;i++){
                if(vis[i] == 0){
                    vis[i] = 1;
                    dfs(k+1,i+1);
                    vis[i] = 0;
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            board = new int[N][N];
            vis = new int[N];
            for(int i=0;i<N;i++){
                StringTokenizer st = new StringTokenizer(br.readLine());
                for(int j=0;j<N;j++){
                    board[i][j] = Integer.parseInt(st.nextToken());
                }
            }
            dfs(0,0);
            System.out.println(answer);
        }
    }
    ```

## 03. 회고
- *주의 !!* 조합 start<br>
dfs(int k) -> 인덱스를 0부터 N까지 전부 순회 -> 시초<br>
파라미터에 start값 넣는다 -> 평소에 arr배열 둘 때와 차이<br>
arr 배열 두지 않고 vis 배열 만으로 구현<br>
