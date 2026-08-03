export function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: [string, string];
  sub: string;
}) {
  return (
    <div className="border-t-[3px] border-double border-ink pt-5">
      <p className="label-kicker text-stamp">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-5xl">
        {title[0]}{" "}
        <em className="font-normal italic text-ink-soft">{title[1]}</em>
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
        {sub}
      </p>
    </div>
  );
}
