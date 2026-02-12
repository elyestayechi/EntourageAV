#!/bin/bash

# Color mapping script for Entourage AV
# Replaces brown/beige colors with white/grey palette

# Define file list to update
FILES=(
  "components/Blog.tsx"
  "components/BlogPostDetail.tsx"
  "components/Contact.tsx"
  "components/Footer.tsx"
  "components/EditorialSection.tsx"
  "components/ExoApeParallax.tsx"
  "components/FlipCounter.tsx"
  "components/Testimonials.tsx"
  "components/ParallaxSection.tsx"
  "components/RecentProjects.tsx"
  "components/AboutPage.tsx"
  "components/AdminPanel.tsx"
  "components/AdminDashboard.tsx"
  "components/BeforeAfterSlider.tsx"
  "components/DentTransition.tsx"
  "components/ParallaxImage.tsx"
)

# Color replacements
declare -A COLORS
COLORS["#F6F2E8"]="#FAFAF9"    # beige → off-white
COLORS["#5f4b3a"]="#4A4A4A"    # brown → charcoal grey
COLORS["#1e1914"]="#2A2A2A"    # dark brown → dark charcoal
COLORS["#4a3a2c"]="#3A3A3A"    # medium brown → medium grey
COLORS["#0f0d0a"]="#1A1A1A"    # very dark brown → very dark grey

echo "Updating color scheme to white/grey palette..."

for file in "${FILES[@]}"; do
  if [ -f "/$file" ]; then
    echo "Processing $file..."
    for old_color in "${!COLORS[@]}"; do
      new_color="${COLORS[$old_color]}"
      # Use sed to replace colors (case-insensitive)
      sed -i "s/$old_color/$new_color/gi" "/$file"
    done
  fi
done

echo "Color scheme update complete!"
