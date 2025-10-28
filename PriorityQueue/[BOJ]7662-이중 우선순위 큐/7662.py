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