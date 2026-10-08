import { PROJECTS, PROFILE } from "@/content/metro";
import { Search, Star, GitBranch, Circle } from "lucide-react";
import { useState } from "react";

export function RepositoryList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4 pb-4 border-b border-[#30363d]">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Find a repository..."
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] rounded-md py-1.5 pl-9 pr-3 text-[14px] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] outline-none transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="gh-btn flex items-center gap-1 bg-[#21262d]">
            Type
            <span className="text-[10px] ml-1">▼</span>
          </button>
          <button className="gh-btn flex items-center gap-1 bg-[#21262d]">
            Language
            <span className="text-[10px] ml-1">▼</span>
          </button>
          <button className="gh-btn flex items-center gap-1 bg-[#21262d]">
            Sort
            <span className="text-[10px] ml-1">▼</span>
          </button>
          <button className="gh-btn bg-[#238636] text-white hover:bg-[#2ea043] hover:border-[#2ea043] border-none ml-2 flex items-center gap-2">
            <BookIcon />
            New
          </button>
        </div>
      </div>

      <div>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-[#c9d1d9]">
            <h3 className="text-xl font-semibold mb-2">{PROFILE.name} doesn't have any repositories that match.</h3>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="py-6 border-b border-[#30363d] flex justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <a href={project.repo} target="_blank" rel="noreferrer" className="text-[#58a6ff] text-[20px] font-semibold hover:underline">
                    {project.name}
                  </a>
                  <span className="border border-[#30363d] text-[#8b949e] text-[12px] px-2 rounded-full">
                    Public
                  </span>
                </div>
                {project.summary && (
                  <p className="text-[#8b949e] text-[14px] mb-4 pr-6">
                    {project.summary}
                  </p>
                )}
                <div className="flex items-center gap-4 text-[12px] text-[#8b949e]">
                  <div className="flex items-center gap-1">
                    <Circle size={12} className="fill-[#f1e05a] text-[#f1e05a]" />
                    <span>{project.stack[0] || "TypeScript"}</span>
                  </div>
                  {Math.random() > 0.5 && (
                    <a href="#" className="flex items-center gap-1 hover:text-[#58a6ff]">
                      <Star size={14} />
                      <span>{Math.floor(Math.random() * 50) + 1}</span>
                    </a>
                  )}
                  {Math.random() > 0.5 && (
                    <a href="#" className="flex items-center gap-1 hover:text-[#58a6ff]">
                      <GitBranch size={14} />
                      <span>{Math.floor(Math.random() * 10) + 1}</span>
                    </a>
                  )}
                  <span>Updated on {project.year}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <button className="gh-btn flex items-center gap-2 text-[12px] py-1 px-3">
                  <Star size={14} />
                  Star
                  <span className="border-l border-[#30363d] pl-2 ml-1">▼</span>
                </button>
                <div className="h-6"></div> {/* Spacer to align activity graph if present */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BookIcon() {
  return (
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo fill-current">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
    </svg>
  );
}
