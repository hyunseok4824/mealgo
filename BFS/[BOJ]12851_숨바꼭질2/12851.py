from collections import deque

N, K = map(int, input().split())  # N : 수빈이 위치, K : 동생 위치
dist = [-1] * 100001
dist[N] = 0
cnt = 0
q = deque([N])

while q:
    for _ in range(len(q)):
        cur = q.popleft()

        if cur == K:
            cnt += 1
            continue

        if cur > K:
            nxt = cur - 1
            if dist[nxt] == -1:
                dist[nxt] = dist[cur] + 1
                q.append(nxt)
            elif nxt == K:
                q.append(nxt)
            continue

        candidate = [cur-1, cur+1, 2*cur]
        for nxt in candidate:
            if 0 <= nxt < 100001:
                if dist[nxt] == -1 or dist[nxt] == dist[cur] + 1:
                    dist[nxt] = dist[cur] + 1
                    q.append(nxt)
                elif nxt == K:
                    q.append(nxt)

    if cnt:
        print(dist[K])
        print(cnt)
        break
