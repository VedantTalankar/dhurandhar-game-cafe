/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Silkscreen"', 'monospace'],
        arcade: ['"Chakra Petch"', 'sans-serif'],
        lcd: ['"VT323"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        gb: {
          // Classic Game Boy DMG-01 LCD Greens
          screen: '#8bac0f',
          'screen-bright': '#9bbc0f',
          'screen-dim': '#4e6e18',
          'screen-dark': '#2e4210',
          'screen-off': '#1a2711',
          
          // Deep Forest & Jabalpur Flora Greens
          forest: '#142117',
          'forest-deep': '#0c160e',
          'forest-card': '#1b2c1f',
          'forest-border': '#2d4233',
          olive: '#596944',
          'olive-muted': '#3e4a30',
          
          // Bhedaghat Marble Rocks & Stone
          marble: '#e8e5db',
          'marble-warm': '#ded9cb',
          stone: '#bcb6a5',
          'stone-dark': '#555146',
          'stone-edge': '#383e35',
          
          // Muted Narmada River & Mist
          mist: '#dbe4de',
          'mist-pale': 'rgba(219, 228, 222, 0.15)',
          narmada: '#4a6b63',
          'narmada-muted': '#36504a',
          'narmada-deep': '#1f332f',
          
          // Game Boy Hardware Accents (Buttons / Battery LED)
          rust: '#a8432a', // B/A buttons brick red
          'rust-dim': '#5e2517',
          amber: '#c78918', // Battery LED
          bezel: '#282b26', // Plastic shell grey
        }
      },
      boxShadow: {
        'gb-pixel': '3px 3px 0px 0px #0c160e',
        'gb-screen': 'inset 0 0 12px rgba(15, 56, 15, 0.4), 0 0 15px rgba(139, 172, 15, 0.25)',
        'stone-inset': 'inset 1px 1px 0px rgba(232, 229, 219, 0.15), inset -1px -1px 0px rgba(12, 22, 14, 0.5)',
      },
      backgroundImage: {
        'gb-grid': 'linear-gradient(to right, rgba(139, 172, 15, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 172, 15, 0.04) 1px, transparent 1px)',
        'dot-matrix': 'radial-gradient(rgba(139, 172, 15, 0.12) 1px, transparent 0)',
      }
    },
  },
  plugins: [],
}
