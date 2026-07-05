const Menu = () => {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 text-zinc-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2 text-xl tracking-wider">
            <i className="bi bi-code-slash text-blue-500"></i>
            <span className="font-bold uppercase">Code tarea </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 capitalize">
              <a>Inicio</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu; 