* **문제** : 프로그래머스 - 카펫
* **난이도** : 레벨 2
* **문제 유형** : 수학 / 완전탐색(약수)
* **푼 언어** : Java

## 01. 문제 설명

가로 `w`, 세로 `h`(둘 다 ≥ 3, `w ≥ h`)인 카펫에서

* 테두리(두께 1)는 갈색 칸 수: `brown = w*h - (w-2)*(h-2) = 2w + 2h - 4`
* 중앙은 노란 칸 수: `yellow = (w-2)*(h-2)`

`brown`, `yellow`가 주어질 때 `[w, h]`를 구합니다.

---

## 02. 문제 풀이

### 1) 방법 (나의 풀이: 약수 순회)

* **아이디어**: 노란 영역은 `(w-2) × (h-2)` 직사각형 → `yellow`를를 모두 보며 `w = yw + 2`, `h = yh + 2`를 만들고 `2*(w+h)-4 == brown` 이면 정답.
* **이득**: `O(√yellow)`로 빠름, 구현 간단.
* **조건**: `w ≥ h`를 위해 `(yw ≥ yh)`만 검사하면 됨.

### 2) 대안 (합·곱 이용)

* `w + h = (brown + 4) / 2`, ` (w-2)(h-2) = yellow`
* `h`를 3부터 순회하며 `w = sum - h`로 두고 노란칸 식을 검사.

---

### 코드 — 약수 순회(권장)

```java
import java.util.*;

class Solution {
    public int[] solution(int brown, int yellow) {
        // yellow = (w-2)*(h-2)
        // brown = 2*w + 2*h - 4
        for (int yh = 1; yh * yh <= yellow; yh++) {
            if (yellow % yh != 0) continue;
            int yw = yellow / yh;

            int h = yh + 2;
            int w = yw + 2;

            // 가로가 세로 이상이어야 함
            if (w < h) continue;

            if (2 * (w + h) - 4 == brown) {
                return new int[]{w, h};
            }
        }
        // 안전하게게
        return new int[]{-1, -1};
    }
}
```

**복잡도**: `O(√yellow)` / `O(1)` 추가 메모리

---

## 03. 회고

* 테두리 한 줄이라는 조건이 핵심 → 즉시 식을 세우면 탐색 범위를 줄일 수 있음.
* (w ≥ h)` 누락, `brown` 검증 미실시, 시작 크기를 3 미만으로 고려.
* 입력 범위상 `int`로 충분한가...
