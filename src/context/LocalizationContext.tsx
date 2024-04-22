import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { defaultLanguage, Locale, languages } from "../config";

export const LocalizationContext =
  createContext<LocalizationContextType | null>(null);

export type LocalizationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LocalizationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState(defaultLanguage);
  return (
    <LocalizationContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocale must be used within an LocalizationProvider");
  }
  return { languages, ...context };
};
