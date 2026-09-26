import os
import sys
import glob
import urllib.request
import time

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIAGRAMS_DIR = os.path.join(BASE_DIR, 'diagrams')
IMAGES_DIR = os.path.join(DIAGRAMS_DIR, 'images')

os.makedirs(IMAGES_DIR, exist_ok=True)

# Auto-discover all .puml files
puml_files = sorted(glob.glob(os.path.join(DIAGRAMS_DIR, '*.puml')))
print(f"Found {len(puml_files)} PlantUML files to render.\n")

success_count = 0
fail_count = 0

for puml_path in puml_files:
    basename = os.path.splitext(os.path.basename(puml_path))[0]
    img_path = os.path.join(IMAGES_DIR, f"{basename}.png")
    print(f"Rendering {os.path.basename(puml_path)} -> images/{basename}.png ...")

    with open(puml_path, 'r', encoding='utf-8') as f:
        content = f.read()

    success = False
    for attempt in range(4):
        try:
            req = urllib.request.Request(
                'https://kroki.io/plantuml/png',
                data=content.encode('utf-8'),
                headers={'Content-Type': 'text/plain; charset=utf-8', 'User-Agent': 'Mozilla/5.0'}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                with open(img_path, 'wb') as img_f:
                    img_f.write(data)
                print(f"  [OK] {len(data):,} bytes")
                success = True
                success_count += 1
                break
        except Exception as e:
            print(f"  Attempt {attempt+1} error: {e}")
            time.sleep(2 * (attempt + 1))

    if not success:
        print(f"  [FAILED]")
        fail_count += 1

    # Small delay between requests to avoid rate limiting
    time.sleep(0.5)

print(f"\n{'='*50}")
print(f"Rendering complete: {success_count} OK, {fail_count} FAILED out of {len(puml_files)} total")
