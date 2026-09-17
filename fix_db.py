with open('src/data/awardsData.ts', 'r') as f:
    content = f.read()

new_items_str = """  {
    id: "g-16",
    title: "Awards Ceremony Highlight",
    category: "ceremony",
    imageUrl: "/images/awards-moments/award-moment-mapped-16.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-17",
    title: "Awards Ceremony Highlight",
    category: "winners",
    imageUrl: "/images/awards-moments/award-moment-mapped-17.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-18",
    title: "Awards Ceremony Highlight",
    category: "keynote",
    imageUrl: "/images/awards-moments/award-moment-mapped-18.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-19",
    title: "Awards Ceremony Highlight",
    category: "campus",
    imageUrl: "/images/awards-moments/award-moment-mapped-19.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-20",
    title: "Awards Ceremony Highlight",
    category: "ceremony",
    imageUrl: "/images/awards-moments/award-moment-mapped-20.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-21",
    title: "Awards Ceremony Highlight",
    category: "winners",
    imageUrl: "/images/awards-moments/award-moment-mapped-21.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-22",
    title: "Awards Ceremony Highlight",
    category: "keynote",
    imageUrl: "/images/awards-moments/award-moment-mapped-22.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-23",
    title: "Awards Ceremony Highlight",
    category: "campus",
    imageUrl: "/images/awards-moments/award-moment-mapped-23.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-24",
    title: "Awards Ceremony Highlight",
    category: "ceremony",
    imageUrl: "/images/awards-moments/award-moment-mapped-24.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
  {
    id: "g-25",
    title: "Awards Ceremony Highlight",
    category: "winners",
    imageUrl: "/images/awards-moments/award-moment-mapped-25.jpg",
    caption: "TuRight National Education Awards",
    year: "2026"
  },
"""

exact_str = ",\n" + new_items_str + "];"

# Revert everywhere
content = content.replace(exact_str, "\n];")

# Now properly append ONLY to GALLERY_ITEMS
# Let's find:
#   },
# ];
# export const JURY_MEMBERS

import re

match = re.search(r'(export const GALLERY_ITEMS: GalleryItem\[\] = \[.*?)(];)', content, re.DOTALL)
if match:
    # Instead of doing that, let's just do a specific replace. We know what's at the end of GALLERY_ITEMS:
    #   {
    #     id: "g-15",
    #     ...
    #     year: "2024"
    #   }
    # ];
    
    # Actually, simpler: 
    # Just look for:
    #     year: "2024"
    #   }
    # ];
    # export const JURY_MEMBERS
    
    # we can use:
    replacement = ",\n" + new_items_str + "];"
    content = content.replace("  }\n];\n\nexport const JURY_MEMBERS", "  }" + replacement + "\n\nexport const JURY_MEMBERS")

with open('src/data/awardsData.ts', 'w') as f:
    f.write(content)

print("Fixed!")
