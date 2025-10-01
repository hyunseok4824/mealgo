class Solution {
    public int solution(int[][] triangle) {
        // 삼각형의 높이
        int n = triangle.length;
        
        // 아래에서부터 거꾸로 올라오면서 DP 적용
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j < triangle[i].length; j++) {
                triangle[i][j] += Math.max(triangle[i + 1][j], triangle[i + 1][j + 1]);
            }
        }
        
        // 꼭대기에 최댓값 저장됨
        return triangle[0][0];
    }
}