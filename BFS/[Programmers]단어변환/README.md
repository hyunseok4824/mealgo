# 프로그래머스 - 단어 변환

**난이도**: 레벨 3
**문제 유형**: BFS
**풀이 언어**: Java

## 문제

두 단어 `begin`과 `target`, 그리고 단어 집합 `words`가 있습니다.

**목표**: 한 번에 한 글자만 바꾸면서 `begin`에서 `target`으로 변환하는 **최소 단계 수**를 구하세요.

* 한 번 바꿀 때는 반드시 `words`에 있는 단어로 변환해야 합니다.
* 변환할 수 없으면 `0`을 반환합니다.

### 예시

| begin | target | words                                 | return |
| ----- | ------ | ------------------------------------- | ------ |
| hit   | cog    | ["hot","dot","dog","lot","log","cog"] | 4      |
| hit   | cog    | ["hot","dot","dog","lot","log"]       | 0      |

설명: `"hit" -> "hot" -> "dot" -> "dog" -> "cog"` (총 4단계)

## 풀이 요약

* **알고리즘**: BFS (너비우선탐색) — 각 변환 간 “거리(cost)”가 동일하므로 BFS가 최단 변환 경로를 보장
* **상태 정의**: `(단어, 단계)`
* **큐 사용**: `Deque`에 `(현재 단어, 변환 단계)` 저장
* **방문 체크**: `visited` 배열로 중복 방문 방지
* **한 글자 차이 확인**: 두 단어를 비교해 서로 다른 문자가 **1개인지** 확인
* **종료 조건**: BFS 탐색 중 `target`에 처음 도달하면 그 단계 반환

## 코드 (Java, Deque 사용)

```java
import java.util.*;

class Solution {
    public int solution(String begin, String[] target, String[] words) {
        // target이 없으면 변환 불가
        if (!Arrays.asList(words).contains(target)) return 0;

        boolean[] visited = new boolean[words.length];
        Deque<String[]> dq = new ArrayDeque<>();
        dq.addLast(new String[]{begin, "0"}); // {단어, 단계}

        while (!dq.isEmpty()) {
            String[] cur = dq.removeFirst();
            String word = cur[0];
            int steps = Integer.parseInt(cur[1]);

            for (int i = 0; i < words.length; i++) {
                if (visited[i]) continue;

                // 한 글자만 다른지 체크
                int diff = 0;
                for (int j = 0; j < word.length(); j++) {
                    if (word.charAt(j) != words[i].charAt(j)) diff++;
                    if (diff > 1) break;
                }

                if (diff == 1) {
                    if (words[i].equals(target)) return steps + 1;
                    visited[i] = true;
                    dq.addLast(new String[]{words[i], String.valueOf(steps + 1)});
                }
            }
        }

        return 0;
    }
}
```

### 다른 풀이법 (`String.equals()` 활용)

```java
import java.util.*;

class Solution {
    public int solution(String begin, String target, String[] words) {
        // target이 words에 없으면 바로 0 반환
        if (!Arrays.asList(words).contains(target)) return 0;

        boolean[] visited = new boolean[words.length];
        Deque<String[]> dq = new ArrayDeque<>();
        dq.addLast(new String[]{begin, "0"}); // {단어, 단계}

        while (!dq.isEmpty()) {
            String[] cur = dq.removeFirst();
            String word = cur[0];
            int steps = Integer.parseInt(cur[1]);

            for (int i = 0; i < words.length; i++) {
                if (visited[i]) continue;

                // 한 글자만 다른지 체크
                int diff = 0;
                for (int j = 0; j < word.length(); j++) {
                    if (word.charAt(j) != words[i].charAt(j)) diff++;
                    if (diff > 1) break;
                }

                if (diff == 1) {
                    visited[i] = true;
                    // target인지 확인할 때 equals 사용
                    if (words[i].equals(target)) return steps + 1;
                    dq.addLast(new String[]{words[i], String.valueOf(steps + 1)});
                }
            }
        }

        return 0; // 변환 불가
    }
}
```

## 회고

* BFS를 쓰면 **최단 변환 단계**를 보장할 수 있음
* `Deque`와 `{단어, 단계}` 배열 조합으로 **클래스 없이도 간단하게 구현 가능**
* `target`이 없는 경우를 미리 체크하면 불필요한 탐색을 피할 수 있음
