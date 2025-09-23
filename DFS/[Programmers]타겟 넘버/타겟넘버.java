import java.util.*;

class Solution {
    public int solution(int[] numbers, int target) {
        int answer = 0;

        // 스택에 탐색할 상태를 저장 (index, sum)
        Stack<int[]> stack = new Stack<>();
        stack.push(new int[]{0, 0}); // 시작: index 0, sum 0

        while (!stack.isEmpty()) {
            int[] state = stack.pop();
            int idx = state[0];
            int sum = state[1];

            // 모든 숫자를 다 사용했을 때
            if (idx == numbers.length) {
                if (sum == target) answer++;
            } else {
                // 현재 숫자 더하기
                stack.push(new int[]{idx + 1, sum + numbers[idx]});
                // 현재 숫자 빼기
                stack.push(new int[]{idx + 1, sum - numbers[idx]});
            }
        }

        return answer;
    }
}