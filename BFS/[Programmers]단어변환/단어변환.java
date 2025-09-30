import java.util.*;

class Solution {
    public int solution(String begin, String target, String[] words) {
        if (!Arrays.asList(words).contains(target)) return 0;

        boolean[] visited = new boolean[words.length];
        Deque<String[]> dq = new ArrayDeque<>();
        dq.addLast(new String[]{begin, "0"}); // [단어, 단계]

        while (!dq.isEmpty()) {
            String[] cur = dq.removeFirst();
            String word = cur[0];
            int steps = Integer.parseInt(cur[1]);

            for (int i = 0; i < words.length; i++) {
                if (visited[i]) continue;

                // 한 글자만 다른지 체크
                int diff = 0;
                for (int j = 0; j < word.length(); j++) {
                    if (word.charAt(j) != words[i].charAt(j)) diff++;
                    if (diff > 1) break;
                }

                if (diff == 1) {
                    if (words[i].equals(target)) return steps + 1;
                    visited[i] = true;
                    dq.addLast(new String[]{words[i], String.valueOf(steps + 1)});
                }
            }
        }
        return 0;
    }
}