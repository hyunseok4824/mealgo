- **문제** : 백준 2670번 - 연속부분최대곱
- **난이도** : 실버 4
- **문제 유형** : 그리디
- **푼 언어** : java

## 01. 문제 설명

<p>N개의 실수가 있을 때, 한 개 이상의 연속된 수들의 곱이 최대가 되는 부분을 찾아, 그 곱을 출력하는 프로그램을 작성하시오. 예를 들어 아래와 같이 8개의 양의 실수가 주어진다면,</p>

<p><img alt="" src="https://www.acmicpc.net/upload/images/Kr2fhViNP7YfNWrhf77jJeXwsd.png" style="width: 600px; height: 49px; "></p>

<p>색칠된 부분의 곱이 최대가 되며, 그 값은 1.638이다.</p>

### 입력 

 <p>첫째 줄은 나열된 양의 실수들의 개수 N이 주어지고, 그 다음 줄부터 N개의 수가 한 줄에 하나씩 들어 있다. N은 10,000 이하의 자연수이다. 실수는 소수점 첫째자리까지 주어지며, 0.0보다 크거나 같고, 9.9보다 작거나 같다.</p>

### 출력 

 <p>계산된 최댓값을 소수점 이하 넷째 자리에서 반올림하여 소수점 이하 셋째 자리까지 출력한다.</p>

## 02. 문제 풀이

- 3가지 방법 <br>


    방법 1. 지금 보고있는 값과 그 값과 지금까지 곱을 곱했을 때 누가 더 큰지에 따라 분기 처리 하면서 최댓값 갱신<br>

    방법 2. 완탐으로 풀기 <- 시초 안남 <br>

    방법 3. dp<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main { 
        static int N;
        static double p, mx;
        static double[] num;
        public static void main(String[] args) throws IOException { 
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            num = new double[N+1];
            for(int i=0;i<N;i++){
                num[i] = Double.parseDouble(br.readLine());
            }
            p = num[0];
            for(int i=1;i<N;i++){
                if(num[i] > p*num[i]){
                    p = num[i];
                }else{
                    p = p*num[i];
                }
                mx = Math.max(p,mx);
            }
            System.out.printf("%.3f", mx);
        } 
    }

    ```

## 03. 회고
*주의 !!* dp는 그리디하게 풀 수 있다<br>
- 실버인데 어려움<br>
- java의 `printf`익숙하지 않다