import os
import shutil

images = [
    "WhatsApp Image 2026-09-17 at 1.11.44 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.45 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.45 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.46 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.46 PM (2).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.46 PM (3).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.46 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.47 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.47 PM (2).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.47 PM (3).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.47 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.48 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.48 PM (2).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.48 PM (3).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.48 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.49 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.49 PM (2).jpeg",
    "WhatsApp Image 2026-09-17 at 1.11.49 PM.jpeg"
]

os.makedirs("public/images/awards-moments", exist_ok=True)

for i, img in enumerate(images, start=1):
    if os.path.exists(img):
        shutil.copy(img, f"public/images/awards-moments/award-moment-{i}.jpg")
        print(f"Copied {img} to award-moment-{i}.jpg")
    else:
        print(f"File {img} not found")

