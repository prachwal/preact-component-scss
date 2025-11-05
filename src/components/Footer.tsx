import packageJson from '../../package.json'

export function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Preact Component Library v{packageJson.version}. Built with Preact and SCSS.</p>
    </footer>
  )
}