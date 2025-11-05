- **문제** : 백준 17281번 - ⚾
- **난이도** : 골드 4
- **문제 유형** : 시뮬레이셔
- **푼 언어** : java

## 01. 문제 설명

<p>⚾는 9명으로 이루어진 두 팀이 공격과 수비를 번갈아 하는 게임이다. 하나의 이닝은 공격과 수비로 이루어져 있고, 총 N이닝 동안 게임을 진행해야 한다. 한 이닝에 3아웃이 발생하면 이닝이 종료되고, 두 팀이 공격과 수비를 서로 바꾼다.</p>

<p>두 팀은 경기가 시작하기 전까지 타순(타자가 타석에 서는 순서)을 정해야 하고, 경기 중에는 타순을 변경할 수 없다. 9번 타자까지 공을 쳤는데 3아웃이 발생하지 않은 상태면 이닝은 끝나지 않고, 1번 타자가 다시 타석에 선다. 타순은 이닝이 변경되어도 순서를 유지해야 한다. 예를 들어, 2이닝에 6번 타자가 마지막 타자였다면, 3이닝은 7번 타자부터 타석에 선다.</p>

<p>공격은 투수가 던진 공을 타석에 있는 타자가 치는 것이다. 공격 팀의 선수가 1루, 2루, 3루를 거쳐서 홈에 도착하면 1점을 득점한다. 타자가 홈에 도착하지 못하고 1루, 2루, 3루 중 하나에 머물러있을 수 있다. 루에 있는 선수를 주자라고 한다. 이닝이 시작될 때는 주자는 없다.</p>

<p>타자가 공을 쳐서 얻을 수 있는 결과는 안타, 2루타, 3루타, 홈런, 아웃 중 하나이다. 각각이 발생했을 때, 벌어지는 일은 다음과 같다.</p>

<ul>
	<li>안타: 타자와 모든 주자가 한 루씩 진루한다.</li>
	<li>2루타: 타자와 모든 주자가 두 루씩 진루한다.</li>
	<li>3루타: 타자와 모든 주자가 세 루씩 진루한다.</li>
	<li>홈런: 타자와 모든 주자가 홈까지 진루한다.</li>
	<li>아웃: 모든 주자는 진루하지 못하고, 공격 팀에 아웃이 하나 증가한다.</li>
</ul>

<p>한 야구팀의 감독 아인타는 타순을 정하려고 한다. 아인타 팀의 선수는 총 9명이 있고, 1번부터 9번까지 번호가 매겨져 있다. 아인타는 자신이 가장 좋아하는 선수인 1번 선수를 4번 타자로 미리 결정했다. 이제 다른 선수의 타순을 모두 결정해야 한다. 아인타는 각 선수가 각 이닝에서 어떤 결과를 얻는지 미리 알고 있다. 가장 많은 득점을 하는 타순을 찾고, 그 때의 득점을 구해보자.</p>

### 입력 

 <p>첫째 줄에 이닝 수 N(2 ≤ N ≤ 50)이 주어진다. 둘째 줄부터 N개의 줄에는 각 선수가 각 이닝에서 얻는 결과가 1번 이닝부터 N번 이닝까지 순서대로 주어진다. 이닝에서 얻는 결과는 9개의 정수가 공백으로 구분되어져 있다. 각 결과가 의미하는 정수는 다음과 같다.</p>

<ul>
	<li>안타: 1</li>
	<li>2루타: 2</li>
	<li>3루타: 3</li>
	<li>홈런: 4</li>
	<li>아웃: 0</li>
</ul>

<p>각 이닝에는 아웃을 기록하는 타자가 적어도 한 명 존재한다.</p>

### 출력 

 <p>아인타팀이 얻을 수 있는 최대 점수를 출력한다.</p>

## 02. 문제 풀이

- 방법 <br>
1. 시뮬레이션 -> base를 구장처럼 두고, 관리 -> 인덱스는 3루부터 돈다<br>
2. 순열 만들기 -> dfs사용 -> 고정해야할 값 처리 따로 해준다<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N = 9;
        static int M, ans;
        static int outCount = 0;
        static int[] base = new int[5];
        static int batter;
        static int[][] in;
        static int inn = 0;
        static int[] arr,vis;
        static int go(int[] arr){
            int batterIdx = 0;
            int total = 0;
            base = new int[5];
            outCount = 0;
            for(int t = 0; t<M;t++){
                inn = t;
                base = new int[5];
                outCount = 0;
                while(outCount < 3){
                    int batter = arr[batterIdx];
                    int op = in[inn][batter];
                    batterIdx = (batterIdx+1) % 9;
                    if(op == 0) {
                        outCount+=1;
                    }else{
                        for(int i=3;i>0;i--){
                            if(base[i]!=0){
                                base[Math.min(4,i+op)] += 1;
                                base[i] = 0;
                            }
                        }
                        base[op] += 1;
                    }
                    total += base[4];
                    base[4] = 0;
                }
            }
            return total;
        }
        static void dfs(int k){
            if(k==N){
                ans = Math.max(ans,go(arr));
                return;
            }
            if(k==3){
                arr[3] = 0;
                dfs(k+1);
                return;
            }
            for(int i=1;i<N;i++){
                if(vis[i]==0){
                    vis[i] = 1;
                    arr[k] = i;
                    dfs(k+1);
                    vis[i] = 0;
                }
            }
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            M = Integer.parseInt(br.readLine());
            arr = new int[N]; vis = new int[N];
            arr[3] = 1; vis[0] = 1;
            in = new int[M][9];
            for(int i=0;i<M;i++){
                StringTokenizer st = new StringTokenizer(br.readLine());
                for(int j=0;j<9;j++){
                    in[i][j] = Integer.parseInt(st.nextToken());
                }        
            }
            dfs(0);
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
*주의 !!* 야알못 탈출 <br>
- 순열 하나 고정하는 아이디어<br>
- for문 어떤 기준으로 돌릴것인지 -> 이닝 기준, 타자 기준 -> 이닝 기준이 훨씬 쉽다<br>
- 초기화 어떤 시점에 어떤거 할 건지 잘 관리<br>