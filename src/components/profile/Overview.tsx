import { PROJECTS } from "@/content/metro";
import { Book, Star, GitBranch } from "lucide-react";
import { ContributionGraph } from "./ContributionGraph";

export function Overview() {
  // Take top 6 projects for pinned repositories
  const pinnedProjects = PROJECTS.slice(0, 6);

  return (
    <div className="mt-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[14px] text-[#c9d1d9] font-normal">Pinned</h2>
          <a href="#" className="text-[12px] text-[#8b949e] hover:text-[#58a6ff]">Customize your pins</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pinnedProjects.map((project) => (
            <div key={project.id} className="border border-[#30363d] rounded-md p-4 flex flex-col bg-[#0d1117]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Book size={16} className="text-[#8b949e]" />
                  <a href={project.repo} className="text-[#58a6ff] font-semibold text-[14px] hover:underline" target="_blank" rel="noreferrer">
                    {project.name}
                  </a>
                  <span className="border border-[#30363d] text-[#8b949e] text-[12px] px-2 rounded-full ml-1">
                    Public
                  </span>
                </div>
              </div>
              
              <p className="text-[#8b949e] text-[12px] mb-4 flex-1">
                {project.summary}
              </p>
              
              <div className="flex items-center gap-4 text-[12px] text-[#8b949e]">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#f1e05a]"></div>
                  <span>{project.stack[0] || "JavaScript"}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                  <Star size={14} />
                  <span>{Math.floor(Math.random() * 50) + 1}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                  <GitBranch size={14} />
                  <span>{Math.floor(Math.random() * 10) + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <ContributionGraph />
      </div>
    </div>
  );
}
