module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        destructive: 'var(--color-destructive)',
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        sidebar: 'var(--color-sidebar)'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)'
      }
    }
  },
  plugins: [
    function ({ addVariant, e }) {
      // custom variant that targets elements inside any .dark ancestor
      addVariant('in-dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `:is(.dark *) .${e(`in-dark${separator}${className}`)}`)
      })
    }
  ]
}
