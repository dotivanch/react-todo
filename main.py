import sys
import math

arr = []

l = int(input())
n = int(input())
for i in range(n):
    st, ed = [int(j) for j in input().split()]
    arr.append([st, ed])

arr.sort()

printed = False

start = 0
for i in range(n):
    if start < arr[n][0]:
        print(start, arr[n][1])
        printed = True
    if arr[n][1] > start:
        start = arr[n][1]

if not printed:
    print('All printed')