- **문제** : 프로그래머스 - 타겟 넘버
- **난이도** : 레벨 2
- **문제 유형** : DFS/BFS
- **푼 언어** : java

## 01. 문제 설명

<p>n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 +, -를 붙여서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다:</p>

<p>-1+1+1+1+1 = 3<br>
+1-1+1+1+1 = 3<br>
+1+1-1+1+1 = 3<br>
+1+1+1-1+1 = 3<br>
+1+1+1+1-1 = 3</p>

<p>사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 +와 -로 연결해서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.</p>

### 제한사항

<p>• 주어지는 숫자의 개수는 2개 이상 20개 이하입니다.<br>
• 각 숫자는 1 이상 50 이하인 자연수입니다.<br>
• 타겟 넘버는 1 이상 1000 이하인 자연수입니다.</p>

### 입출력 예

<p>numbers: [1, 1, 1, 1, 1]<br>
target: 3<br>
return: 5</p>

## 02. 문제 풀이

1. 방법 (나의 풀이)<br>
    1. 스택을 이용한 반복적 DFS 구현<br>
    2. 각 숫자에 대해 +, - 두 가지 경우를 모두 탐색<br>
    3. 모든 숫자를 사용했을 때 타겟과 일치하면 카운트

    - *핵심 아이디어* : 스택을 사용한 반복적 DFS<br>
    - 각 상태를 (현재 인덱스, 현재 합)으로 표현<br>
    - 스택에 다음 탐색할 상태들을 저장하여 깊이 우선 탐색

2. 방법 (재귀적 DFS)<br>
    1. 재귀 함수로 각 숫자마다 +, - 두 가지 경우 호출<br>
    2. 기저 조건: 모든 숫자를 사용했을 때 타겟과 비교

    <코드> - 나의 풀이 (스택 기반)
    ```java
    import java.util.*;

    class Solution {
        public int solution(int[] numbers, int target) {
            int answer = 0;

            // 스택에 탐색할 상태를 저장 (index, sum)
            Stack<int[]> stack = new Stack<>();
            stack.push(new int[]{0, 0}); // 시작: index 0, sum 0

            while (!stack.isEmpty()) {
                int[] state = stack.pop();
                int idx = state[0];
                int sum = state[1];

                // 모든 숫자를 다 사용했을 때
                if (idx == numbers.length) {
                    if (sum == target) answer++;
                } else {
                    // 현재 숫자 더하기
                    stack.push(new int[]{idx + 1, sum + numbers[idx]});
                    // 현재 숫자 빼기
                    stack.push(new int[]{idx + 1, sum - numbers[idx]});
                }
            }

            return answer;
        }
    }
    ```

    <코드> - 재귀적 DFS 풀이
    ```java
    class Solution {
        public int solution(int[] numbers, int target) {
            return dfs(numbers, target, 0, 0);
        }
        
        private int dfs(int[] numbers, int target, int index, int sum) {
            if (index == numbers.length) {
                return sum == target ? 1 : 0;
            }
            
            return dfs(numbers, target, index + 1, sum + numbers[index]) +
                   dfs(numbers, target, index + 1, sum - numbers[index]);
        }
    }
    ```

## 03. 회고

- Java의 배열 초기화 문법 `new int[]{0, 0}`에 대한 익숙함 부족
- 재귀 기반 DFS 구현 경험을 바탕으로 스택 기반 반복적 DFS로 전환하여 성공
- 재귀호출의 스택오버플로우 위험성과 디버깅의 복잡성에서 탈피하여 직관적인 코드 구조 확보

