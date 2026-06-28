import os
files = [f.replace('-denial-code.html','') for f in os.listdir('denial-codes') if f.endswith('-denial-code.html') and f != 'index.html']
files.sort(key=lambda x: (x[:2], int(x[3:])))
print(f"Total: {len(files)}")
for f in files:
    print(f)
