import os
import shutil

new_images = [
    "WhatsApp Image 2026-09-17 at 6.38.53 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.52 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.52 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.51 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.50 PM (2).jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.50 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.50 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.49 PM (1).jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.49 PM.jpeg",
    "WhatsApp Image 2026-09-17 at 6.38.38 PM.jpeg"
]

start_idx = 16
new_items_str = ""
categories = ['ceremony', 'winners', 'keynote', 'campus']

for i, filename in enumerate(new_images):
    idx = start_idx + i
    new_filename = f"award-moment-mapped-{idx}.jpg"
    
    if os.path.exists(filename):
        shutil.copy(filename, f"public/images/awards-moments/{new_filename}")
        print(f"Moved {filename} to {new_filename}")
    else:
        print(f"Warning: {filename} not found.")
        
    category = categories[idx % 4]
    
    new_items_str += f"""  {{
    id: "g-{idx}",
    title: "Awards Ceremony Highlight",
    category: "{category}",
    imageUrl: "/images/awards-moments/{new_filename}",
    caption: "TuRight National Education Awards",
    year: "2026"
  }},\n"""

with open('src/data/awardsData.ts', 'r') as f:
    content = f.read()

# We look for the last closing bracket of GALLERY_ITEMS array.
# It ends with:  },\n];
# So we can replace "];" with our new string + "];"
content = content.replace("\n];", ",\n" + new_items_str + "];")

with open('src/data/awardsData.ts', 'w') as f:
    f.write(content)

print("Gallery data updated.")
