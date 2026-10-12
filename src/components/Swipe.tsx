/**
 * Phones (under 640px): rows of cards that would stack into a long column
 * swipe sideways instead (a list with `className="m-swipe" data-swipe`, the
 * next card peeking in at the edge). Under the row: where you are, as bars
 * and "02 / 04", and buttons for the previous and next card. Hidden from
 * 640px, where the row is a grid again, and without JavaScript (the row still
 * swipes). Behaviour: src/motion/mobile.ts.
 */
export function SwipeUI({ count, label }: { count: number; label: string }) {
  const total = String(count).padStart(2, "0");
  return (
    <div className="swipe-ui" data-swipe-ui>
      <span className="swipe-bars" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={i === 0 ? "is-on" : undefined} />
        ))}
      </span>
      <span className="swipe-count label" aria-hidden="true">
        <b data-swipe-now>01</b> / {total}
      </span>
      <span className="swipe-btns">
        <button type="button" className="swipe-btn" data-swipe-prev aria-label={`Previous: ${label}`} disabled>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.5 6 8.5 12l6 6" />
          </svg>
        </button>
        <button type="button" className="swipe-btn" data-swipe-next aria-label={`Next: ${label}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9.5 6 6 6-6 6" />
          </svg>
        </button>
      </span>
    </div>
  );
}
