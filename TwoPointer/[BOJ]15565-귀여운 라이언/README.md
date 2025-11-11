- **문제** : 백준 15565번 - 귀여운 라이언
- **난이도** : 실버 1
- **문제 유형** : Two Pointer
- **푼 언어** : java

## 01. 문제 설명

<p>꿀귀 라이언 인형과, 마찬가지로 꿀귀인 어피치 인형이 <em>N</em>개 일렬로 놓여 있다. 라이언 인형은 1, 어피치 인형은 2로 표현하자. 라이언 인형이 <em>K</em>개 이상 있는 가장 작은 연속된 인형들의 집합의 크기를 구하여라.</p>

### 입력 

 <p>첫 줄에 <em>N</em>과 <em>K</em>가 주어진다. (1 ≤ <em>K</em> ≤ <em>N</em> ≤ 10<sup>6</sup>)</p>

<p>둘째 줄에 <em>N</em>개의 인형의 정보가 주어진다. (1 또는 2)</p>

### 출력 

 <p><em>K</em>개 이상의 라이언 인형을 포함하는 가장 작은 연속된 인형들의 집합의 크기를 출력한다. 그런 집합이 없다면 -1을 출력한다.</p>


## 02. 문제 풀이

1. 방법 (나의 풀이)<br>
    1. l = 0부터 1씩 증가 시키면서(for문)<br>
    2. r을 내가 원하는 조건이 나올때 까지 밈<br>
    3. 그다음에 K개의 라이언에 해당 하는 길이 최소 갱신<br>
    4. 지금 l에 해당하는 값 처리<br> 


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,K;
        static int[] nums;
        static int ans = Integer.MAX_VALUE;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            K = Integer.parseInt(st.nextToken());
            nums = new int[N];
            st = new StringTokenizer(br.readLine());
            for(int i=0;i<N;i++){
                nums[i] = Integer.parseInt(st.nextToken());
            }
            int r = 0;int cnt = 0;
            for(int l = 0; l < N; l++){
                while(r < N && cnt < K){
                    if(nums[r] == 1){
                        cnt+=1;
                    }
                    r+=1;
                }
                if(cnt == K){
                    ans = Math.min(ans,(r-l));
                }
                if(nums[l] == 1){
                    cnt -= 1;
                }
            }
            if(ans == Integer.MAX_VALUE){
                ans = -1;
            }
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
*주의 !!* 투포인터 의심 키워드<br>
1. 1차원 배열에서의 "연속 부분 수열" or "순서를 지키며 차례대로"<br>
2. 곱의 최소<br>

- 투포인터 실버 문제도 어렵다..
- 구현 잘 해야함