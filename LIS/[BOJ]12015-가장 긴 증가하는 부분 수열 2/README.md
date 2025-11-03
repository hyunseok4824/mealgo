- **문제** : 백준 12015번 - 가장 긴 증가하는 부분 수열 2
- **난이도** : 골드 2
- **문제 유형** : LIS
- **푼 언어** : java

## 01. 문제 설명

<p>수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.</p>

<p>예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {<strong>10</strong>, <strong>20</strong>, 10, <strong>30</strong>, 20, <strong>50</strong>} 이고, 길이는 4이다.</p>

### 입력 

 <p>첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다.</p>

<p>둘째 줄에는 수열 A를 이루고 있는 A<sub>i</sub>가 주어진다. (1 ≤ A<sub>i</sub> ≤ 1,000,000)</p>

### 출력 

 <p>첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.</p>


## 02. 문제 풀이

방법<br> - **O(N*logN)** 풀이
1. num[]을 꼭 다 훑어봐야 하는가?<br>
2. 길이가 k+1인 증가 부분수열들의 가능한 최소 끝값을 저장한다<br>
3. j는 이진탐색을 이용해 찾는다<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N, ans, len;
        static int[] num, lst;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            num = new int[N]; lst = new int[N];
            StringTokenizer st = new StringTokenizer(br.readLine());
            for(int i=0;i<N;i++){
                num[i] = Integer.parseInt(st.nextToken());
            }
            for(int i=0;i<N;i++){
                int pos = Arrays.binarySearch(lst, 0, len, num[i]);
                if(pos < 0 ) pos = -pos -1;
                lst[pos] = num[i];
                if(pos == len) len += 1;
            }
            System.out.println(len);
        }
    }
    ```

## 03. 회고
- *주의 !!* Arrays.binarySearch()<br>
Arrays.binarySearch(배열, 시작 인덱스, 끝 인덱스, 찾을 값);<br>
lis: 탐색할 배열<br>
0: 탐색 시작 위치<br>
len: 탐색 끝 위치<br>
num: 찾고 싶은 값<br>
값이 있다면 -> 그 인덱스를 반환<br>
값이 없다면 → 값이 들어가야 할 위치를 -(위치)-1 로 반환<br>
