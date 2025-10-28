- **문제** : 백준 7662번: 이중 우선순위 큐
- **난이도** : 골드 4
- **문제 유형** : 힙 정렬
- **푼 언어** : Javascript

## 01. 문제 설명
이중 우선순위 큐(dual priority queue)는 전형적인 우선순위 큐처럼 데이터를 삽입, 삭제할 수 있는 자료 구조이다. 전형적인 큐와의 차이점은 데이터를 삭제할 때 연산(operation) 명령에 따라 우선순위가 가장 높은 데이터 또는 가장 낮은 데이터 중 하나를 삭제하는 점이다. 이중 우선순위 큐를 위해선 두 가지 연산이 사용되는데, 하나는 데이터를 삽입하는 연산이고 다른 하나는 데이터를 삭제하는 연산이다. 데이터를 삭제하는 연산은 또 두 가지로 구분되는데 하나는 우선순위가 가장 높은 것을 삭제하기 위한 것이고 다른 하나는 우선순위가 가장 낮은 것을 삭제하기 위한 것이다.

정수만 저장하는 이중 우선순위 큐 Q가 있다고 가정하자. Q에 저장된 각 정수의 값 자체를 우선순위라고 간주하자.

Q에 적용될 일련의 연산이 주어질 때 이를 처리한 후 최종적으로 Q에 저장된 데이터 중 최댓값과 최솟값을 출력하는 프로그램을 작성하라.

### 입력
입력 데이터는 표준입력을 사용한다. 입력은 T개의 테스트 데이터로 구성된다. 입력의 첫 번째 줄에는 입력 데이터의 수를 나타내는 정수 T가 주어진다. 각 테스트 데이터의 첫째 줄에는 Q에 적용할 연산의 개수를 나타내는 정수 k (k ≤ 1,000,000)가 주어진다. 이어지는 k 줄 각각엔 연산을 나타내는 문자(‘D’ 또는 ‘I’)와 정수 n이 주어진다. ‘I n’은 정수 n을 Q에 삽입하는 연산을 의미한다. 동일한 정수가 삽입될 수 있음을 참고하기 바란다. ‘D 1’는 Q에서 최댓값을 삭제하는 연산을 의미하며, ‘D -1’는 Q 에서 최솟값을 삭제하는 연산을 의미한다. 최댓값(최솟값)을 삭제하는 연산에서 최댓값(최솟값)이 둘 이상인 경우, 하나만 삭제됨을 유념하기 바란다.

만약 Q가 비어있는데 적용할 연산이 ‘D’라면 이 연산은 무시해도 좋다. Q에 저장될 모든 정수는 $-2^{31}$ 이상 $2^{31}$ 미만인 정수이다.

### 출력
출력은 표준출력을 사용한다. 각 테스트 데이터에 대해, 모든 연산을 처리한 후 Q에 남아 있는 값 중 최댓값과 최솟값을 출력하라. 두 값은 한 줄에 출력하되 하나의 공백으로 구분하라. 만약 Q가 비어있다면 ‘EMPTY’를 출력하라.

## 02. 문제 풀이 
힙을 사용하여 문제를 해결하는 문제다. 최소 힙과 최대 힙을 만들어 원소를 삽입하고 삭제하는데 사용한다. 이번 문제에서 제일 중요한 것은 최소 힙과 최대 힙, 두 힙 중 한 곳에서 삭제된 데이터가 다른 힙에도 반영되어야 한다는 것이다. 즉 동기화가 되어야 한다. 이 동기화 작업을 위해 `counters`라는 딕셔너리를 이용하였다. 

방법은 다음과 같다. 데이터를 삽입할 때마다 각각의 힙에 넣어준다. 이때 `counters`에 원소를 key로, 지금까지 넣은 원소의 개수를 value로 매핑해서 넣는다.

반면 삭제할 때에는 1이면 최대힙에서, -1이면 최소힙에서 데이터를 제거한다. 이때 `counters`가 0이거나 없는 것은 이미 다른 힙에서 삭제한 것이기 때문에, `counters`에 남아있는 원소가 나올때까지 제거한다. 만약 `counters[top]`가 0이 되었으면 `counters`에서 제거하여 메모리를 절약한다.

모든 연산이 끝나고, 동기화 작업을 한 다음에 두 힙에서 각각 가장 위에 있는 데이터를 출력하면 된다.



<코드>
```python
import sys
import heapq

input = sys.stdin.readline

def isEmpty(counters):
    for item in counters:
        if item[1] > 0:
            return False
    return True

T = int(input())   # 테스트 케이스 수

for _ in range(T):
    min_heap = []
    max_heap = []
    counters = {}  # 큐에 담긴 요소 종류와 개수 
    K = int(sys.stdin.readline())  # 연산의 개수
    
    for _ in range(K):
        command, num = input().split()
        num = int(num)
        
        if command == 'I':
            # 중복 삽입일 때
            if num in counters:
                counters[num] += 1
            # 처음 삽입일 때
            else:
                counters[num] = 1
                # min_heap에 추가
                heapq.heappush(min_heap, num)
                # max_heap에 추가
                heapq.heappush(max_heap, -num)
                
        elif command == 'D':
            # 큐가 비어있지 않을 때만
            if not isEmpty(counters.items()):
                # 최댓값을 제거
                if num == 1:
                    # 이미 제거된 요소들 제거
                    while -max_heap[0] not in counters or counters[-max_heap[0]] < 1:
                        temp = -heapq.heappop(max_heap)
                        if temp in counters:
                            del(counters[temp])
                    counters[-max_heap[0]] -= 1
                # 최솟값을 제거
                else:
                    # 이미 제거된 요소들 제거
                    while min_heap[0] not in counters or counters[min_heap[0]] < 1:
                        temp = heapq.heappop(min_heap)
                        if temp in counters:
                            del(counters[temp])
                    counters[min_heap[0]] -= 1
     
    
    # 결과 출력           
    if isEmpty(counters.items()):
        print('EMPTY')
    else:
        while min_heap[0] not in counters or counters[min_heap[0]] < 1:
            heapq.heappop(min_heap)
        while -max_heap[0] not in counters or counters[-max_heap[0]] < 1:
            heapq.heappop(max_heap)
        print(-max_heap[0], min_heap[0])
```
## 회고
- 메소드를 잘 알면 쉽게 풀 수 있는 문제였다. 언어 공부를 열심히 하자