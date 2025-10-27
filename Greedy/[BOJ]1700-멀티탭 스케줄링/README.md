- **문제** : 백준 1700번 - 멀티탭 스케줄링
- **난이도** : 골드 1
- **문제 유형** : 그리디
- **푼 언어** : java

## 01. 문제 설명

<p>기숙사에서 살고 있는 준규는 한 개의 멀티탭을 이용하고 있다. 준규는 키보드, 헤어드라이기, 핸드폰 충전기, 디지털 카메라 충전기 등 여러 개의 전기용품을 사용하면서 어쩔 수 없이 각종 전기용품의 플러그를 뺐다 꽂았다 하는 불편함을 겪고 있다. 그래서 준규는 자신의 생활 패턴을 분석하여, 자기가 사용하고 있는 전기용품의 사용순서를 알아내었고, 이를 기반으로 플러그를 빼는 횟수를 최소화하는 방법을 고안하여 보다 쾌적한 생활환경을 만들려고 한다.</p>

<p>예를 들어 3 구(구멍이 세 개 달린) 멀티탭을 쓸 때, 전기용품의 사용 순서가 아래와 같이 주어진다면, </p>

<ol>
	<li>키보드</li>
	<li>헤어드라이기</li>
	<li>핸드폰 충전기</li>
	<li>디지털 카메라 충전기</li>
	<li>키보드</li>
	<li>헤어드라이기</li>
</ol>

<p>키보드, 헤어드라이기, 핸드폰 충전기의 플러그를 순서대로 멀티탭에 꽂은 다음 디지털 카메라 충전기 플러그를 꽂기 전에 핸드폰충전기 플러그를 빼는 것이 최적일 것이므로 플러그는 한 번만 빼면 된다. </p>

### 입력 

 <p>첫 줄에는 멀티탭 구멍의 개수 N (1 ≤ N ≤ 100)과 전기 용품의 총 사용횟수 K (1 ≤ K ≤ 100)가 정수로 주어진다. 두 번째 줄에는 전기용품의 이름이 K 이하의 자연수로 사용 순서대로 주어진다. 각 줄의 모든 정수 사이는 공백문자로 구분되어 있다. </p>

### 출력 

 <p>하나씩 플러그를 빼는 최소의 횟수를 출력하시오. </p>

## 02. 문제 풀이

1. 방법<br>
    1. 3가지 경우로 분기 - 콘센트가 비어 있는 지 / 이미 꽂혀 있음(중복) / 빼야하는 지<br>
    2. list의 size로 관리<br>
    3. 가장 나중에 다시 쓰일 걸 뽑기<br>

    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int N,K,ans;
        static int[] num;
        static List<Integer> hset = new ArrayList<>();
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            StringTokenizer st = new StringTokenizer(br.readLine());
            N = Integer.parseInt(st.nextToken());
            K = Integer.parseInt(st.nextToken());
            num = new int[K];
            st = new StringTokenizer(br.readLine());
            for(int i=0;i<K;i++){
                int k = Integer.parseInt(st.nextToken());
                num[i] = k;
            }
            for(int i=0;i<K;i++){
                int cur = num[i];
                if(hset.size() < N){
                    if (!hset.contains(cur)) hset.add(cur);
                }else if(hset.contains(cur)){
                    continue;
                }else{
                    Integer lastitem = -1;
                    Integer tar = -1;
                    for(int k : hset){
                        Integer nxt = Integer.MAX_VALUE;
                        for(int j=i+1;j<K;j++){
                            if(num[j] == k){
                                nxt = j;
                                break;
                            }
                        }
                        if(lastitem < nxt){
                            lastitem = nxt;
                            tar = k;
                        }
                    }
                    hset.remove(tar);
                    hset.add(cur);
                    ans += 1;
                }
            }
            System.out.println(ans);
        }
    }
    ```

## 03. 회고
- *주의 !!* List<Integer>.remove<br>
List<Integer>.remove는 값 제거하려면 remove((Integer)tar) / int를 넣으면 해당 인덱스 제거<br>
list가 비어있어도 중복 체크 필요 <- 엣지 테케 걸리기 쉬움!!<br>
