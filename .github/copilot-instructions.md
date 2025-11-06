# Preact Component Library with SCSS - AI Agent Instructions

## Architecture Overview
This is a **dual-mode Preact component library** built with TypeScript and SCSS. The project supports both development/demo mode and library distribution mode.

- **Preact with React Compatibility**: Path aliases in `tsconfig.app.json` map `react`/`react-dom` to Preact's compat layer
- **TypeScript Project References**: Split configs (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`)
- **Vite Dual Build**: App mode for development, library mode for npm publishing with `vite build --mode library`
- **Component Architecture**: Each component in dedicated folder (`src/components/[ComponentName]/`) with `.tsx` + `.scss` files

## Component Patterns
- **Directory Structure**: `src/components/[ComponentName]/[ComponentName].tsx` + dedicated SCSS
- **Export Pattern**: Barrel exports via `src/components/index.ts` with typed interfaces
- **State Management**: Prefer `@preact/signals` for reactive state (`useSignal(0)`, `count.value++`)
- **JSX Transform**: Configured for Preact (`jsxImportSource: "preact"`)

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
**Modern SCSS with separation of concerns**:

- **SCSS Variables** (`_variables.scss`): Static values only (breakpoints, z-index, border-radius)
- **CSS Custom Properties**: Dynamic theme values with `clamp()` for responsive scaling
- **Component SCSS**: Dedicated files in `src/styles/components/_[component].scss`
- **Import Chain**: `main.scss` → `components/index.scss` → individual component files

**Responsive Patterns**:
```scss
// Fluid scaling with clamp()
--font-size-base: clamp(1rem, 2.5vw, 1.125rem);
--spacing-base: clamp(1rem, 4vw, 2rem);

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

**Testing Workflow**:
```bash
npm run test         # Vitest with jsdom
npm run test:ui      # Vitest UI interface
npm run test:junit   # JUnit output for CI
npm run test:coverage # Coverage reports
```

**Documentation**:
```bash
npm run docs         # TypeDoc generation
```

## Key Files & Patterns

**Entry Points**:
- `src/index.ts` - Library exports (components, theme, utils)
- `src/main.tsx` - App bootstrap for development
- `src/app.tsx` - Demo component composition

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

**SCSS Organization**:
```
src/styles/
├── main.scss           # Entry point (forwards variables, imports all)
├── _variables.scss     # SCSS vars + CSS custom properties
├── _base.scss          # Global styles
├── _components.scss    # App-specific styles
├── components/
│   ├── index.scss      # Component imports
│   ├── _button.scss    # Component-specific styles
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

**TypeScript Setup**:
- Strict mode enabled (`noUnusedLocals`, `noUnusedParameters`)
- Path mapping for React compatibility
- JSX transform for Preact

## Common Patterns

**Component Development**:
1. Create `src/components/[Name]/[Name].tsx` with full TypeScript interface
2. Add dedicated `src/styles/components/_[name].scss`
3. Export via `src/components/index.ts`
4. Update `src/styles/components/index.scss` imports

**Styling Conventions**:
- Use CSS custom properties for theme values
- `clamp()` for responsive scaling (no fixed breakpoints)
- BEM-like naming: `.button--primary`, `.button__icon`
- Component-specific styles in dedicated files

**Testing Setup**:
- Vitest with jsdom environment
- `@testing-library/preact` for component testing
- `matchMedia` mocking for theme tests
- Cleanup after each test

**Theme Integration**:
- Components automatically respond to theme changes
- Use CSS custom properties, not hardcoded colors
- Test both light and dark themes

## Quality Assurance

**Type Safety**: Strict TypeScript with comprehensive interfaces and type guards
**Accessibility**: ARIA attributes, keyboard navigation, screen reader support
**Performance**: Preact's lightweight runtime, efficient re-renders with signals
**Cross-browser**: Modern CSS with fallbacks, SSR-safe theme detection</content>
<parameter name="filePath">/home/prachwal/src/preact/preact-component-scss/.github/copilot-instructions.md