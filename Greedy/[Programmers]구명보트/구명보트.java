import java.util.*;

class Solution {
    public int solution(int[] people, int limit) {
        Arrays.sort(people); // 몸무게 정렬
        int left = 0;
        int right = people.length - 1;
        int answer = 0;

        while (left <= right) {
            if (people[left] + people[right] <= limit) {
                left++; // 가벼운 사람도 같이 태움
            }
            right--; // 무거운 사람은 항상 태움
            answer++;
        }

        return answer;
    }
}