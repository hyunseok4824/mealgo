- **문제** : 백준 20955번 - 민서의 응급 수술
- **난이도** : 골드 5
- **문제 유형** : Union-Find
- **푼 언어** : java

## 01. 문제 설명

<p>민서는 강원대학교 컴퓨터공학과의 신임 교수이다. 그녀가 저술한 효율적인 택배 배달을 위한 최적 경로 설계에 관한 연구 논문은 아직도 널리 인용되고 있다. 오늘도 열심히 강의를 하던 민서는 놀라 자빠질 수밖에 없었다. 한 학생이 꾸벅꾸벅 졸다가 책상에 머리를 아주 세게 박았기 때문이다. 한시라도 수술이 시급한 상황, 민서는 의사가 되어 수술을 집도하기로 결심하였다.</p>

<p>사람의 뇌는 수백억 개의 뉴런으로 구성되며, 각 뉴런은 시냅스를 통하여 연결된다. 민서의 진찰 결과, 학생은 뇌 속의 일부 뉴런의 연결이 끊어져 잠이 든 것으로 확인되었다. 끊어진 시냅스만 복구된다면 학생은 잠에서 깨어나겠지만, 알다시피 민서는 컴퓨터공학과 교수이다.</p>

<p>민서는 끊어진 시냅스를 복구하는 대신 뇌 속의 모든 뉴런을 하나의 트리 형태로 연결해보고자 한다. 여기서 트리란 사이클이 존재하지 않는 연결 그래프를 의미한다.</p>

<p>민서는 손기술이 뛰어나기 때문에 다음과 같은 연산을 무한히 수행할 수 있다. 연결되지 않은 두 뉴런을 연결하거나 이미 연결된 두 뉴런의 연결을 끊는다.</p>

<p>뉴런의 연결 정보가 주어졌을 때, 모든 뉴런을 하나의 트리 형태로 연결하기 위하여 필요한 최소 연산 횟수를 구하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫 번째 줄에 뉴런의 개수 N과 시냅스의 개수 M이 주어진다.</p>

<p>이후 M개의 줄에 걸쳐 시냅스로 연결된 두 뉴런의 번호 u, v가 주어진다.</p>

<p>모든 입력은 공백으로 구분되어 주어진다.</p>

### 출력 

 <p>첫 번째 줄에 모든 뉴런을 트리 형태로 연결하기 위하여 필요한 최소 연산 횟수를 출력한다.</p>


## 02. 문제 풀이

1. 방법 (나의 풀이)<br>
    1. Union 함수를 이용해서 루트 노드가 같으면 사이클 존재 <br>
    2. Find 함수를 이용해서 내가 루트 노드인지 판단 -> 컴포넌트 수 찾기 <br> 


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,M;
        static int[] p,r;
        static int find(int x){
            if(x==p[x]){
                return x;
            }
            return p[x] = find(p[x]);
        }
        static boolean union(int a, int b){
            a = find(a); b = find(b);
            if(a==b) return false;
            if(r[a] < r[b]){
                p[a] = b;
            }else{
                p[b] = a;
                if(r[a] == r[b]){
                    r[a]+=1;
                }
            }
            return true;
        }


        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            int cnt = 0;
            p = new int[N+1];
            r = new int[N+1];
            for(int i=1;i<=N;i++){
                p[i] = i;
            }
            for(int i=0;i<M;i++){
                st = new StringTokenizer(br.readLine());
                int u = Integer.parseInt(st.nextToken());
                int v = Integer.parseInt(st.nextToken());
                if(union(u,v) == false){
                    cnt += 1;
                }
            }
            int Ccnt = 0;
            for(int i=1;i<=N;i++){
                if(find(i) == i){
                    Ccnt += 1;
                }
            }
            System.out.println(Ccnt - 1 + cnt);
        }
    }
    ```

## 03. 회고
- *주의 !!* DFS 사이클 판별로 못 푸는 이유<br>
한 컴포넌트에 사이클이 여려개일 수 있다<br>
boolean 체크만으로는 힘듦 <- 간선의 유무만 체크