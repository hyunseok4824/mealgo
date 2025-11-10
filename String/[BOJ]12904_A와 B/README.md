- **문제** : 백준 12904번 - A와 B
- **난이도** : 골드 5
- **문제 유형** : 문자열
- **푼 언어** : java

## 01. 문제 설명

<p>수빈이는 A와 B로만 이루어진 영어 단어가 존재한다는 사실에 놀랐다. 대표적인 예로 AB (Abdominal의 약자), BAA (양의 울음 소리), AA (용암의 종류), ABBA (스웨덴 팝 그룹)이 있다.</p>

<p>이런 사실에 놀란 수빈이는 간단한 게임을 만들기로 했다. 두 문자열 S와 T가 주어졌을 때, S를 T로 바꾸는 게임이다. 문자열을 바꿀 때는 다음과 같은 두 가지 연산만 가능하다.</p>

<ul>
	<li>문자열의 뒤에 A를 추가한다.</li>
	<li>문자열을 뒤집고 뒤에 B를 추가한다.</li>
</ul>

<p>주어진 조건을 이용해서 S를 T로 만들 수 있는지 없는지 알아내는 프로그램을 작성하시오. </p>

### 입력 

 <p>첫째 줄에 S가 둘째 줄에 T가 주어진다. (1 ≤ S의 길이 ≤ 999, 2 ≤ T의 길이 ≤ 1000, S의 길이 < T의 길이)</p>

### 출력 

 <p>S를 T로 바꿀 수 있으면 1을 없으면 0을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 그리디하게 생각해서 역추적으로 푼다<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main {
        static String S,T;
        static int ans = 0;
        static StringBuilder sb = new StringBuilder();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            S = br.readLine();
            T = br.readLine();
            while(true){
                if(T.length()==S.length()){
                    if(T.equals(S)){
                        ans = 1;
                    }
                    break;
                }else if(T.length() < S.length()){
                    break;
                }
                char c = T.charAt(T.length()-1);
                if(c == 'B'){
                    sb = new StringBuilder();
                    sb.append(T.substring(0,T.length()-1)).reverse();
                    T = sb.toString();
                }else if(c== 'A'){
                    T = T.substring(0,T.length()-1);
                }
            }
            System.out.println(ans);
        }
    }


    ```

## 03. 회고
- 백트래킹으로는 못품<br>
- n이 작은문제에서 백트래킹으로 풀게되면, sb 두개 따로 만들어서 관리 vs 시간 복잡도 크더라도 문자열 + 연산으로 관리해야함<br>