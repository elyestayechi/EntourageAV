/**
 * Color Palette Guide - Navy Blue Monochrome
 * 
 * This component showcases the navy blue color palette used throughout the site.
 * Add it temporarily to any page to visualize the color system.
 */

export function ColorPaletteGuide() {
  const palette = [
    // Light Navy Tones
    { name: 'Navy Ice', var: '--color-navy-ice', hex: '#D4E1F0', use: 'Highlights, très subtil' },
    { name: 'Navy Mist', var: '--color-navy-mist', hex: '#B8CEDF', use: 'Backgrounds clairs' },
    { name: 'Navy Sky', var: '--color-navy-sky', hex: '#8FA9C7', use: 'Accents doux, Chapter 1' },
    
    // Medium Navy Tones
    { name: 'Navy Slate', var: '--color-navy-slate', hex: '#6B84A3', use: 'Éléments secondaires' },
    { name: 'Navy Blue', var: '--color-navy-blue', hex: '#4A6382', use: 'Accents principaux, Chapter 2' },
    { name: 'Navy Steel', var: '--color-navy-steel', hex: '#3D5268', use: 'Contraste moyen' },
    
    // Deep Navy Tones
    { name: 'Navy Ocean', var: '--color-navy-ocean', hex: '#2D3E4F', use: 'Luxury, Chapter 3' },
    { name: 'Navy Midnight', var: '--color-navy-midnight', hex: '#243342', use: 'Depth, Chapter 4' },
    { name: 'Navy Abyss', var: '--color-navy-abyss', hex: '#1A2530', use: 'Premium absolu' },
    
    // Grey-Navy Blends
    { name: 'Grey Navy Light', var: '--color-grey-navy-light', hex: '#7A8694', use: 'Transitions' },
    { name: 'Grey Navy', var: '--color-grey-navy', hex: '#4F5A66', use: 'Texte équilibré' },
    { name: 'Grey Navy Dark', var: '--color-grey-navy-dark', hex: '#35404A', use: 'Contraste fort' },
  ];

  const gradients = [
    {
      name: 'Hero Gradient',
      style: 'linear-gradient(135deg, var(--color-navy-blue) 0%, var(--color-navy-ocean) 100%)',
      use: 'Titres principaux, CTA buttons'
    },
    {
      name: 'Editorial Background',
      style: 'linear-gradient(180deg, var(--color-navy-midnight) 0%, var(--color-navy-abyss) 100%)',
      use: 'Sections sombres premium'
    },
    {
      name: 'Light Accent',
      style: 'linear-gradient(135deg, var(--color-navy-sky) 0%, var(--color-navy-blue) 100%)',
      use: 'Highlights, text effects'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-[#2A2A2A]">Navy Blue Monochrome Palette</h1>
        <p className="text-lg text-[#4A4A4A] mb-12">
          Une palette sophistiquée de bleus marine harmonisée avec gris et gris foncé
        </p>

        {/* Color Swatches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {palette.map((color) => (
            <div
              key={color.var}
              className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div
                className="h-32"
                style={{ background: `var(${color.var})` }}
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-1" style={{ color: `var(${color.var})` }}>
                  {color.name}
                </h3>
                <p className="text-sm text-gray-600 font-mono mb-2">{color.hex}</p>
                <p className="text-xs text-gray-500 italic">{color.use}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradients */}
        <h2 className="text-3xl font-bold mb-6 text-[#2A2A2A]">Gradients</h2>
        <div className="grid grid-cols-1 gap-6 mb-16">
          {gradients.map((gradient) => (
            <div
              key={gradient.name}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <div
                className="h-40 flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: gradient.style }}
              >
                {gradient.name}
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600 italic">{gradient.use}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chapter Colors */}
        <h2 className="text-3xl font-bold mb-6 text-[#2A2A2A]">Chapter Theme Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl" style={{ background: 'var(--color-navy-sky)', color: 'white' }}>
            <h3 className="text-2xl font-bold mb-2">Chapter 1: Introduction</h3>
            <p>Navy Sky - Léger et accueillant</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--color-navy-blue)', color: 'white' }}>
            <h3 className="text-2xl font-bold mb-2">Chapter 2: Services</h3>
            <p>Navy Blue - Professionnel et solide</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--color-navy-ocean)', color: 'white' }}>
            <h3 className="text-2xl font-bold mb-2">Chapter 3: Excellence</h3>
            <p>Navy Ocean - Riche et sophistiqué</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--color-navy-midnight)', color: 'white' }}>
            <h3 className="text-2xl font-bold mb-2">Chapter 4: Premium</h3>
            <p>Navy Midnight - Luxueux et profond</p>
          </div>
        </div>
      </div>
    </div>
  );
}
