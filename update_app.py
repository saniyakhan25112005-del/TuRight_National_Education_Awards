with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { GallerySection } from './components/GallerySection';", "import { YouTubeSection } from './components/YouTubeSection';\nimport { GallerySection } from './components/GallerySection';")

content = content.replace("{/* Photo & Video Gallery */}        <GallerySection />", "{/* Watch Our Awards */}\n        <YouTubeSection />\n        {/* Awards Moments */}\n        <GallerySection />")

with open('src/App.tsx', 'w') as f:
    f.write(content)
