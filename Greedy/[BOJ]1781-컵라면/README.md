- **문제** : 백준 1781번 - 컵라면
- **난이도** : 골드 2
- **문제 유형** : 그리디
- **푼 언어** : java

## 01. 문제 설명

<p>상욱 조교는 동호에게 N개의 문제를 주고서, 각각의 문제를 풀었을 때 컵라면을 몇 개 줄 것인지 제시 하였다. 하지만 동호의 찌를듯한 자신감에 소심한 상욱 조교는 각각의 문제에 대해 데드라인을 정하였다.</p>

<table class="table table-bordered" style="width:38%">
	<tbody>
		<tr>
			<th style="width:10%">문제 번호</th>
			<td style="width:4%">1</td>
			<td style="width:4%">2</td>
			<td style="width:4%">3</td>
			<td style="width:4%">4</td>
			<td style="width:4%">5</td>
			<td style="width:4%">6</td>
			<td style="width:4%">7</td>
		</tr>
		<tr>
			<th>데드라인</th>
			<td>1</td>
			<td>1</td>
			<td>3</td>
			<td>3</td>
			<td>2</td>
			<td>2</td>
			<td>6</td>
		</tr>
		<tr>
			<th>컵라면 수</th>
			<td>6</td>
			<td>7</td>
			<td>2</td>
			<td>1</td>
			<td>4</td>
			<td>5</td>
			<td>1</td>
		</tr>
	</tbody>
</table>

<p>위와 같은 상황에서 동호가 2, 6, 3, 1, 7, 5, 4 순으로 숙제를 한다면 2, 6, 3, 7번 문제를 시간 내에 풀어 총 15개의 컵라면을 받을 수 있다.</p>

<p>문제는 동호가 받을 수 있는 최대 컵라면 수를 구하는 것이다. 위의 예에서는 15가 최대이다.</p>

<p>문제를 푸는데는 단위 시간 1이 걸리며, 각 문제의 데드라인은 N이하의 자연수이다. 또, 각 문제를 풀 때 받을 수 있는 컵라면 수와 최대로 받을 수 있는 컵라면 수는 모두 2<sup>31</sup>보다 작은 자연수이다.</p>

### 입력 

 <p>첫 줄에 숙제의 개수 N (1 ≤ N ≤ 200,000)이 들어온다. 다음 줄부터 N+1번째 줄까지 i+1번째 줄에 i번째 문제에 대한 데드라인과 풀면 받을 수 있는 컵라면 수가 공백으로 구분되어 입력된다.</p>

### 출력 

 <p>첫 줄에 동호가 받을 수 있는 최대 컵라면 수를 출력한다.</p>


## 02. 문제 풀이

- 방법 <br>
1. 마감기한을 오름차순으로 정렬<br>
2. pq의 사이즈가 결국 시간임<br>
3. 작업을 계속 최소 힙에 넣으면서 최소힙의 크기가 마감기한을 넘으면 젤 작은 보상을 제거한다<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N;
        static class Pair{
            int x, y;
            Pair(int x, int y){
                this.x = x;
                this.y = y;
            }
        }
        static ArrayList<Pair> alst = new ArrayList<>();
        static PriorityQueue<Integer> pq = new PriorityQueue<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            for(int i = 0; i<N;i++){
                StringTokenizer st = new StringTokenizer(br.readLine());
                int a = Integer.parseInt(st.nextToken());
                int b = Integer.parseInt(st.nextToken());
                alst.add(new Pair(a,b));
            }
            alst.sort((o1,o2)->{
                if(o1.x == o2.x){
                    return o2.y - o1.y;
                }
                return o1.x - o2.x;
            });
            for(Pair p : alst){
            pq.add(p.y);
            if(pq.size() > p.x){
                pq.poll();
            }
            }
            int ans = 0;
            while(!pq.isEmpty()){
                ans += pq.poll();
            }
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
- *주의 !!* 이전에 고른 덜 이득인 작업을 나중에 더 이득인 작업으로 교체
반례 생각하기 어려움<br>
반례 목록
1.  데드 라인이 남았는데 넘겨버린 경우.<br>
2. 데드라인이 긴 경우가 더 많은 라면을 얻을 수 있는 경우.<br>
-> pq의 사이즈 == 시간 <- 생각못함