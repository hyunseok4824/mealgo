- **문제** : 백준 12851번 - 숨바꼭질 2
- **난이도** : 골드 4
- **문제 유형** : BFS
- **푼 언어** : python

## 01. 문제 설명
수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 그리고, 가장 빠른 시간으로 찾는 방법이 몇 가지 인지 구하는 프로그램을 작성하시오.

### 입력
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

### 출력
첫째 줄에 수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

둘째 줄에는 가장 빠른 시간으로 수빈이가 동생을 찾는 방법의 수를 출력한다.

## 02. 문제 풀이
 해당 문제에서 주의할 점은 **가장 빠른 시간으로 찾는 방법의 수**를 구하는 것이다. 
nxt가 4이라고 가정했을때, cur(3) + 1, cur(5)-1, cur(2)*2 등 다양한 방법으로 nxt에 도달할 수 있다. 이처럼 서로 다른 cur에서 출발해 같은 시간(count+1)에 동일한 위치(nxt=4)로 도착할 수 있다.

따라서 단순히 “처음 방문했는가”만을 기준으로 처리하면 경우의 수를 놓치게 되고, **이미 방문했더라도 최단 시간(dist[cur] + 1)으로 도착한 경우라면 반드시 큐에 넣어주어야** 정확히 모든 최단 경로의 수를 셀 수 있다.

  <코드>
  ```python
from collections import deque

N, K = map(int, input().split())  # N : 수빈이 위치, K : 동생 위치
dist = [-1] * 100001
dist[N] = 0
cnt = 0
q = deque([N])

while q:
    for _ in range(len(q)):
        cur = q.popleft()

        if cur == K:
            cnt += 1
            continue

        if cur > K:
            nxt = cur - 1
            if dist[nxt] == -1:
                dist[nxt] = dist[cur] + 1
                q.append(nxt)
            elif nxt == K:
                q.append(nxt)
            continue

        candidate = [cur-1, cur+1, 2*cur]
        for nxt in candidate:
            if 0 <= nxt < 100001:
                if dist[nxt] == -1 or dist[nxt] == dist[cur] + 1:
                    dist[nxt] = dist[cur] + 1
                    q.append(nxt)
                elif nxt == K:
                    q.append(nxt)

    if cnt:
        print(dist[K])
        print(cnt)
        break

```
## 03. 회고
**방법이 몇가지인지** 구하는 것을 제대로 이해를 못하고 문제를 풀려니 계속 오답이 나왔다. 한번 방분했다고 해도 최단 경로이면, 그 경로도 q에 담아야 했다. 문제를 잘 봐야겠다.