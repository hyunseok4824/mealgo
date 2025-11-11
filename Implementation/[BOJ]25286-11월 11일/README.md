- **문제** : 백준 25286번 - 11월 11일
- **난이도** : 브론즈 3
- **문제 유형** : 구현
- **푼 언어** : java

## 01. 문제 설명

11월 11일에는 농업인의 날, 가래떡 데이, 보행자의 날, 대한민국 해군 창설 기념일, 유엔참전용사 추모의 날, 빼빼로 데이 등 다양한 의미를 가진 날이다. 성현이는 11월 11일의 11일 전은 10월 31일, 즉 할로윈 데이라는 것을 깨달았고, 다음 할로윈 데이 때 친구에게 빼빼로를 받아낼 계획을 세우고 있다.

성현이는 문득 11월 11일처럼 
$m$월 
$m$일의 
$m$일 전이 또 다른 기념일인 
$m$이 있는지 궁금해졌다. 
$m$월 
$m$일의 
$m$일 전의 날짜를 구하는 프로그램을 만들어보자.

1, 3, 5, 7, 8, 10, 12월은 31일까지, 4, 6, 9, 11월은 30일까지 있으며, 2월은 평년에는 28일, 윤년에는 29일까지 있다. 윤년이란, 연도가 100의 배수를 제외한 4의 배수이거나 400의 배수인 해를 의미한다.

### 입력 

첫째 줄에 계산해야 하는 날짜의 수 
$T$가 주어진다. (
$1 \leq T \leq 1\,212$)

둘째 줄부터 
$T$개의 줄에 날짜가 한 줄에 하나씩 주어진다. 날짜는 연도와 달을 의미하는 
$y_i, m_i$가 공백으로 구분되어 주어진다. (
$2000 \leq y_i \leq 2100$, 
$1 \leq m_i \leq 12$)

### 출력 

 
$T$개의 줄에 걸쳐 정답을 출력한다.

 
$i$번째 줄에 
$y_i$년 
$m_i$월 
$m_i$일의 
$m_i$일 전 날짜를 연, 월, 일 순으로 공백으로 구분해서 출력한다.

## 02. 문제 풀이

- 방법 <br>
1. 분기 처리 <br>


    <코드>
    ```java
    import java.util.*;
    import java.io.*;

    public class Main
    {
        static int T,Y,M;
        static int[] month = new int[]{0,31,28,31,30,31,30,31,31,30,31,30,31};
        static boolean check(int y){   
            if(y%400 == 0){
                return true;
            }
            if(y%4==0){
                if(y % 100 == 0){
                    return false;
                }else{
                    return true;
                }
            }
            return false;
        }
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            T = Integer.parseInt(br.readLine());
            while(T -- > 0){
                StringTokenizer st = new StringTokenizer(br.readLine());
                Y = Integer.parseInt(st.nextToken());
                M = Integer.parseInt(st.nextToken());
                if(M==1){
                    M = 13;
                    Y -= 1;
                }
                int day = month[M-1];
                if(M == 3){
                    if(check(Y)){
                        day += 1;
                    }
                }
                System.out.println(Y + " " + (M-1) + " " + day);
            }
        }
    }
    ```

## 03. 회고
- 쉬운 구현
- 빠르게 풀자..