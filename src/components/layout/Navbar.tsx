import { Menu, Plus, Bell, User, Search, Book, Github } from "lucide-react";

export function Navbar() {
  return (
    <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-[#30363d] text-[#c9d1d9] text-sm">
      <div className="flex items-center gap-4">
        <button className="p-1 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
        <a href="/" className="text-white hover:text-white transition-colors">
          <Github size={32} />
        </a>
        <div className="hidden md:flex bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 items-center w-64 focus-within:border-[#58a6ff] focus-within:ring-1 focus-within:ring-[#58a6ff]">
          <Search size={16} className="text-[#8b949e] mr-2" />
          <input
            type="text"
            placeholder="Type / to search"
            className="bg-transparent border-none outline-none text-[#c9d1d9] w-full text-sm placeholder-[#8b949e]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 border border-[#30363d] rounded-md px-2 py-1 hover:border-[#8b949e] transition-colors">
          <Plus size={16} />
          <span className="text-xs">▾</span>
        </button>
        <button className="border border-[#30363d] rounded-md p-1 hover:border-[#8b949e] transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#58a6ff] rounded-full"></span>
        </button>
        <button className="rounded-full border border-[#30363d] overflow-hidden hover:border-[#8b949e] transition-colors w-8 h-8 flex items-center justify-center bg-[#21262d]">
          <User size={16} />
        </button>
      </div>
    </div>
  );
}
