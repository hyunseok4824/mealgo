네, 요청하신 **README 작성 규칙** 템플릿에 맞춰서 아까 구현한 **미로 탈출(BFS)** 문제를 깔끔하게 정리해 드릴게요.

---

# [이코테] 미로 탈출 - 사용자(User)

### 난이도

* 실버

### 문제 링크

* 이코테 - 미로 탈출

### 푼 언어

* Java

### 문제 설명

*  크기의 직사각형 미로가 주어지며, (1, 1) 지점에서 출발하여 (N, M) 위치에 있는 출구까지 이동해야 합니다.
* 미로에서 괴물이 있는 부분은 0으로, 괴물이 없는 부분은 1로 표시되어 있습니다.
* 한 번에 상, 하, 좌, 우로 한 칸씩 이동할 수 있으며, 탈출하기 위해 움직여야 하는 **최소 칸의 개수**를 구하는 프로그램을 작성하세요.

### 풀이 아이디어

* **BFS(너비 우선 탐색)** 활용: 가중치가 없는 그래프에서 특정 지점까지의 '최단 거리'를 구할 때는 BFS가 가장 적합합니다.
* **큐(Queue)와 데크(Deque)**: 자바의 `ArrayDeque`를 사용하여 FIFO(First-In-First-Out) 구조로 방문할 좌표들을 관리합니다.


### 코드

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] arr;
    static int n, m;
    // 상, 하, 좌, 우 방향 벡터
    static final int[] dx = {-1, 1, 0, 0};
    static final int[] dy = {0, 0, -1, 1};

    public static int bfs(int x, int y) {
        Deque<int[]> q = new ArrayDeque<>();
        q.add(new int[]{x, y});

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int sx = cur[0];
            int sy = cur[1];

            // 4방향 탐색
            for (int d = 0; d < 4; d++) {
                int nx = sx + dx[d];
                int ny = sy + dy[d];

                // 경계값 및 벽/방문 여부 체크
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                if (arr[nx][ny] != 1) continue;

                // 최단 거리 기록 및 큐에 삽입
                arr[nx][ny] = arr[sx][sy] + 1;
                q.add(new int[]{nx, ny});
            }
        }
        // 최종 목적지의 누적 거리값 반환
        return arr[n - 1][m - 1];
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());

        arr = new int[n][m];

        // 미로 데이터 입력
        for (int i = 0; i < n; i++) {
            String row = br.readLine();
            for (int j = 0; j < m; j++) {
                arr[i][j] = row.charAt(j) - '0';
            }
        }
        
        // (0, 0)에서 시작
        System.out.print(bfs(0, 0));
    }
}

```

