import java.util.*;

class Solution {
    public int[] solution(int brown, int yellow) {
        // yellow = (w-2)*(h-2)
        // brown = 2*w + 2*h - 4
        for (int yh = 1; yh * yh <= yellow; yh++) {
            if (yellow % yh != 0) continue;
            int yw = yellow / yh;

            int h = yh + 2;
            int w = yw + 2;

            // 가로가 세로 이상이어야 함
            if (w < h) continue;

            if (2 * (w + h) - 4 == brown) {
                return new int[]{w, h};
            }
        }
        // 문제 보장상 항상 존재하지만, 안전 차원에서
        return new int[]{-1, -1};
    }
}