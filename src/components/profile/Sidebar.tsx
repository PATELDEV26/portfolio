import { Users, MapPin, Link as LinkIcon, Twitter, Mail } from "lucide-react";
import { PROFILE } from "@/content/metro";

export function Sidebar() {
  return (
    <div className="w-full md:w-[296px] shrink-0">
      <div className="flex md:flex-col items-center md:items-start gap-4 mb-4">
        <div className="w-[16vw] md:w-full max-w-[296px] min-w-[100px]">
          <div className="relative pt-[100%] rounded-full overflow-hidden border border-[#30363d] bg-[#161b22]">
            {/* Fallback avatar if no image is available */}
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="Avatar"
              className="absolute top-0 left-0 w-full h-full object-cover invert"
            />
          </div>
        </div>
        <div className="flex-1 md:w-full pt-4">
          <h1 className="flex flex-col">
            <span className="text-[26px] leading-[1.25] font-semibold text-[#c9d1d9]">
              {PROFILE.name}
            </span>
            <span className="text-[20px] leading-[24px] font-light text-[#8b949e]">
              {PROFILE.name.toLowerCase().replace(" ", "")}
            </span>
          </h1>
        </div>
      </div>

      <div className="mb-4">
        <button className="w-full gh-btn flex items-center justify-center">
          Edit profile
        </button>
      </div>

      <div className="mb-4 text-[#c9d1d9] text-[16px] leading-[1.5]">
        {PROFILE.headline}
      </div>

      <div className="mb-4 flex flex-col gap-1 text-[14px] text-[#8b949e]">
        <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer group">
          <Users size={16} />
          <span className="font-semibold text-[#c9d1d9] group-hover:text-[#58a6ff]">1.2k</span>
          <span>followers</span>
          <span className="mx-1">·</span>
          <span className="font-semibold text-[#c9d1d9] group-hover:text-[#58a6ff]">24</span>
          <span>following</span>
        </div>
      </div>

      <ul className="flex flex-col gap-1 text-[14px] text-[#c9d1d9] mb-4">
        <li className="flex items-center gap-2">
          <MapPin size={16} className="text-[#8b949e]" />
          <span>{PROFILE.location}</span>
        </li>
        <li className="flex items-center gap-2">
          <LinkIcon size={16} className="text-[#8b949e]" />
          <a href={PROFILE.github} className="hover:underline text-[#c9d1d9] font-semibold">
            {PROFILE.github.replace("https://", "")}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} className="text-[#8b949e]" />
          <a href={`mailto:${PROFILE.email}`} className="hover:underline text-[#c9d1d9]">
            {PROFILE.email}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Twitter size={16} className="text-[#8b949e]" />
          <a href="#" className="hover:underline text-[#c9d1d9]">
            @devpatel
          </a>
        </li>
      </ul>

      <div className="border-t border-[#30363d] pt-4 mt-4">
        <h2 className="text-[16px] font-semibold text-[#c9d1d9] mb-2">Organizations</h2>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center font-bold text-xs text-[#8b949e]">
            ORG
          </div>
        </div>
      </div>
    </div>
  );
}
