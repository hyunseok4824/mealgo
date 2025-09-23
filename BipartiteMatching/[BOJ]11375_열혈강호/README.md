- **문제** : 백준 11375번 - 열혈강호
- **난이도** : 플래티넘 4
- **문제 유형** : 이분매칭
- **푼 언어** : python

## 01. 문제 설명
강호네 회사에는 직원이 N명이 있고, 해야할 일이 M개가 있다. 직원은 1번부터 N번까지 번호가 매겨져 있고, 일은 1번부터 M번까지 번호가 매겨져 있다.

각 직원은 자신이 할 수 있는 일들 중 한 개의 일만 담당할 수 있고, 각각의 일을 담당하는 사람은 1명이어야 한다.

각각의 직원이 할 수 있는 일의 목록이 주어졌을 때, M개의 일 중에서 최대 몇 개를 할 수 있는지 구하는 프로그램을 작성하시오.

### 입력
첫째 줄에 직원의 수 N과 일의 개수 M이 주어진다. (1 ≤ N, M ≤ 1,000)

둘째 줄부터 N개의 줄의 i번째 줄에는 i번 직원이 할 수 있는 일의 개수와 할 수 있는 일의 번호가 주어진다.

### 출력
첫째 줄에 강호네 회사에서 할 수 있는 일의 개수를 출력한다.

## 02. 문제 풀이
직원과 일을 연결하는 그래프에서, 각 직원이 할 수 있는 일을 DFS로 탐색하면서 매칭을 시도한다. 일이 비어있거나 현재 일을 맡은 직원을 다른 일로 옮길 수 있으면 매칭을 갱신한다. 이 과정을 모든 직원에 대해 반복하면, 최대 매칭 수가 곧 할 수 있는 일의 최대 개수가 된다.

  <코드>
  ```python
import sys
sys.setrecursionlimit(100000)

def dfs(x):
    for work in task[x]:
        if not visited[work]:
            visited[work] = True
            if selected[work] == -1 or dfs(selected[work]):
                selected[work] = x
                return True

    return False

N, M = map(int, input().split())  # N : 직원 수, M : 해야할 일의 개수
task = [list(map(int, input().split()))[1:] for _ in range(N)]
selected = [-1] * (M+1)
result = 0

for i in range(N):
    visited = [False] * (M+1)
    if dfs(i):
        result += 1

print(result)
```
## 03. 회고
처음 접해보는 알고리즘이라 아직 제대로 이해하지 못했다. 따로 공부하면서 최적화까지 진행해봐야겠다.