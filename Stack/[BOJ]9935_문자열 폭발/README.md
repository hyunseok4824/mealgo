- **문제** : 백준 9935번 - 문자열 폭발
- **난이도** : 골드 4
- **문제 유형** : 스택
- **푼 언어** : java

## 01. 문제 설명

<p>상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.</p>

<p>폭발은 다음과 같은 과정으로 진행된다.</p>

<ul>
	<li>문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.</li>
	<li>새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.</li>
	<li>폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.</li>
</ul>

<p>상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.</p>

<p>폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.</p>

### 입력 

 <p>첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.</p>

<p>둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.</p>

<p>두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.</p>

### 출력 

 <p>첫째 줄에 모든 폭발이 끝난 후 남은 문자열을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. stack을 이용해서 마지막 끝 글자랑 현재 보고 있는 글자가 같으면 stack에서 타겟 문자열 만큼 pop해서 확인한다 -> sb.reverse().toString() 사용<br>
2. stack의 남은 문자열을 거꾸로 출력한다<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static Stack<Character> stack = new Stack<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            String s = br.readLine();
            String tar = br.readLine();
            int sz = tar.length();
            for(int i = 0; i<s.length();i++){
                char c = s.charAt(i);
                stack.add(c);
                if(stack.size() >= tar.length() && c == tar.charAt(tar.length()-1)){
                    StringBuilder sb = new StringBuilder();
                    for(int j=0; j<sz;j++){
                        sb.append(stack.pop());
                    }
                    if(!sb.reverse().toString().equals(tar)){
                    for(char cc : sb.toString().toCharArray()){
                        stack.add(cc);
                    }
                    }
                }
            }
            String answer = "";
            if(stack.size() == 0){
                answer = "FRULA";
            }else{
                StringBuilder ans = new StringBuilder();
                while(stack.size() != 0){
                    ans.append(stack.pop());
                }
                System.out.println(ans.reverse());
            }
            System.out.println(answer);
            
        }
    }
    ```
## 03. 회고

- *주의 !!*  sb.reverse().toString() <br>
1. 시작점 확인하기 어려우면 끝점을 잡고 거꾸로 확인한다<br>
2. reverse() 함수<br>
3. 폭발, 짝 -> stack 생각<br>
4. 전형적인 stack문제 였는데 못 떠올렸음<br>