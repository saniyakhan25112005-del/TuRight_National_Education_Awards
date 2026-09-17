import os
import re

files_and_data = [
    ("WhatsApp Image 2026-09-17 at 1.11.49 PM (2).jpeg", "DR. M. N. CHALAVADI", "Life Time Achievement Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.49 PM (1).jpeg", "KRISHNA KUMAR DWIVEDI", "Best Academic Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.49 PM.jpeg", "Dr. SHANTAPPA R. KUNDAGOL", "Life Time Achievement Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.48 PM (3).jpeg", "DR. S. UMA", "Best Senior Faculty Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.48 PM (2).jpeg", "DHRUVI NITIN BHATIA", "Best School Principal Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.48 PM (1).jpeg", "NAMRATA PANDEY", "Award of Excellence in Research"),
    ("WhatsApp Image 2026-09-17 at 1.11.47 PM (3).jpeg", "RAJEEV KUMAR DUBEY", "Best Senior Faculty Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.47 PM (2).jpeg", "PROF SESHACHALAM ANANTHASAYANAM", "Best Senior Faculty Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.47 PM.jpeg", "DR. SHWETA PATHAK", "Best Women Faculty Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.46 PM (3).jpeg", "GAURAV GUPTA", "Best Research Scholar Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.46 PM (1).jpeg", "MACHADO SNEHA JOHN", "Best Women Faculty Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.46 PM.jpeg", "HRIDYESH PANDEY", "Best Researcher Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.45 PM (1).jpeg", "D. KASTHURI SANTIRA KUMARI", "Best Innovation in Life Sciences Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.45 PM.jpeg", "DR. MEENAL SUKHLECHA", "Best Senior Faculty Award"),
    ("WhatsApp Image 2026-09-17 at 1.11.44 PM.jpeg", "BHUPENDRA KULDEEP", "Best Administrator Award")
]

gallery_items = "export const GALLERY_ITEMS: GalleryItem[] = [\n"

os.makedirs("public/images/awards-moments", exist_ok=True)

categories = ['ceremony', 'winners', 'keynote', 'campus']

for idx, (filename, name, title) in enumerate(files_and_data, start=1):
    new_filename = f"award-moment-{idx}.jpg"
    if os.path.exists(filename):
        os.rename(filename, f"public/images/awards-moments/{new_filename}")
        
    category = categories[idx % 4]
    
    gallery_items += f"""  {{
    id: "g-{idx}",
    title: "{title}",
    category: "{category}",
    imageUrl: "/images/awards-moments/{new_filename}",
    caption: "{name}",
    year: "2026"
  }},\n"""

gallery_items += "];"

with open('src/data/awardsData.ts', 'r') as f:
    content = f.read()

pattern = r"export const GALLERY_ITEMS: GalleryItem\[\] = \[.*?\];"
new_content = re.sub(pattern, gallery_items, content, flags=re.DOTALL)

with open('src/data/awardsData.ts', 'w') as f:
    f.write(new_content)

print("Images moved and code updated successfully.")
