- **문제** : 백준 11053번 - 가장 긴 증가하는 부분 수열
- **난이도** : 실버 2
- **문제 유형** : LIS
- **푼 언어** : java

## 01. 문제 설명

<p>수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.</p>

<p>예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {<strong>10</strong>, <strong>20</strong>, 10, <strong>30</strong>, 20, <strong>50</strong>} 이고, 길이는 4이다.</p>

### 입력 

 <p>첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.</p>

<p>둘째 줄에는 수열 A를 이루고 있는 A<sub>i</sub>가 주어진다. (1 ≤ A<sub>i</sub> ≤ 1,000)</p>

### 출력 

 <p>첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.</p>


## 02. 문제 풀이

방법<br> - **O(N*N)** 풀이
1. cnt[i] : num[i]을 마지막 값으로 가지는 가장 긴 증가부분수열의 길이<br>
2. num[i]가 어떤 증가부분수열의 마지막 값이 되기 위해서는 num[i]가 추가되기 전 증가부분수열의 마지막 값이 num[i]보다 작아야 한다<br>
3. num[i]를 마지막 값으로 가지는 '가장 긴' 증가부분수열의 길이는 num[i]가 추거될 수 있는 증가부분수열 중 가장 긴 수열의 길이에 1을 더한 값이 된다<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N, ans;
        static int[] num, cnt;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            num = new int[N]; cnt = new int[N];
            StringTokenizer st = new StringTokenizer(br.readLine());
            for(int i=0;i<N;i++){
                num[i] = Integer.parseInt(st.nextToken());
                int maxValue = 0;
                for(int j=0;j<i;j++){
                    if(num[i] > num[j] && maxValue < cnt[j]){
                        maxValue = cnt[j];
                    }
                }
                cnt[i] = maxValue + 1;
                ans = Math.max(cnt[i],ans);
            }
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
- *주의 !!* O(N*N) vs O(NlogN) 풀이<br>