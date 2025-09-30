- **문제** : 백준 1202번 - 보석 도둑
- **난이도** : 골드 2
- **문제 유형** : 그리디
- **푼 언어** : python

## 01. 문제 설명
세계적인 도둑 상덕이는 보석점을 털기로 결심했다.

상덕이가 털 보석점에는 보석이 총 N개 있다. 각 보석은 무게 Mi와 가격 Vi를 가지고 있다. 상덕이는 가방을 K개 가지고 있고, 각 가방에 담을 수 있는 최대 무게는 Ci이다. 가방에는 최대 한 개의 보석만 넣을 수 있다.

상덕이가 훔칠 수 있는 보석의 최대 가격을 구하는 프로그램을 작성하시오.

### 입력
첫째 줄에 N과 K가 주어진다. (1 ≤ N, K ≤ 300,000)

다음 N개 줄에는 각 보석의 정보 Mi와 Vi가 주어진다. (0 ≤ Mi, Vi ≤ 1,000,000)

다음 K개 줄에는 가방에 담을 수 있는 최대 무게 Ci가 주어진다. (1 ≤ Ci ≤ 100,000,000)

모든 숫자는 양의 정수이다.

### 출력
첫째 줄에 상덕이가 훔칠 수 있는 보석 가격의 합의 최댓값을 출력한다.

## 02. 문제 풀이
가방을 용량 기준으로 오름차순 정렬한 뒤, 작은 가방부터 차례대로 확인한다. 
각 단계에서 현재 가방 용량보다 무게가 작거나 같은 보석들을 모두 힙에 넣는데, 힙은 보석 가치를 기준으로 최대 힙을 유지한다. 이렇게 하면 현재 가방에 들어갈 수 있는 보석들 중 가장 가치가 큰 보석이 힙의 맨 위에 오게 된다. 따라서 가방 하나당 힙에서 가장 가치가 큰 보석을 꺼내 담으면 된다.

  <코드>
```python
from heapq import heappop, heappush
from collections import defaultdict
import sys

c_input = sys.stdin.readline

N, K = map(int, c_input().split())
jewels = defaultdict(list)
for _ in range(N):
    m, v = map(int, c_input().split())
    jewels[m].append(v)

capacities = [int(c_input()) for _ in range(K)]
capacities.sort()

temp = []
ans = 0
available = sorted(jewels.keys())

i = 0

for capacity in capacities:
    while i < len(jewels) and capacity >= available[i]:
        for jewel_value in jewels[available[i]]:
            heappush(temp, -jewel_value)
        i+= 1

    if temp:
        ans -= heappop(temp)

print(ans)
  ```

## 02 - 1. 최적화 방안
해당 문제에서는 동일한 무게를 가지지만 가치가 서로 다른 보석이 존재할 수 있다. 이를 처리하기 위해 보석 정보를 무게를 key로, 해당 무게의 보석 가치를 리스트 형태로 value에 저장하는 딕셔너리로 구성하였다. 이렇게 하면 불필요한 공간 낭비를 줄일 수 있으며, 이후에는 key만 따로 배열로 추출해 정렬한 뒤 이를 활용해 탐색을 수행하였다.