- **문제** : 백준 1477번 - 휴게소 세우기
- **난이도** : 골드 4
- **문제 유형** : 이분탐색
- **푼 언어** : java

## 01. 문제 설명

<p>다솜이는 유료 고속도로를 가지고 있다. 다솜이는 현재 고속도로에 휴게소를 N개 가지고 있는데, 휴게소의 위치는 고속도로의 시작으로부터 얼만큼 떨어져 있는지로 주어진다. 다솜이는 지금 휴게소를 M개 더 세우려고 한다.</p>

<p>다솜이는 이미 휴게소가 있는 곳에 휴게소를 또 세울 수 없고, 고속도로의 끝에도 휴게소를 세울 수 없다. 휴게소는 정수 위치에만 세울 수 있다.</p>

<p>다솜이는 이 고속도로를 이용할 때, 모든 휴게소를 방문한다. 다솜이는 휴게소를 M개 더 지어서 휴게소가 없는 구간의 길이의 최댓값을 최소로 하려고 한다. (반드시 M개를 모두 지어야 한다.)</p>

<p>예를 들어, 고속도로의 길이가 1000이고, 현재 휴게소가 {200, 701, 800}에 있고, 휴게소를 1개 더 세우려고 한다고 해보자.</p>

<p>일단, 지금 이 고속도로를 타고 달릴 때, 휴게소가 없는 구간의 최댓값은 200~701구간인 501이다. 하지만, 새로운 휴게소를 451구간에 짓게 되면, 최대가 251이 되어서 최소가 된다.</p>

### 입력 

 <p>첫째 줄에 현재 휴게소의 개수 N, 더 지으려고 하는 휴게소의 개수 M, 고속도로의 길이 L이 주어진다. 둘째 줄에 현재 휴게소의 위치가 공백을 사이에 두고 주어진다. N = 0인 경우 둘째 줄은 빈 줄이다.</p>

### 출력 

 <p>첫째 줄에 M개의 휴게소를 짓고 난 후에 휴게소가 없는 구간의 최댓값의 최솟값을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 구간의 최댓값의 최솟값을 파라미터 서치로 찾는다<br>
2. 0과 L포함해서 구간 배열을 만들고 내가 넣은 파라미터로 몇개의 휴게소를 만들 수 있는 지 체크
3. 많으면 더 큰 값, 적으면 더 적은 값

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M,L;
        static int[] num, diff;
        static int cal(int k){
            int sm = 0;
            for(int i=0;i<N+1;i++){
                sm += diff[i]/k;
            }
            return sm;
        }
        static int binaryS(int l, int r, int tar){
            int ans = 1;
            while(l <= r){
                int mid = (l + r) / 2;
                int cals = cal(mid);
                if(cals <= tar ){
                    r = mid - 1;
                }else{
                    l = mid + 1;
                    ans = l;
                }
            }
            return ans;
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            L = Integer.parseInt(st.nextToken());
            num = new int[N+2];
            num[0] = 0;
            num[N+1] = L;
            diff = new int[N+1];
            st = new StringTokenizer(br.readLine());
            for(int i=0;i<N;i++){
                num[i] = Integer.parseInt(st.nextToken());
            }
            Arrays.sort(num);
            for(int i=1;i<N+2; i++){
                diff[i-1] = num[i] - num[i-1] - 1;
            }
            Arrays.sort(diff);
            int answer = binaryS(1,L-1,M);
            System.out.println(answer);
        }
    }
    ```
## 03. 회고
- *주의 !!* 이분 탐색 값을 무엇으로 정하냐 <br>
- 이분탐색할 대상을 잘 정해줘야함 -> 내가 구해야 하는 답으로 정하기
- upper bound냐 lower bound냐 생각잘하기