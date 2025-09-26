- **문제** : 백준 1644번 - 소수의 연속합
- **난이도** : 골드 3
- **문제 유형** : Two Pointer
- **푼 언어** : java

## 01. 문제 설명

<<p>하나 이상의 연속된 소수의 합으로 나타낼 수 있는 자연수들이 있다. 몇 가지 자연수의 예를 들어 보면 다음과 같다.</p>

<ul>
	<li>3 : 3 (한 가지)</li>
	<li>41 : 2+3+5+7+11+13 = 11+13+17 = 41 (세 가지)</li>
	<li>53 : 5+7+11+13+17 = 53 (두 가지)</li>
</ul>

<p>하지만 연속된 소수의 합으로 나타낼 수 없는 자연수들도 있는데, 20이 그 예이다. 7+13을 계산하면 20이 되기는 하나 7과 13이 연속이 아니기에 적합한 표현이 아니다. 또한 한 소수는 반드시 한 번만 덧셈에 사용될 수 있기 때문에, 3+5+5+7과 같은 표현도 적합하지 않다.</p>

<p>자연수가 주어졌을 때, 이 자연수를 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에 자연수 N이 주어진다. (1 ≤ N ≤ 4,000,000)</p>

### 출력 

 <p>첫째 줄에 자연수 N을 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 출력한다.</p>


## 02. 문제 풀이

1. 방법 (나의 풀이)<br>
    1. 에라토스테네스의 체로 소수 배열 만듦 -> O(NloglogN)<br>
    2. 투 포인터 이용해서 연속합 구함 -> O(N) <br> 


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N;
        static ArrayList<Integer> pnum = new ArrayList<>();
        static boolean[] isP;
        static void isPrime(int k){
            isP = new boolean[k+1];
            Arrays.fill(isP, true);
            isP[0] = false; isP[1] = false;
            for(int i=2;i<=Math.sqrt(k);i++){
                if(isP[i]){
                    for(int j=i*i; j<=k;j+=i){
                        isP[j] = false;
                    }
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            if(N < 2){
                System.out.println(0);
                return;
            }
            isPrime(N);
            for(int i=2;i<=N;i++){
                if(isP[i] == false) continue;
                pnum.add(i);
            }	
            int ans = 0;
            int st = 0; int en = 1; int sm = pnum.get(0);
            while(true){
                if(sm >= N){
                    if(sm == N) ans+=1;
                    sm -= pnum.get(st++);
                }else if(en == pnum.size()){
                    break;
                }else{
                    sm += pnum.get(en++);
                }
            }
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
- *주의 !!* sm == N 확인 시점<br>
시작 즉시 정답인 케이스 확인<br>
확인하고 부분합 감소<br>