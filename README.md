# Preact Component Library with SCSS

A modern, responsive component library built with Preact, TypeScript, and SCSS. Features dark/light/auto theme switching, comprehensive documentation, and GitHub Pages deployment.

## Features

- ⚡ **Preact** - Fast, lightweight React alternative
- 🎨 **SCSS** - Modular styling with CSS custom properties
- 🌙 **Theme Support** - Dark, light, and auto themes with localStorage persistence
- 📱 **Responsive** - Mobile-first design with fluid typography
- 🧪 **Tested** - Comprehensive test suite with JUnit reporting
- 📚 **Documented** - TSDoc generated documentation
- 🚀 **CI/CD** - GitHub Actions with automated testing and deployment

## Installation

```bash
npm install preact-component-scss
```

## Usage

```tsx
import { App } from 'preact-component-scss';
import 'preact-component-scss/styles';

function MyApp() {
  return <App />;
}
```

## Theme Configuration

The library includes a theme provider for easy theme switching:

```tsx
import { ThemeProvider, useTheme } from 'preact-component-scss';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('auto')}>Auto</button>
    </div>
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Generate documentation
npm run docs
```

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run test` - Run tests with Vitest
- `npm run test:junit` - Run tests with JUnit output
- `npm run docs` - Generate TSDoc documentation
- `npm run preview` - Preview production build

## Project Structure

```text
src/
├── app.tsx              # Main demo component
├── index.ts             # Library entry point
├── main.tsx             # App bootstrap
├── theme-provider.tsx   # Theme context provider
├── utils.ts             # Utility functions
├── styles/
│   ├── _variables.scss  # CSS custom properties and SCSS variables
│   ├── _mixins.scss     # SCSS mixins
│   ├── base.scss        # Global styles
│   ├── components.scss  # Component styles
│   └── main.scss        # Main stylesheet
└── test/
    └── setup.ts         # Test configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run `npm run test` to ensure tests pass
6. Submit a pull request

## License

MIT - see [LICENSE](LICENSE) file for details.
