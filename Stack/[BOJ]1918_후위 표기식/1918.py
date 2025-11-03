expression = input()  # 수식
stack = []
result = ''
operator = {'+', '-', '*', '/'}
rank = {'+': 1, '-': 1, '*': 2, '/': 2}

for ch in expression:
    if 'A' <= ch <= 'Z':
            result += ch

    elif ch == '(':
        stack.append(ch)

    elif ch == ')' :
        while stack[-1] != '(':
            result += stack.pop()

        stack.pop()  # '(' 제거

    else:
        while stack and stack[-1] in operator and rank[stack[-1]] >= rank[ch]:
            result += stack.pop()

        stack.append(ch)


while stack:
    result += stack.pop()

print(result)