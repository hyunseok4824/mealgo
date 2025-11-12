- **문제** : 백준 13144번 - List of Unique Numbers
- **난이도** : 골드 4
- **문제 유형** : Two Pointer
- **푼 언어** : java

## 01. 문제 설명

<p>길이가 N인 수열이 주어질 때, 수열에서 연속한 1개 이상의 수를 뽑았을 때 같은 수가 여러 번 등장하지 않는 경우의 수를 구하는 프로그램을 작성하여라.</p>

### 입력 

 <p>첫 번째 줄에는 수열의 길이 N이 주어진다. (1 ≤ N ≤ 100,000)</p>

<p>두 번째 줄에는 수열을 나타내는 N개의 정수가 주어진다. 수열에 나타나는 수는 모두 1 이상 100,000 이하이다.</p>

### 출력 

 <p>조건을 만족하는 경우의 수를 출력한다.</p>


## 02. 문제 풀이

방법<br>
완탐은 `N^3`
`N = 100,000`이라서 `N^2`으로 최적화 해도 안되고, `N`으로 처리해야함... 

1. l = 0부터 1씩 증가 시키면서(for문)<br>
2. r을 내가 원하는 조건이 나올때 까지 밈<br>
3. 그다음에 경우의 수 더해줌<br>
4. 지금 l에 해당하는 값 처리<br> 


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,mx;
        static int[] nums;
        static int[] cnt;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            nums = new int[N];
            StringTokenizer st = new StringTokenizer(br.readLine());
            for(int i=0;i<N;i++){
                nums[i] = Integer.parseInt(st.nextToken());
                mx = Math.max(nums[i],mx);
            }
            cnt = new int[mx+1];
            long sm = 0; int r = 0;
            for(int l=0;l<N;l++){
                while(r < N && cnt[nums[r]] == 0){
                    cnt[nums[r]] += 1;
                    r+=1;
                }
                sm += (r-l);
                cnt[nums[l]] -= 1;
            }
            System.out.println(sm);
        }
    }
    ```

## 03. 회고
*주의 !!* 오버플로우 주의<br>