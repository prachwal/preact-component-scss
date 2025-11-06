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
- 🔄 **Version Management** - Automatic version checking and bumping with Husky pre-commit hooks
- 📦 **NPM Publishing** - Automated publishing pipeline with version validation

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

## Version Management & Publishing

The project includes automated version management to ensure safe publishing:

### Pre-commit Hooks

- **Husky** pre-commit hook automatically runs `npm run version-check`
- Prevents commits when local version matches published version
- Automatically bumps patch version when needed

### Publishing Workflow

```bash
# Manual version check (optional)
npm run version-check

# Build library for publishing
npm run build:lib

# Publish to NPM (requires NPM_TOKEN)
npm publish
```

### CI/CD Pipeline

- **GitHub Actions** automatically publishes on main branch pushes
- Version validation prevents publishing duplicate versions
- Automated testing and building before publishing

## Development

```bash
# Install dependencies (also sets up Husky git hooks)
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
- `npm run build:lib` - Build library for NPM publishing
- `npm run test` - Run tests with Vitest
- `npm run test:junit` - Run tests with JUnit output for CI
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run test:ui` - Run tests with Vitest UI
- `npm run docs` - Generate TSDoc documentation
- `npm run preview` - Preview production build
- `npm run version-check` - Check and bump version if needed before publishing

## Project Structure

```text
src/
├── app.tsx              # Main demo component
├── index.ts             # Library entry point
├── main.tsx             # App bootstrap
├── theme-provider.tsx   # Theme context provider
├── utils.ts             # Utility functions
├── global.d.ts          # TypeScript environment variable declarations
├── styles/
│   ├── _variables.scss  # CSS custom properties and SCSS variables
│   ├── _mixins.scss     # SCSS mixins
│   ├── _base.scss       # Global styles
│   ├── _components.scss # Component styles
│   └── main.scss        # Main stylesheet
├── components/          # Component library
├── test/
│   └── setup.ts         # Test configuration
└── assets/              # Static assets
.husky/
├── pre-commit           # Git pre-commit hook for version checking
└── _/                   # Husky internal files
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run `npm run test` to ensure tests pass
6. Commit your changes (pre-commit hooks will automatically check versions)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/prachwal/preact-component-scss.git
cd preact-component-scss

# Install dependencies (this also sets up Husky hooks)
npm install

# Start development
npm run dev
```

### Pre-commit Hooks - Description

The project uses Husky to run automated checks before commits:

- **Version validation**: Ensures version bumping when needed
- **Code quality**: Runs tests and linting (when configured)

To bypass hooks for specific commits (use with caution):

```bash
git commit --no-verify -m "Your commit message"
```

## License

MIT - see [LICENSE](LICENSE) file for details.
