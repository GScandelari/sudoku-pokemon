export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" className="icon-toggle" onClick={onToggle}>
      {theme === 'dark' ? 'Tema: Escuro' : 'Tema: Claro'}
    </button>
  )
}
