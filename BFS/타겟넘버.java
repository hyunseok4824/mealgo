import java.util.*;

class Solution {
    public int solution(int[][] maps) {
        int n = maps.length;
        int m = maps[0].length;

        // 시작이나 도착이 막혀 있으면 바로 -1
        if (maps[0][0] == 0 || maps[n-1][m-1] == 0) return -1;

        // 거리(=지나간 칸 수) 저장. 방문 겸용. 0이면 미방문.
        int[][] dist = new int[n][m];
        dist[0][0] = 1; // 시작 칸도 지나간 칸에 포함하므로 1부터 시작

        int[] dx = {1, -1, 0, 0};  // 남, 북, 동, 서
        int[] dy = {0, 0, 1, -1};

        Deque<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});

        // BFS (레벨 기반 for문 포함)
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                int[] cur = q.poll();
                int x = cur[0], y = cur[1];

                // 도착 지점에 도달하면 거리 반환
                if (x == n - 1 && y == m - 1) {
                    return dist[x][y];
                }

                // 4방향 탐색
                for (int d = 0; d < 4; d++) {
                    int nx = x + dx[d];
                    int ny = y + dy[d];

                    // 범위 밖, 벽(0), 이미 방문(dist>0)이면 패스
                    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                    if (maps[nx][ny] == 0) continue;
                    if (dist[nx][ny] != 0) continue;

                    dist[nx][ny] = dist[x][y] + 1;
                    q.offer(new int[]{nx, ny});
                }
            }
        }

        // 도달 불가
        return -1;
    }
}