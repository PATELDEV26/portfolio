import { BookOpen, Book, Layout, Package, Star } from "lucide-react";

type TabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "repositories", label: "Repositories", icon: Book, count: 12 },
    { id: "projects", label: "Projects", icon: Layout },
    { id: "packages", label: "Packages", icon: Package },
    { id: "stars", label: "Stars", icon: Star, count: 42 },
  ];

  return (
    <div className="sticky top-0 z-10 bg-[#0d1117] border-b border-[#30363d] mt-6 md:mt-0 pt-2">
      <nav className="flex overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 text-[14px] font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "border-[#f78166] text-[#c9d1d9]"
                  : "border-transparent text-[#c9d1d9] hover:bg-[#b1bac41f] rounded-t-md"
              }`}
            >
              <Icon size={16} className={isActive ? "text-[#c9d1d9]" : "text-[#8b949e]"} />
              {tab.label}
              {tab.count !== undefined && (
                <span className="bg-[#161b22] text-[#c9d1d9] text-[12px] font-semibold px-2 py-0.5 rounded-full ml-1">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
