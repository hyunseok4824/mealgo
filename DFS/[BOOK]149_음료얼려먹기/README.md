네, 요청하신 **README 작성 규칙** 템플릿에 맞춰서 **음료수 얼려 먹기** 문제를 정리해 드릴게요. 이 문제는 전형적인 **연결 요소(Connected Component)**를 찾는 문제로, DFS를 활용해 풀이하셨습니다.

---

# [이코테] 음료수 얼려 먹기 - 사용자(User)

### 난이도

* 실버

### 문제 링크

* 이코테 - 음료수 얼려 먹기

### 푼 언어

* Java

### 문제 설명

*  크기의 얼음 틀이 있습니다. 구멍이 뚫려 있는 부분은 0, 칸막이가 세워져 있는 부분은 1입니다.
* 구멍이 뚫려 있는 부분끼리 상, 하, 좌, 우로 연결되어 있는 경우 서로 연결된 것으로 간주합니다.
* 이때 얼음 틀의 모양이 주어졌을 때, 생성되는 총 아이스크림의 개수를 구하는 프로그램을 작성하세요.

### 풀이 아이디어

* **DFS(깊이 우선 탐색) 활용**: 특정한 지점에서 시작하여 연결된 모든 '0'을 방문 처리해야 하므로 DFS가 적합합니다.
* **연결 요소 개수 세기**: 전체 맵을 순회하면서 아직 방문하지 않은 빈칸('0')을 발견하면 DFS를 시작하고, 아이스크림 개수(`comp`)를 1 증가시킵니다. 한 번의 DFS가 끝나면 연결된 모든 빈칸이 방문 처리('1')됩니다.
* **반복문 DFS (Stack)**: 재귀 함수 대신 `Deque`와 `ArrayDeque`를 사용하여 직접 스택을 구현했습니다. 이는 재귀 깊이 제한(Recursion Limit) 문제로부터 자유롭다는 장점이 있음음

### 코드

```java
import java.io.*;
import java.util.*;

public class 음료수얼려먹기 {
    static int n, m;
    static int[][] map; // 0: 빈칸(미방문), 1: 벽 또는 방문완료
    static final int[] dx = { -1, 1, 0, 0 };
    static final int[] dy = { 0, 0, -1, 1 };

    // 반복문 DFS (스택 사용)
    static void dfs(int sx, int sy) {
        Deque<int[]> st = new ArrayDeque<>();

        map[sx][sy] = 1; // 시작점 방문 표시
        st.push(new int[] { sx, sy });

        while (!st.isEmpty()) {
            int[] cur = st.pop();
            int x = cur[0], y = cur[1];

            // 4방향 탐색
            for (int d = 0; d < 4; d++) {
                int nx = x + dx[d];
                int ny = y + dy[d];

                // 경계 체크
                if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                    continue;
                
                // 벽이거나 이미 방문한 곳(1)이면 패스
                if (map[nx][ny] == 1)
                    continue;

                map[nx][ny] = 1; // 방문 표시
                st.push(new int[] { nx, ny });
            }
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());

        map = new int[n][m];

        // 맵 정보 입력받기
        for (int i = 0; i < n; i++) {
            String row = br.readLine();
            for (int j = 0; j < m; j++) {
                map[i][j] = row.charAt(j) - '0';
            }
        }

        int comp = 0; // 생성된 아이스크림(덩어리) 개수
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (map[i][j] == 0) { // 아직 방문하지 않은 빈칸 발견 시
                    dfs(i, j); // 연결된 모든 빈칸 방문 처리
                    comp++;    // 아이스크림 개수 증가
                }
            }
        }

        System.out.println(comp);
    }
}

```
