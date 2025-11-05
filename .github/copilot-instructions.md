# Preact Component Library with SCSS - AI Agent Instructions

## Architecture Overview
This is a Preact-based component library using TypeScript and SCSS for styling. Key architectural decisions:

- **Preact with React Compatibility**: Uses path aliases in `tsconfig.app.json` to map `react`/`react-dom` imports to Preact's compat layer, enabling React library usage
- **TypeScript Project References**: Split config with `tsconfig.json` referencing `tsconfig.app.json` for app code and `tsconfig.node.json` for build tools
- **Vite Build System**: Modern bundler with HMR support for development

## Component Patterns
- Components are defined in `src/` directory
- Use Preact hooks (`useState`, etc.) or **@preact/signals** for reactive state management
- JSX transform configured for Preact (`jsxImportSource: "preact"`)

## State Management
- Prefer **@preact/signals** for reactive state: `const count = useSignal(0)` and `count.value++`
- Signals provide automatic reactivity without explicit re-renders
- Can still use traditional hooks when signals aren't suitable

## Styling Approach
- **SCSS with modern @use syntax**: Organized in `src/styles/` with main entry point
- **Responsive Design**: Uses CSS custom properties with `clamp()` for fluid scaling across devices
- Follow BEM or similar naming conventions when adding SCSS

## Responsive Patterns
- CSS custom properties for scalable values: `--font-size-base`, `--spacing-base`, `--logo-size`
- `clamp()` functions for fluid typography and spacing
- Mobile-first breakpoints at 768px and 480px
- Container queries with `min(1280px, 90vw)` for max-width

## Development Workflow
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Type-check with tsc, then build with Vite
npm run preview  # Preview production build
```

## Key Files
- `src/app.tsx` - Main app component (currently demo)
- `src/main.tsx` - App entry point with Preact render
- `vite.config.ts` - Basic Vite config with Preact preset
- `tsconfig.app.json` - Strict TypeScript config for app code

## Integration Points
- Preact ecosystem: Compatible with most React libraries via compat layer
- Vite plugins: Can add SCSS support via `sass` dependency and Vite's built-in preprocessing

## Common Patterns
- Import CSS alongside components: `import './component.css'`
- Use Preact's functional component style with hooks
- Strict TypeScript: `noUnusedLocals`, `noUnusedParameters`, `strict: true`

## SCSS Integration (Planned)
When implementing SCSS:
1. Add `sass` devDependency for Vite SCSS preprocessing
2. Rename `.css` files to `.scss`
3. Update imports accordingly
4. Use the existing `scss` package if runtime compilation needed</content>
<parameter name="filePath">/home/prachwal/src/preact/preact-component-scss/.github/copilot-instructions.md