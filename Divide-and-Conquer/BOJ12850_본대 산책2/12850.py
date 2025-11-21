D = int(input())
MOD = 1_000_000_007

graph = [[0] * 8 for _ in range(8)]
graph[0][1] = graph[0][3] = 1
graph[1][0] = graph[1][2] = graph[1][3] = 1
graph[2][1] = graph[2][3] = graph[2][4] = graph[2][5] = 1
graph[3][0] = graph[3][1] = graph[3][2] = graph[3][5] = 1
graph[4][2] = graph[4][5] = graph[4][6] = 1
graph[5][2] = graph[5][3] = graph[5][4] = graph[5][7] = 1
graph[6][4] = graph[6][7] = 1
graph[7][5] = graph[7][6] = 1

def divide(arr, n):
    if n == 1:
        return arr
    half = divide(arr, n // 2)
    half_sq = multiply(half, half)
    if n % 2 == 0:
        return half_sq

    else :
        return multiply(half_sq, arr)

def multiply(arr1, arr2):
    result = [[0] * 8 for _ in range(8)]
    for i in range(8):
        for j in range(8):
            for k in range(8):
                result[i][j] += arr1[i][k] * arr2[k][j]
            result[i][j] %= MOD
    return result

ans = divide(graph, D)
print(ans[0][0])