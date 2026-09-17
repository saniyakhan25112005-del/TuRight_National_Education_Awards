import re

with open('src/data/awardsData.ts', 'r') as f:
    content = f.read()

# Generate the new GALLERY_ITEMS array
new_items = "export const GALLERY_ITEMS: GalleryItem[] = [\n"
for i in range(1, 19):
    new_items += f"""  {{
    id: "g-{i}",
    title: "TuRight National Education Awards",
    category: "ceremony",
    imageUrl: "/images/awards-moments/award-moment-{i}.jpg",
    caption: "Awards Moment {i}",
    year: "2026"
  }},
"""
new_items += "];"

# Use regex to replace the existing GALLERY_ITEMS
pattern = r"export const GALLERY_ITEMS: GalleryItem\[\] = \[.*?\];"
new_content = re.sub(pattern, new_items, content, flags=re.DOTALL)

with open('src/data/awardsData.ts', 'w') as f:
    f.write(new_content)
