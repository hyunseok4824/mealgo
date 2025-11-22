- **문제** : 백준 17140번 - 이차원 배열과 연산 
- **난이도** : 골드 4
- **문제 유형** : 시뮬레이션
- **푼 언어** : java

## 01. 문제 설명

<p>크기가 3×3인 배열 A가 있다. 배열의 인덱스는 1부터 시작한다. 1초가 지날때마다 배열에 연산이 적용된다.</p>

<ul>
	<li>R 연산: 배열 A의 모든 행에 대해서 정렬을 수행한다. 행의 개수 ≥ 열의 개수인 경우에 적용된다.</li>
	<li>C 연산: 배열 A의 모든 열에 대해서 정렬을 수행한다. 행의 개수 < 열의 개수인 경우에 적용된다.</li>
</ul>

<p>한 행 또는 열에 있는 수를 정렬하려면, 각각의 수가 몇 번 나왔는지 알아야 한다. 그 다음, 수의 등장 횟수가 커지는 순으로, 그러한 것이 여러가지면 수가 커지는 순으로 정렬한다. 그 다음에는 배열 A에 정렬된 결과를 다시 넣어야 한다. 정렬된 결과를 배열에 넣을 때는, 수와 등장 횟수를 모두 넣으며, 순서는 수가 먼저이다.</p>

<p>예를 들어, [3, 1, 1]에는 3이 1번, 1가 2번 등장한다. 따라서, 정렬된 결과는 [3, 1, 1, 2]가 된다. 다시 이 배열에는 3이 1번, 1이 2번, 2가 1번 등장한다. 다시 정렬하면 [2, 1, 3, 1, 1, 2]가 된다.</p>

<p>정렬된 결과를 배열에 다시 넣으면 행 또는 열의 크기가 달라질 수 있다. R 연산이 적용된 경우에는 가장 큰 행을 기준으로 모든 행의 크기가 변하고, C 연산이 적용된 경우에는 가장 큰 열을 기준으로 모든 열의 크기가 변한다. 행 또는 열의 크기가 커진 곳에는 0이 채워진다. 수를 정렬할 때 0은 무시해야 한다. 예를 들어, [3, 2, 0, 0]을 정렬한 결과는 [3, 2]를 정렬한 결과와 같다.</p>

<p>행 또는 열의 크기가 100을 넘어가는 경우에는 처음 100개를 제외한 나머지는 버린다.</p>

<p>배열 A에 들어있는 수와 r, c, k가 주어졌을 때, A[r][c]에 들어있는 값이 k가 되기 위한 최소 시간을 구해보자.</p>

### 입력 

 <p>첫째 줄에 r, c, k가 주어진다. (1 ≤ r, c, k ≤ 100)</p>

<p>둘째 줄부터 3개의 줄에 배열 A에 들어있는 수가 주어진다. 배열 A에 들어있는 수는 100보다 작거나 같은 자연수이다.</p>

### 출력 

 <p>A[r][c]에 들어있는 값이 k가 되기 위한 연산의 최소 시간을 출력한다. 100초가 지나도 A[r][c] = k가 되지 않으면 -1을 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 시뮬레이션 -> 문제 그대로 구현하면 되는데 배열을 두고 1부터 100까지 돌리면서 count 값 list에 넣는다!! <- 이 부분 생각못함<br>
2. 처음부터 배열을 100*100으로 만들고 100넘어가면 그냥 break 걸어주면 됨<br>
3. 100안넘어가면 0으로 초기화 해줘야함<br>
    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main {
        static class Pair implements Comparable<Pair> {
            int x, y;

            Pair(int x, int y) {
                this.x = x;
                this.y = y;
            }

            @Override
            public int compareTo(Pair o2) {
                if (this.y == o2.y) {
                    return this.x - o2.x;
                }
                return this.y - o2.y;
            }

        }

        static int r, c, k, rcnt, ccnt;
        static int[][] board = new int[100][100];
        static int[] count = new int[101];

        static int chk, mxchk;
        static ArrayList<Pair> alst;

        static void Rcal() {
            for (int i = 0; i < rcnt; i++) {
                alst = new ArrayList<>();
                count = new int[101];
                for (int j = 0; j < ccnt; j++) {
                    int k = board[i][j];
                    count[k] += 1;
                }
                for (int j = 1; j < 101; j++) {
                    if (count[j] > 0) {
                        alst.add(new Pair(j, count[j]));
                    }
                }
                Collections.sort(alst);
                int idx = 0;
                for (int j = 0; j < alst.size(); j++) {
                    Pair p = alst.get(j);
                    if (idx >= 99)
                        break;
                    board[i][idx++] = p.x;
                    board[i][idx++] = p.y;

                }
                ccnt = Math.max(ccnt, idx);
                for (; idx < 100; idx++) {
                    board[i][idx] = 0;
                }
            }
        }

        static void Ccal() {
            for (int j = 0; j < ccnt; j++) {
                alst = new ArrayList<>();
                count = new int[101];
                for (int i = 0; i < rcnt; i++) {
                    int k = board[i][j];
                    count[k] += 1;
                }
                for (int i = 1; i < 101; i++) {
                    if (count[i] > 0) {
                        alst.add(new Pair(i, count[i]));
                    }
                }
                Collections.sort(alst);
                int idx = 0;
                for (int i = 0; i < alst.size(); i++) {
                    Pair p = alst.get(i);
                    if (idx >= 99)
                        break;
                    board[idx++][j] = p.x;
                    board[idx++][j] = p.y;
                }

                rcnt = Math.max(rcnt, idx);
                for (; idx < 100; idx++) {
                    board[idx][j] = 0;
                }
            }
        }

        static int time = 0;

        static int go() {
            while (true) {
                if (board[r][c] == k) {
                    return time;
                }
                time += 1;
                if (time >= 101) {
                    return -1;
                }
                if (rcnt >= ccnt) {
                    Rcal();
                } else {
                    Ccal();
                }
            }
        }

        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            r = Integer.parseInt(st.nextToken()) - 1;
            c = Integer.parseInt(st.nextToken()) - 1;
            k = Integer.parseInt(st.nextToken());
            for (int i = 0; i < 3; i++) {
                st = new StringTokenizer(br.readLine());
                for (int j = 0; j < 3; j++) {
                    board[i][j] = Integer.parseInt(st.nextToken());
                }
            }
            rcnt = 3;
            ccnt = 3;
            System.out.println(go());
        }
    }
    ```

## 03. 회고
*주의 !!* 초기화 <br>
- 100안넘어가면 0으로 초기화 해줘야하는 것 생각못함<br>
- N이작으면 그냥 1~100까지 돌려보면 되는 아이디어 생각<br>
- 초기화 할 때 idx에서 시작해서 나머지 100까지 0으로 초기화 해버리면 된다<br>
- return 할 때, time 어디서 ++할지<br>