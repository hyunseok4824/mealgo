

# 📘 문제 정리: 피로도 (완전탐색)

* **문제 번호** : 프로그래머스 - 피로도
* **난이도** : 2
* **문제 유형** : 완전탐색 (DFS / 백트래킹)
* **사용 언어** : Java

---

## 01. 문제 설명

게임에서 유저는 일정한 **피로도(k)** 를 가지고 있으며,
각 던전은 다음 두 가지 정보를 가진다:

* **최소 필요 피로도** : 던전에 입장하기 위해 필요한 최소 피로도
* **소모 피로도** : 던전을 탐험할 때 실제로 소모되는 피로도

유저는 하루에 여러 개의 던전을 탐험할 수 있다.
단, 던전을 탐험하기 전에 **현재 피로도가 최소 필요 피로도 이상**이어야 하며,
탐험 후에는 **소모 피로도만큼 피로도가 감소**한다.

목표는 **현재 피로도(k)** 와 **던전 목록(dungeons)** 이 주어졌을 때,
유저가 **탐험할 수 있는 최대 던전 수**를 구하는 것이다.

---

### 🔹 입력 예시

```java
k = 80;
dungeons = [[80,20],[50,40],[30,10]];
```

### 🔹 출력 예시

```
3
```

---

## 02. 문제 풀이

### 핵심 아이디어

* 던전의 개수가 최대 8개이므로,
  가능한 모든 순서를 시도해도 계산량이 충분함함
* 각 던전을 탐험할 수 있는지 확인하면서,
  가능한 모든 탐험 경로를 DFS로 탐색
* 탐험할 때마다 피로도를 감소시키고, 방문 여부를 체크
* 탐험 가능한 던전 수를 매번 계산하여 최댓값 갱신

---

### 🧩 알고리즘 설계

1. **visited 배열**로 방문 여부 관리
2. **DFS(재귀)** 로 모든 탐험 순서 탐색
3. 조건:

   * 현재 피로도 ≥ 최소 필요 피로도
   * 탐험 후 피로도 차감
4. 탐험 가능한 던전 수의 **최댓값 기록**

---

### 💻 코드

```java
import java.util.*;

class Solution {
    static boolean[] visited;
    static int answer = 0;

    public int solution(int k, int[][] dungeons) {
        visited = new boolean[dungeons.length];
        dfs(k, dungeons, 0);
        return answer;
    }

    public void dfs(int k, int[][] dungeons, int count) {
        answer = Math.max(answer, count); // 최대 탐험 수 갱신

        for (int i = 0; i < dungeons.length; i++) {
            int need = dungeons[i][0];
            int cost = dungeons[i][1];

            if (!visited[i] && k >= need) {
                visited[i] = true;
                dfs(k - cost, dungeons, count + 1);
                visited[i] = false; // 백트래킹
            }
        }
    }
}
```
오랜만에 재귀로 풀어봄 