import java.io.*;
import java.util.*;

public class 음료얼려먹기 {
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
