import java.util.*;

class Solution {
    public int solution(int n, int[][] computers) {
        boolean[] visited = new boolean[n];
        int networks = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(i, computers, visited, n);
                networks++;
            }
        }
        return networks;
    }

    private void dfs(int start, int[][] computers, boolean[] visited, int n) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(start);
        visited[start] = true;

        while (!stack.isEmpty()) {
            int node = stack.pop();

            for (int next = 0; next < n; next++) {
                if (computers[node][next] == 1 && !visited[next]) {
                    visited[next] = true;   
                    stack.push(next);       
                }
            }
        }
    }
}