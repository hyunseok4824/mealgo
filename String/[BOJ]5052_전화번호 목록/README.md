- **문제** : 백준 5052번 - 전화번호 목록
- **난이도** : 골드 4
- **문제 유형** : 문자열
- **푼 언어** : java

## 01. 문제 설명

<p>전화번호 목록이 주어진다. 이때, 이 목록이 일관성이 있는지 없는지를 구하는 프로그램을 작성하시오.</p>

<p>전화번호 목록이 일관성을 유지하려면, 한 번호가 다른 번호의 접두어인 경우가 없어야 한다.</p>

<p>예를 들어, 전화번호 목록이 아래와 같은 경우를 생각해보자</p>

<ul>
	<li>긴급전화: 911</li>
	<li>상근: 97 625 999</li>
	<li>선영: 91 12 54 26</li>
</ul>

<p>이 경우에 선영이에게 전화를 걸 수 있는 방법이 없다. 전화기를 들고 선영이 번호의 처음 세 자리를 누르는 순간 바로 긴급전화가 걸리기 때문이다. 따라서, 이 목록은 일관성이 없는 목록이다. </p>

### 입력 

 <p>첫째 줄에 테스트 케이스의 개수 t가 주어진다. (1 ≤ t ≤ 50) 각 테스트 케이스의 첫째 줄에는 전화번호의 수 n이 주어진다. (1 ≤ n ≤ 10000) 다음 n개의 줄에는 목록에 포함되어 있는 전화번호가 하나씩 주어진다. 전화번호의 길이는 길어야 10자리이며, 목록에 있는 두 전화번호가 같은 경우는 없다.</p>

### 출력 

 <p>각 테스트 케이스에 대해서, 일관성 있는 목록인 경우에는 YES, 아닌 경우에는 NO를 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 정렬하고 앞의 문자열이 뒤의 문자열에 포함되는지 - startsWith()으로 확인<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main {
        static int t,n, flag;
        static String bs, num;
        static String[] nums;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            t = Integer.parseInt(br.readLine());
            while(t-- > 0){
                n = Integer.parseInt(br.readLine());
                flag = 0;
                nums = new String[n];
                for(int i=0;i<n;i++){
                    num = br.readLine();
                    nums[i] = num;
                }
                Arrays.sort(nums);
                for(int i=1;i<n;i++){
                    if(nums[i].startsWith(nums[i-1])){
                        flag = 1;
                    }
                }
                if(flag == 0){
                    System.out.println("YES");
                }else{
                    System.out.println("NO");
                }
            }
        }
    }

    ```

## 03. 회고
- 트라이로도 풀 수 있다
- 자바 문자열은 힘들다..