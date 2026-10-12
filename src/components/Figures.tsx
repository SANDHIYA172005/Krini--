import { site } from "../content/site";

/**
 * The company's figures as published on the live site. The numbers roll up on
 * mechanical counter wheels as they come into view (cinema.ts, data-odometer).
 */
export function Figures() {
  return (
    <>
      <dl className="grid grid-cols-2 border-t border-bone/10 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col justify-between gap-6 border-bone/10 py-8 sm:py-10 lg:px-8 ${i % 2 === 1 ? "border-l pl-5 sm:pl-8" : "pr-5"} ${
              i >= 2 ? "border-t lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""} ${i === 0 ? "lg:pl-0" : ""}`}
            data-reveal
          >
            <dt className="label order-2 text-mute">{s.label}</dt>
            <dd className="order-1">
              {"value" in s ? (
                <span className="display whitespace-nowrap text-[clamp(min(2.2rem,9.6vw),4.4vw,5rem)] leading-[0.85] tabular-nums">
                  <span className="odo" data-odometer={s.value}>
                    {s.value.toLocaleString("en-IN")}
                  </span>
                  <span className="text-amber">{s.suffix}</span>
                </span>
              ) : (
                <span className="display text-[clamp(1.35rem,3vw,2.75rem)] leading-[0.95]">{s.text}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
