#!/usr/bin/env python3
"""
Batch color update script for Entourage AV
Replaces brown/beige color scheme with white/grey palette
"""

import re

# Color mapping
COLOR_MAP = {
    '#F6F2E8': '#FAFAF9',  # beige → off-white
    '#5f4b3a': '#4A4A4A',  # brown → charcoal grey
    '#1e1914': '#2A2A2A',  # dark brown → dark charcoal
    '#4a3a2c': '#3A3A3A',  # medium brown → medium grey
    '#0f0d0a': '#1A1A1A',  # very dark brown → very dark grey
}

# Files to update
FILES = [
    '/components/Blog.tsx',
    '/components/BlogPostDetail.tsx',
    '/components/Contact.tsx',
    '/components/Footer.tsx',
    '/components/EditorialSection.tsx',
    '/components/ExoApeParallax.tsx',
    '/components/FlipCounter.tsx',
    '/components/Testimonials.tsx',
    '/components/ParallaxSection.tsx',
    '/components/RecentProjects.tsx',
    '/components/AboutPage.tsx',
    '/components/AdminPanel.tsx',
    '/components/AdminDashboard.tsx',
    '/components/BeforeAfterSlider.tsx',
]

def update_colors_in_file(filepath):
    """Update all color references in a file"""
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        
        # Replace colors (case-insensitive)
        for old_color, new_color in COLOR_MAP.items():
            # Match both uppercase and lowercase
            pattern = re.compile(re.escape(old_color), re.IGNORECASE)
            content = pattern.sub(new_color, content)
        
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"✓ Updated {filepath}")
            return True
        else:
            print(f"  No changes needed for {filepath}")
            return False
            
    except FileNotFoundError:
        print(f"✗ File not found: {filepath}")
        return False
    except Exception as e:
        print(f"✗ Error updating {filepath}: {e}")
        return False

def main():
    print("Starting color scheme update...")
    print("Brown/Beige → White/Grey palette\n")
    
    updated_count = 0
    for filepath in FILES:
        if update_colors_in_file(filepath):
            updated_count += 1
    
    print(f"\nCompleted! Updated {updated_count}/{len(FILES)} files.")

if __name__ == '__main__':
    main()
