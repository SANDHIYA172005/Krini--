import { places, processMedia, processPage, processSteps, stepNo, type ProcessStep } from "../content/process";
import { CgNote, Fact, SectionHead } from "./ui";

const placeOf = (s: ProcessStep) => places.find((p) => p.id === s.place)!;

/**
 * One step's picture in the film frame: its looping clip once the clips are in
 * place, a title card until then. Nothing loads until it is needed: the clip's
 * addresses wait in data-src (1280 wide) and data-src-small (960 wide), and its
 * poster (the loop's first frame) in data-poster, except the first step's,
 * which shows before any script runs. process.ts loads a step's clip and
 * poster as it comes near (the clip never with Save-Data).
 */
function Shot({ s, on, first }: { s: ProcessStep; on: boolean; first: boolean }) {
  return (
    <div className={`process-shot${on ? " is-on" : ""}`} data-process-shot>
      {processMedia.ready ? (
        <Clip s={s} eager={first} />
      ) : (
        <div className="process-card">
          <span className="process-card-n display">{stepNo(s)}</span>
          <span className="process-card-place label">{placeOf(s).label}</span>
          <span className="process-card-title display-tight">{s.title}</span>
        </div>
      )}
    </div>
  );
}

/** A step's looping clip (muted, no controls); `eager`: its poster shows straight away. */
function Clip({ s, eager, inView }: { s: ProcessStep; eager?: boolean; inView?: boolean }) {
  const poster = processMedia.poster(s);
  return (
    <video
      className="process-video"
      muted
      playsInline
      loop
      preload="none"
      disablePictureInPicture
      poster={eager ? poster : undefined}
      data-poster={eager ? undefined : poster}
      data-src={processMedia.clip(s)}
      data-src-small={processMedia.clipSmall(s)}
      data-autoplay-in-view={inView ? "" : undefined}
      width={processMedia.width}
      height={processMedia.height}
    />
  );
}

/**
 * How it's made: the journey in ten steps. A film frame stays in place
 * (sticky; at the top on phones and tablets, on the left from 1024px) while
 * the steps scroll past; the step crossing the reading line is the one shown,
 * and its clip plays (only that one; the clips load as their steps come near).
 * Under the frame, the steps grouped by place: each is a button that scrolls
 * to its step, and they fill as the journey goes. The steps are grouped by
 * where they happen, so it is clear that only the last two happen at our
 * plant. Under the heading, a note that the clips are AI-generated
 * illustrations (kept out of the frame, so on phones the part that stays on
 * screen is no taller than it must be). Behaviour: src/motion/process.ts.
 * Without scripts, every step reads in full and the frame shows the first step.
 */
export function ProcessFlow({ label, heading }: { label: string; heading: string }) {
  return (
    <section id="journey" className="section-tight" aria-labelledby="journey-title" data-process>
      <div className="frame">
        <SectionHead>{label}</SectionHead>
        <h2 id="journey-title" className="display mt-10 text-display-sm lg:mt-14" data-split>
          {heading}
        </h2>
        {processMedia.ready ? (
          <p className="process-credit">
            <CgNote>{processMedia.credit}</CgNote>
          </p>
        ) : null}
        <div className="process-grid">
          <div className="process-stage">
            <div className="process-frame" aria-hidden="true">
              {processSteps.map((s, i) => (
                <Shot key={s.id} s={s} on={i === 0} first={i === 0} />
              ))}
              <p className="process-now label" data-process-now>
                {stepNo(processSteps[0])} / {processSteps.length} · {placeOf(processSteps[0]).label}
              </p>
            </div>
            <nav className="process-bar" aria-label="Steps">
              {places.map((pl) => (
                <div key={pl.id} className="process-group" style={{ flexGrow: processSteps.filter((s) => s.place === pl.id).length }}>
                  <span className="process-group-label label">
                    <span className="process-group-full">{pl.label}</span>
                    <span className="process-group-short">{pl.bar}</span>
                  </span>
                  <span className="process-ticks">
                    {processSteps
                      .filter((s) => s.place === pl.id)
                      .map((s) => (
                        <a key={s.id} href={`#step-${s.id}`} className="process-tick" data-process-jump aria-label={`Step ${stepNo(s)}: ${s.title}`}>
                          <span className="process-tick-fill" />
                        </a>
                      ))}
                  </span>
                </div>
              ))}
            </nav>
          </div>

          <ol className="process-steps">
            {processSteps.map((s, i) => {
              const pl = placeOf(s);
              const first = i === 0 || processSteps[i - 1].place !== s.place;
              return (
                <li key={s.id} id={`step-${s.id}`} className={`process-step${i === 0 ? " is-on" : ""}`} data-process-step data-place={pl.label}>
                  {first ? (
                    <p className="process-place label">
                      <span>{pl.label}</span>
                      <span className="text-mute">{pl.where}</span>
                    </p>
                  ) : null}
                  <p className="process-n label">{stepNo(s)}</p>
                  <h3 className="process-title display-tight">{s.title}</h3>
                  <p className="process-body">{s.body}</p>
                  {s.tbc ? (
                    <p className="process-tbc">
                      {s.tbc.map((t) => (
                        <Fact key={t.note} value={t} />
                      ))}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** What changes from line to line: the base oil and the additives for each kind of product. */
export function ProcessMix() {
  const m = processPage.mix;
  return (
    <section id="by-product" className="section theme-navy" aria-labelledby="mix-title">
      <div className="frame">
        <SectionHead>{m.label}</SectionHead>
        <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <h2 id="mix-title" className="display text-display-sm lg:col-span-7" data-split>
            {m.heading}
          </h2>
          <p className="max-w-md self-end text-mute lg:col-span-4 lg:col-start-9" data-reveal>
            {m.lead}
          </p>
        </div>
        <ul className="mix-grid mt-12 lg:mt-20">
          {m.items.map((it) => (
            <li key={it.title} className="mix-item" data-reveal>
              <span className="pcard-badge label" data-line={it.line}>
                {it.line === "lubricants" ? "Lubricants" : it.line === "construction" ? "Construction" : "Aerosols"}
              </span>
              <h3 className="mix-title display-tight">{it.title}</h3>
              <p className="mix-body">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
