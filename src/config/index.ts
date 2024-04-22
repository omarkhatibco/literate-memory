export const allowedLanguages = ["en", "fr"] as const;

export type Locale = (typeof allowedLanguages)[number];

export const defaultLanguage: Locale = "fr";

export const languages: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};
