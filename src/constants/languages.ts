import type { Language } from "@/types/types";

export const LANGUAGE_OPTIONS: Array<{
  code: Language;
  shortLabel: string;
  fullLabel: string;
  marker: string;
}> = [
  { code: "en", shortLabel: "EN", fullLabel: "English", marker: "EN" },
  { code: "ur", shortLabel: "UR", fullLabel: "Urdu", marker: "UR" },
];

export const LANGUAGE_LABELS: Record<Language, string> = Object.fromEntries(
  LANGUAGE_OPTIONS.map(({ code, shortLabel }) => [code, shortLabel]),
) as Record<Language, string>;

export const LANGUAGE_FULL_LABELS: Record<Language, string> = Object.fromEntries(
  LANGUAGE_OPTIONS.map(({ code, fullLabel }) => [code, fullLabel]),
) as Record<Language, string>;

export const LANGUAGE_MARKERS: Record<Language, string> = Object.fromEntries(
  LANGUAGE_OPTIONS.map(({ code, marker }) => [code, marker]),
) as Record<Language, string>;
