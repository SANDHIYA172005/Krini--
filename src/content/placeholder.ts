/**
 * A fact the live site does not state. It renders as a dashed "TBC" chip
 * (ui.tsx, Fact) instead of an invented claim, until the real value is filled in.
 */
export type Placeholder = { placeholder: true; note: string };
export const placeholder = (note: string): Placeholder => ({ placeholder: true, note });
export const isPlaceholder = (v: unknown): v is Placeholder =>
  typeof v === "object" && v !== null && (v as Placeholder).placeholder === true;
