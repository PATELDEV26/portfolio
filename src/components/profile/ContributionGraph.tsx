export function ContributionGraph() {
  // Generate dummy data for the graph (365 days)
  const generateData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      // Randomly assign activity level 0-4
      // Bias towards 0 for realism
      const random = Math.random();
      let level = 0;
      if (random > 0.6) level = 1;
      if (random > 0.8) level = 2;
      if (random > 0.9) level = 3;
      if (random > 0.95) level = 4;
      
      data.push({ date, level });
    }
    return data;
  };

  const data = generateData();
  
  // Group into weeks (52 weeks)
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "var(--color-calendar-graph-day-L1-bg)";
      case 2: return "var(--color-calendar-graph-day-L2-bg)";
      case 3: return "var(--color-calendar-graph-day-L3-bg)";
      case 4: return "var(--color-calendar-graph-day-L4-bg)";
      default: return "var(--color-calendar-graph-day-bg)";
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="border border-[#30363d] rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] text-[#c9d1d9]">1,204 contributions in the last year</h2>
        <div className="text-[12px] text-[#8b949e]">Contribution settings</div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col">
          <div className="flex gap-[3px] ml-8 mb-2">
            {months.map((m, i) => (
              <div key={i} className="text-[12px] text-[#8b949e] flex-1 min-w-[36px]">{m}</div>
            ))}
          </div>
          
          <div className="flex gap-[3px]">
            <div className="flex flex-col justify-between text-[12px] text-[#8b949e] mr-2 py-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day, j) => (
                  <div
                    key={j}
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ backgroundColor: getLevelColor(day.level) }}
                    title={`${day.date.toDateString()}: ${day.level} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-[12px] text-[#8b949e]">
        <a href="#" className="hover:text-[#58a6ff]">Learn how we count contributions</a>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[var(--color-calendar-graph-day-bg)]"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[var(--color-calendar-graph-day-L1-bg)]"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[var(--color-calendar-graph-day-L2-bg)]"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[var(--color-calendar-graph-day-L3-bg)]"></div>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[var(--color-calendar-graph-day-L4-bg)]"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
