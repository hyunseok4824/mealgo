- **문제** : 백준 9576번 - 책 나눠주기
- **난이도** : 골드 2
- **문제 유형** : 이분매칭
- **푼 언어** : java

## 01. 문제 설명
<p>백준이는 방 청소를 하면서 필요 없는 전공 서적을 사람들에게 나눠주려고 한다. 나눠줄 책을 모아보니 총 N권이었다. 책이 너무 많기 때문에 백준이는 책을 구분하기 위해 각각 1부터 N까지의 정수 번호를 중복되지 않게 매겨 두었다.</p>

<p>조사를 해 보니 책을 원하는 서강대학교 학부생이 총 M명이었다. 백준이는 이 M명에게 신청서에 두 정수 a, b (1 ≤ a ≤ b ≤ N)를 적어 내라고 했다. 그러면 백준이는 책 번호가 a 이상 b 이하인 책 중 남아있는 책 한 권을 골라 그 학생에게 준다. 만약 a번부터 b번까지의 모든 책을 이미 다른 학생에게 주고 없다면 그 학생에게는 책을 주지 않는다.</p>

<p>백준이가 책을 줄 수 있는 최대 학생 수를 구하시오.</p>

### 입력 

 <p>첫째 줄에 테스트 케이스의 수가 주어진다.</p>

<p>각 케이스의 첫 줄에 정수 N(1 ≤ N ≤ 1,000)과 M(1 ≤ M ≤ 1,000)이 주어진다. 다음 줄부터 M개의 줄에는 각각 정수 a<sub>i</sub>, b<sub>i</sub>가 주어진다. (1 ≤ a<sub>i</sub> ≤ b<sub>i</sub> ≤ N)</p>

### 출력 

 <p>각 테스트 케이스마다 백준이가 책을 줄 수 있는 최대 학생 수를 한 줄에 하나씩 출력한다.</p>

## 02. 문제 풀이
1. 각 학생에게 책을 하나 배정할 수 있는지 DFS로 탐색<br>
2. 그 책이 아직 아무에게도 배정되지 않았다면 배정<br>
3. 이미 다른 학생에게 배정된 책이라면 그 이미 배정받은 학생이 다른 책을 대신 배정받을 수 있는지 확인<br>

  <코드>
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
*주의!!* 초기화
- dfs 마다 vis배열 초기화 해줘야함 : 학생마다 초기화
