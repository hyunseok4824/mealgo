- **문제** : 백준 2343번 - 기타 레슨
- **난이도** : 골드 5
- **문제 유형** : 이분탐색
- **푼 언어** : java

## 01. 문제 설명

<p>강토는 자신의 기타 강의 동영상을 블루레이로 만들어 판매하려고 한다. 블루레이에는 총 N개의 강의가 들어가는데, 블루레이를 녹화할 때, 강의의 순서가 바뀌면 안 된다. 순서가 뒤바뀌는 경우에는 강의의 흐름이 끊겨, 학생들이 대혼란에 빠질 수 있기 때문이다. 즉, i번 강의와 j번 강의를 같은 블루레이에 녹화하려면 i와 j 사이의 모든 강의도 같은 블루레이에 녹화해야 한다.</p>

<p>강토는 이 블루레이가 얼마나 팔릴지 아직 알 수 없기 때문에, 블루레이의 개수를 가급적 줄이려고 한다. 오랜 고민 끝에 강토는 M개의 블루레이에 모든 기타 강의 동영상을 녹화하기로 했다. 이때, 블루레이의 크기(녹화 가능한 길이)를 최소로 하려고 한다. 단, M개의 블루레이는 모두 같은 크기이어야 한다.</p>

<p>강토의 각 강의의 길이가 분 단위(자연수)로 주어진다. 이때, 가능한 블루레이의 크기 중 최소를 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 강의의 수 N (1 ≤ N ≤ 100,000)과 M (1 ≤ M ≤ N)이 주어진다. 다음 줄에는 강토의 기타 강의의 길이가 강의 순서대로 분 단위로(자연수)로 주어진다. 각 강의의 길이는 10,000분을 넘지 않는다.</p>

### 출력 

 <p>첫째 줄에 가능한 블루레이 크기중 최소를 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 파라미터 탐색 : 최대 최소 범위 구해주기<br>
2. 이분 탐색으로 범위 줄여가면서 조건에 맞는 지 확인하면서 값 갱신 - upper bound<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M;
        static int[] arr;
        static int func(int l, int r, int tar){
            int ans = r;
            while(l <= r){
                int mid = (l+r) / 2;
                int kmid = func2(mid);
                if(kmid <= tar){
                    ans = mid;
                    r = mid - 1;
                }else{
                    l = mid + 1;
                }
            }
            return ans;
        }
        static int func2(int k){
            int sm = 0; int cnt = 0;
            for(int i=0;i<N;i++){
                sm += arr[i];
                if(sm > k){
                    cnt += 1;
                    sm = arr[i];
                }
            }
            return (cnt+1);
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            arr = new int[N];
            st = new StringTokenizer(br.readLine());
            int mx = 0; int mn = 0;
            for(int i=0;i<N;i++){
                arr[i] = Integer.parseInt(st.nextToken());
                mx += arr[i];
                mn = Math.max(mn,arr[i]);
            }
            System.out.println(func(mn, mx, M));
        }
    }
    ```
## 03. 회고

- *주의 !!*  off-by-one <br>
1. `while (l <= r)` 범위 확인<br>
2. 문제에서 순서 변경 X -> 정렬해서 틀림 -> 문제 잘 읽기<br>
3. 이분탐색 -> 파라미터 탐색, lower bound, upper bound 생각<br>
4. 만족하는 값 중 최소를 구하는 것이므로 lower, upper bound !!<br>