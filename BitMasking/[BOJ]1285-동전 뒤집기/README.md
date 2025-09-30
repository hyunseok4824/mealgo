- **문제** : 백준 1285번 - 동전 뒤집기
- **난이도** : 골드 1
- **문제 유형** : BitMasking
- **푼 언어** : java

## 01. 문제 설명

<p>N<sup>2</sup>개의 동전이 N행 N열을 이루어 탁자 위에 놓여 있다. 그 중 일부는 앞면(H)이 위를 향하도록 놓여 있고, 나머지는 뒷면(T)이 위를 향하도록 놓여 있다. <그림 1>은 N이 3일 때의 예이다.</p>

<p style="text-align: center;"><img alt="" src="https://upload.acmicpc.net/ccc3937a-da21-460e-b1f4-2ee861f03995/-/preview/" style="width: 150px; height: 151px;"></p>

<p style="text-align: center;"><그림 1></p>

<p>이들 N<sup>2</sup>개의 동전에 대하여 임의의 한 행 또는 한 열에 놓인 N개의 동전을 모두 뒤집는 작업을 수행할 수 있다. 예를 들어 <그림 1>의 상태에서 첫 번째 열에 놓인 동전을 모두 뒤집으면 <그림 2>와 같이 되고, <그림 2>의 상태에서 첫 번째 행에 놓인 동전을 모두 뒤집으면 <그림 3>과 같이 된다.</p>

<table class="table table-bordered td-center">
	<tbody>
		<tr>
			<td><img alt="" src="https://upload.acmicpc.net/410bd5fd-cb16-4bfb-83af-7edd9882e188/-/preview/" style="width: 150px; height: 151px;"></td>
			<td><img alt="" src="https://upload.acmicpc.net/ae08cc98-4db2-4df7-8bb6-0149d1ca59ba/-/preview/" style="width: 150px; height: 151px;"></td>
		</tr>
		<tr>
			<td><그림 2></td>
			<td><그림 3></td>
		</tr>
	</tbody>
</table>
<p><그림 3>의 상태에서 뒷면이 위를 향하여 놓인 동전의 개수는 두 개이다. <그림 1>의 상태에서 이와 같이 한 행 또는 한 열에 놓인 N개의 동전을 모두 뒤집는 작업을 계속 수행할 때 뒷면이 위를 향하도록 놓인 동전의 개수를 2개보다 작게 만들 수는 없다.</p>

<p>N<sup>2</sup>개의 동전들의 초기 상태가 주어질 때, 한 행 또는 한 열에 놓인 N개의 동전을 모두 뒤집는 작업들을 수행하여 뒷면이 위를 향하는 동전 개수를 최소로 하려 한다. 이때의 최소 개수를 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 20이하의 자연수 N이 주어진다. 둘째 줄부터 N줄에 걸쳐 N개씩 동전들의 초기 상태가 주어진다. 각 줄에는 한 행에 놓인 N개의 동전의 상태가 왼쪽부터 차례대로 주어지는데, 앞면이 위를 향하도록 놓인 경우 H, 뒷면이 위를 향하도록 놓인 경우 T로 표시되며 이들 사이에 공백은 없다.</p>

### 출력 

 <p>첫째 줄에 한 행 또는 한 열에 놓인 N개의 동전을 모두 뒤집는 작업들을 수행하여 뒷면이 위를 향하여 놓일 수 있는 동전의 최소 개수를 출력한다.</p>



## 02. 문제 풀이

1. 방법<br>
    1. 비트 마스킹으로 조합 구함 (어떤 행 선택할 지)<br>
    2. 해당 행을 기준으로 열은 그리디하게 선택<br>
    3. 선택 순서는 상관 없다


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N;
        static int mn = Integer.MAX_VALUE;
        static char[][] board, temp;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            board = new char[N][N];
            for(int i=0;i<N;i++){
                String s = br.readLine();
                for(int j=0;j<N;j++){
                    board[i][j] = s.charAt(j);
                }
            }
            for(int i=0;i<=(1<<N)-1;i++){
                int ans = 0;
                for(int k = 0; k<N; k++){
                    int tCnt =0; int rtCnt = 0;
                    for(int j=0;j<N;j++){
                        char c = board[k][j];
                        if((i&(1<<j)) != 0){
                            if(c == 'T'){
                                tCnt += 1;
                            }else{
                                rtCnt += 1;
                            }
                        }else{
                            if(c == 'H'){
                                tCnt += 1;
                            }else{
                                rtCnt += 1;
                            }
                        }
                    }
                    ans += Math.min(tCnt, rtCnt);
                }
                mn = Math.min(mn, ans);
            }
            System.out.println(mn);
        }
    }
    ```

## 03. 회고
- *주의 !!* 모든 경우를 탐색할 필요는 없다<br>
독립적으로 그리디하게 열 선택가능함<br>
처음엔 N*2(행,열)의 모든 경우를 완탐하려고 함 -> 시간 초과<br>
보드 전부다 바꿔줄 필요 없이 T의 갯수만 구하기<br>