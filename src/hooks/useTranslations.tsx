import en from "../translations/en_GB.json";
import fr from "../translations/fr_FR.json";

import { useLocale } from "../context";
import { Locale } from "../config";

const translations: Record<Locale, typeof en | typeof fr> = {
  en,
  fr,
};

export const useTranslation = () => {
  const { locale } = useLocale();
  const translation = translations[locale];

  const t = (key: keyof typeof en | keyof typeof fr) => {
    return translation?.[key] || key;
  };

  return t;
};
