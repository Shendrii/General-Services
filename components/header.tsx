export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
            GS
          </div>
          <h1 className="text-xl font-bold text-primary">General Servies</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-foreground hover:text-primary transition">Services</a>
          <a href="#contact" className="text-foreground hover:text-primary transition">Contact</a>
        </nav>
      </div>
    </header>
  )
}
