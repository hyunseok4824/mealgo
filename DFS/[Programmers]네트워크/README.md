# 네트워크 (프로그래머스)

* **문제** : 프로그래머스 - 네트워크
* **난이도** : 레벨 3
* **문제 유형** : DFS/BFS (그래프 탐색)
* **푼 언어** : Java

---

## 01. 문제 설명

네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다.

예를 들어,

* 컴퓨터 A와 B가 직접 연결,
* 컴퓨터 B와 C가 직접 연결

되어 있다면 A와 C도 간접적으로 연결되어 같은 네트워크 상에 있습니다.

**입력**:

* 컴퓨터 개수 `n` (1 ≤ n ≤ 200)
* 연결 정보 인접행렬 `computers` (n×n, 0/1)

**출력**:

* 네트워크의 개수

---

### 입출력 예시

| n | computers                     | return |
| - | ----------------------------- | ------ |
| 3 | \[\[1,1,0],\[1,1,0],\[0,0,1]] | 2      |
| 3 | \[\[1,1,0],\[1,1,1],\[0,1,1]] | 1      |

---

## 02. 문제 풀이

1. **방법 (Deque를 이용한 반복적 DFS)**

   * 각 컴퓨터를 노드로 생각하고, `computers`를 인접 행렬로 활용
   * 아직 방문하지 않은 노드에서 DFS 시작
   * 스택 역할을 하는 `Deque`를 사용해 깊이 우선 탐색 진행
   * 탐색이 끝날 때마다 네트워크 개수 +1

   *핵심 아이디어*

   * 상태를 `(현재 노드)`로 두고, 인접한 노드를 스택에 push
   * `visited` 배열로 방문 여부 관리

   <코드> - Deque 기반 DFS

   ```java
   import java.util.*;

   class Solution {
       public int solution(int n, int[][] computers) {
           boolean[] visited = new boolean[n];
           int answer = 0;

           for (int i = 0; i < n; i++) {
               if (!visited[i]) {
                   dfsWithDeque(i, computers, visited, n);
                   answer++;
               }
           }
           return answer;
       }

       private void dfsWithDeque(int start, int[][] computers, boolean[] visited, int n) {
           Deque<Integer> stack = new ArrayDeque<>();
           stack.push(start);
           visited[start] = true;

           while (!stack.isEmpty()) {
               int node = stack.pop();
               for (int next = 0; next < n; next++) {
                   if (computers[node][next] == 1 && !visited[next]) {
                       visited[next] = true;
                       stack.push(next);
                   }
               }
           }
       }
   }
   ```

2. **방법 (재귀적 DFS)**

   * 동일한 탐색 원리지만 재귀 호출 사용
   * 코드가 간결하지만 입력 크기에 따라 스택오버플로우 위험 존재 그래서 이걸로 안풀거임임

   <코드> - 재귀 DFS

   ```java
   class Solution {
       public int solution(int n, int[][] computers) {
           boolean[] visited = new boolean[n];
           int answer = 0;

           for (int i = 0; i < n; i++) {
               if (!visited[i]) {
                   dfsRecursive(i, computers, visited, n);
                   answer++;
               }
           }
           return answer;
       }

       private void dfsRecursive(int node, int[][] computers, boolean[] visited, int n) {
           visited[node] = true;
           for (int next = 0; next < n; next++) {
               if (computers[node][next] == 1 && !visited[next]) {
                   dfsRecursive(next, computers, visited, n);
               }
           }
       }
   }
   ```

---

## 03. 회고

* 인접 행렬 기반 그래프 탐색 문제의 전형적인 형태 → DFS/BFS 모두 응용 가능
* **Deque**를 활용한 반복 DFS 구현으로 재귀 깊이에 대한 부담이 없음
* `import java.util.*; 해야됨됨
* 반복 DFS 방식은 상태 추적을 눈으로 확인하기 쉽고, 디버깅이 직관적


