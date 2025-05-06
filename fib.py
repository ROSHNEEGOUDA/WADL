def fibonacci_series(n):
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i - 1] + fib[i - 2])
    return fib[:n]

# Example usage
n = 10  # Change this to get more terms
print(f"Fibonacci series up to {n} terms:")
print(fibonacci_series(n))
