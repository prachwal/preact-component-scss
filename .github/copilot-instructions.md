# Preact Component Library with SCSS - AI Agent Instructions

## Component Composition Guidelines

**General layout components (Header, Main, Footer) should accept children for content instead of hardcoding content inside the components.** This ensures composability and reusability:

```tsx
// ✅ Good - Content passed as children
<Header>
  <h1>My Custom Title</h1>
</Header>
<Main>
  <MyContent />
</Main>
<Footer>
  <p>Custom footer content</p>
</Footer>

// ❌ Avoid - Hardcoded content in components
function Header() {
  return <header><h1>Hardcoded Title</h1></header>
}
```

## Architecture Overview
This is a **dual-mode Preact component library** built with TypeScript and SCSS. The project supports both development/demo mode and library distribution mode.

- **ES Module First**: `"type": "module"` in package.json - all .js files treated as ES modules
- **Preact with React Compatibility**: Path aliases in `tsconfig.app.json` map `react`/`react-dom` to Preact's compat layer
- **TypeScript Project References**: Split configs (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`)
- **Vite Dual Build**: App mode for development, library mode for npm publishing with `vite build --mode library`
- **Component Architecture**: Each component in dedicated folder (`src/components/[ComponentName]/`) with `.tsx` + `.scss` files
- **CommonJS Scripts**: Utility scripts use `.cjs` extension (e.g., `pack-unpack.cjs`)

## Component Patterns
- **Directory Structure**: `src/components/[ComponentName]/[ComponentName].tsx` + dedicated SCSS
- **Export Pattern**: Barrel exports via `src/components/index.ts` with typed interfaces
- **State Management**: Prefer `@preact/signals` for reactive state (`useSignal(0)`, `count.value++`)
- **JSX Transform**: Configured for Preact (`jsxImportSource: "preact"`)
- **Polymorphic Components**: Card component supports different HTML tags via `as` prop

## Theme System Architecture
**Complex theme provider** with three modes (dark/light/auto) and system preference detection:

```tsx
// Theme usage pattern
const { theme, setTheme, resolvedTheme } = useTheme();
setTheme('auto'); // Follows system preference
```

- **Persistence**: localStorage with error handling and SSR safety
- **CSS Variables**: Dynamic theming via CSS custom properties (not SCSS variables)
- **Class Application**: `<html class="theme-dark">` or `<html class="theme-light">`

## Styling Architecture
**Optimized SCSS with performance-first approach**:

- **SCSS Variables** (`_variables.scss`): Static values only (breakpoints, z-index, border-radius)
- **CSS Custom Properties**: Dynamic theme values with fixed spacing and typography for better performance
- **Component SCSS**: Dedicated files in `src/styles/components/_[component].scss`
- **Import Chain**: `main.scss` → `components/index.scss` → individual component files

**Performance-First Patterns**:
```scss
// Fixed values for better performance (no runtime calculations)
--spacing-xs: 0.375rem;
--spacing-sm: 0.75rem;
--spacing-base: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

--font-size-base: 1rem;
--font-size-lg: 1.125rem;

// Breakpoint usage
@media (max-width: $breakpoint-tablet) { /* 768px */ }
```

## Build & Development Workflows

**Dual Build System**:
```bash
npm run dev          # Vite dev server (app mode)
npm run build        # Type-check + build (app mode)
npm run build:lib    # Library build for npm publishing
npm run preview      # Preview production build
```

**Version Management**:
```bash
npm run version-check  # Check published version and auto-bump if needed
# Runs automatically via Husky pre-commit hook
```

**Testing Workflow**:
```bash
npm run test         # Vitest with jsdom
npm run test:ui      # Vitest UI interface
npm run test:junit   # JUnit output for CI
npm run test:coverage # Coverage reports
```

**Code Quality**:
```bash
npm run lint         # ESLint v9 flat config
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Prettier formatting
npm run format:check # Check formatting
```

**Documentation**:
```bash
npm run docs         # TypeDoc generation
```

**Utility Scripts**:
```bash
npm run pack         # Pack src/ into src.packed.txt
npm run unpack       # Unpack src.packed.txt to src-unpacked/
npm run clean:dist   # Remove dist directories from src/
```

**CSS Optimization**:
- **Production builds** automatically minify CSS with cssnano
- **Comments removed**, whitespace normalized, fonts optimized
- **Performance-first**: Fixed values instead of runtime calculations
- **Reduced CSS custom properties** for better performance
- **8.65 kB → 2.16 kB gzipped** typical reduction

## Key Files & Patterns

**Entry Points**:
- `src/index.ts` - Library exports (components, theme, utils)
- `src/main.tsx` - App bootstrap for development
- `src/app.tsx` - Demo component composition
- `src/global.d.ts` - TypeScript environment variable declarations

**Build Configuration**:
- `vite.config.ts` - Dual-mode build with CSS minification (ES module imports)
- `eslint.config.js` - ESLint v9 flat config with browser globals
- `tsconfig.*.json` - TypeScript project references
- `.husky/pre-commit` - Version checking before commits

**Component Example** (`src/components/Button/Button.tsx`):
```tsx
export interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size'> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  // ... full interface
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // Implementation with proper TypeScript + accessibility
});
```

**Theme Provider** (`src/theme-provider.tsx`):
- Signal-based state management
- localStorage persistence with error handling
- System preference detection with media queries
- SSR-safe implementation

**Testing Setup** (`src/test/setup.ts`):
```typescript
// matchMedia mocking for theme tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    // ... full mock implementation
  }))
});
```

**SCSS Organization**:
```
src/styles/
├── main.scss           # Entry point (forwards variables, imports all)
├── _variables.scss     # SCSS vars + CSS custom properties (consolidated)
├── _base.scss          # Global styles (CSS vars moved to _variables.scss)
├── _mixins.scss        # SCSS mixins
├── components/
│   ├── index.scss      # Component imports
│   ├── _button.scss    # Component-specific styles (no duplicate :root)
│   └── ...
```

## Integration Points

**Library Usage**:
```tsx
import { Button, ThemeProvider, useTheme } from 'preact-component-scss';
import 'preact-component-scss/styles';
```

**Vite Configuration**:
- Library mode: Externalizes Preact, outputs single ES module
- App mode: Full development setup with HMR
- ES module imports for cssnano and other dependencies

**TypeScript Setup**:
- Strict mode enabled (`noUnusedLocals`, `noUnusedParameters`)
- Path mapping for React compatibility
- JSX transform for Preact
- Global declarations in `src/global.d.ts` for Vite env vars

## Version Management & Publishing

**Automated Version Control**:
- **Husky pre-commit hooks** run `npm run version-check` automatically
- **Version bumping**: Auto-increments patch version when local matches published
- **Safe publishing**: Prevents duplicate version releases

**Publishing Workflow**:
```bash
npm run version-check  # Manual check (optional)
npm run build:lib      # Build for npm
npm publish           # Publish to npm (requires NPM_TOKEN)
```

**CI/CD Integration**:
- GitHub Actions validates versions before publishing
- Automatic publishing on main branch pushes
- Version conflicts blocked at pipeline level

## Common Patterns

**Component Development**:
1. Create `src/components/[Name]/[Name].tsx` with full TypeScript interface
2. Add dedicated `src/styles/components/_[name].scss`
3. Export via `src/components/index.ts`
4. Update `src/styles/components/index.scss` imports

**Styling Conventions**:
- Use CSS custom properties for theme values
- Fixed spacing values for better performance (no clamp() calculations)
- BEM-like naming: `.button--primary`, `.button__icon`
- Component-specific styles in dedicated files
- **Single :root block** in `_variables.scss` (no duplicates)

**Version Management**:
- Pre-commit hooks prevent version conflicts
- Use `npm run version-check` before manual publishing
- CI/CD validates version uniqueness before npm publish

**Testing Setup**:
- Vitest with jsdom environment
- `@testing-library/preact` for component testing
- `matchMedia` mocking for theme tests (see `src/test/setup.ts`)
- Cleanup after each test

**Theme Integration**:
- Components automatically respond to theme changes
- Use CSS custom properties, not hardcoded colors
- Test both light and dark themes

**ESLint Configuration**:
- ESLint v9 flat config format
- Browser globals configured for DOM testing
- CommonJS scripts (`.cjs`) excluded from strict rules
- TypeScript-specific rules with Preact support

## Quality Assurance

**Type Safety**: Strict TypeScript with comprehensive interfaces and type guards
**Accessibility**: ARIA attributes, keyboard navigation, screen reader support
**Performance**: Preact's lightweight runtime, efficient re-renders with signals
**Cross-browser**: Modern CSS with fallbacks, SSR-safe theme detection
**Code Quality**: ESLint v9 + Prettier with automated formatting and linting</content>
<parameter name="filePath">/home/prachwal/src/preact/preact-component-scss/.github/copilot-instructions.md