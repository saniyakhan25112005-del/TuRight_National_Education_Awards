import re

with open('src/data/awardsData.ts', 'r') as f:
    content = f.read()

categories = ['ceremony', 'winners', 'keynote', 'campus']

new_items = "export const GALLERY_ITEMS: GalleryItem[] = [\n"
for i in range(1, 19):
    category = categories[i % 4]
    new_items += f"""  {{
    id: "g-{i}",
    title: "TuRight National Education Awards",
    category: "{category}",
    imageUrl: "/images/awards-moments/award-moment-{i}.jpg",
    caption: "Awards Moment",
    year: "2026"
  }},
"""
new_items += "];"

pattern = r"export const GALLERY_ITEMS: GalleryItem\[\] = \[.*?\];"
new_content = re.sub(pattern, new_items, content, flags=re.DOTALL)

with open('src/data/awardsData.ts', 'w') as f:
    f.write(new_content)
