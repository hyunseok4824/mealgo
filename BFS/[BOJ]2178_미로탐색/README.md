
# 🧭 백준 2178 - 미로 탐색 (Deque 버전)

**난이도**: 실버 1
**문제 유형**: BFS (너비 우선 탐색)
**풀이 언어**: Java

---

## 🧩 문제 요약

`N×M` 크기의 미로가 주어집니다.
`1`은 이동 가능한 칸, `0`은 이동 불가능한 칸입니다.
(1,1)에서 출발해 (N,M)까지 **최소 칸 수**로 이동하는 경로를 구하세요.
시작점과 도착점도 포함합니다.

---

### 예시 입력

```
4 6
101111
101010
101011
111011
```

### 예시 출력

```
15
```

---

## ⚙️ 풀이 요약

| 항목        | 설명                                |
| --------- | --------------------------------- |
| **알고리즘**  | BFS (너비 우선 탐색)                    |
| **이유**    | 각 이동의 비용이 동일 → BFS가 최단 거리 보장      |
| **자료구조**  | `Deque<int[]>` 사용 (좌표 저장용)        |
| **상태**    | `(x, y)` 현재 위치                    |
| **이동 방향** | 상, 하, 좌, 우                        |
| **거리 계산** | `maze[nx][ny] = maze[cx][cy] + 1` |
| **방문 체크** | `visited[nx][ny] = true`          |

---

## 💻 코드 (Deque 활용)

```java
import java.io.*;
import java.util.*;

public class Main {
    static int N, M;
    static int[][] maze;
    static boolean[][] visited;
    static int[] dx = {-1, 1, 0, 0}; // 상, 하, 좌, 우
    static int[] dy = {0, 0, -1, 1};

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        maze = new int[N][M];
        visited = new boolean[N][M];

        for (int i = 0; i < N; i++) {
            String line = br.readLine();
            for (int j = 0; j < M; j++) {
                maze[i][j] = line.charAt(j) - '0';
            }
        }

        System.out.println(bfs(0, 0));
    }

    static int bfs(int x, int y) {
        Deque<int[]> dq = new ArrayDeque<>();
        dq.addLast(new int[]{x, y});
        visited[x][y] = true;

        while (!dq.isEmpty()) {
            int[] cur = dq.removeFirst();
            int cx = cur[0];
            int cy = cur[1];

            for (int i = 0; i < 4; i++) {
                int nx = cx + dx[i];
                int ny = cy + dy[i];

                if (nx >= 0 && ny >= 0 && nx < N && ny < M
                        && maze[nx][ny] == 1 && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    maze[nx][ny] = maze[cx][cy] + 1;
                    dq.addLast(new int[]{nx, ny});
                }
            }
        }

        return maze[N - 1][M - 1];
    }
}
```



### 🚫 DFS와의 차이

* DFS는 경로를 끝까지 탐색 후 돌아오기 때문에 **최단 거리 보장 X**
* BFS는 레벨(거리) 단위 탐색이라 **최단 거리 보장 O**


---

## 🗣 회고


> “BFS는 `Deque<int[]>`로 구현하면 더 빠르고 깔끔하다.
> `maze`에 거리를 누적시키면 별도의 distance 배열도 필요 없다.” ✅
