- **문제** : 백준 11000번 - 강의실 배정
- **난이도** : 골드 4
- **문제 유형** : 우선순위 큐
- **푼 언어** : java

## 01. 문제 설명

<p>수강신청의 마스터 김종혜 선생님에게 새로운 과제가 주어졌다. </p>

<p>김종혜 선생님한테는 S<sub>i</sub>에 시작해서 T<sub>i</sub>에 끝나는 N개의 수업이 주어지는데, 최소의 강의실을 사용해서 모든 수업을 가능하게 해야 한다. </p>

<p>참고로, 수업이 끝난 직후에 다음 수업을 시작할 수 있다. (즉, T<sub>i</sub> ≤ S<sub>j</sub> 일 경우 i 수업과 j 수업은 같이 들을 수 있다.)</p>

<p>수강신청 대충한 게 찔리면, 선생님을 도와드리자!</p>

### 입력 

 <p>첫 번째 줄에 N이 주어진다. (1 ≤ N ≤ 200,000)</p>

<p>이후 N개의 줄에 S<sub>i</sub>, T<sub>i</sub>가 주어진다. (0 ≤ S<sub>i</sub> < T<sub>i</sub> ≤ 10<sup>9</sup>)</p>

### 출력 

 <p>강의실의 개수를 출력하라.</p>


## 02. 문제 풀이

1. 방법<br>
    1. 시작 시간 기준으로 정렬하기<br>
    2. pq에는 끝나는 시간 넣으면서 시작 시간과 비교하면서 체크<br> 


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,T,S;
        static class Pair{
            int x, y;
            Pair(int x, int y){
                this.x = x;
                this.y = y;
            }
        }
        static Pair[] ps;
        static PriorityQueue<Integer> pq = new PriorityQueue<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            N = Integer.parseInt(br.readLine());
            ps = new Pair[N];
            for(int i=0;i<N;i++){
                StringTokenizer st = new StringTokenizer(br.readLine());
                T = Integer.parseInt(st.nextToken());
                S = Integer.parseInt(st.nextToken());
                Pair p = new Pair(T,S);
                ps[i] = p;
            }
            Arrays.sort(ps,(o1,o2)->{
                if(o1.x == o2.x){
                    return o1.y - o2.y;
                }
                return o1.x - o2.x;
            });
            int ans = 0;
            pq.add(ps[0].y);
            for(int i=1;i<N;i++){
                if(pq.peek() <= ps[i].x){
                    pq.poll();
                }else{
                    ans +=1;
                }
                pq.add(ps[i].y);
            }
            System.out.println(ans + 1);
        }
    }
    ```

## 03. 회고
pq에 꼭 시작, 끝 점 같이 넣을 필요 없다<br>
우선 순위에 관한 것 -> pq 생각하기기<br>