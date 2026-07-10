import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import type { TranslationTypes } from "./translations/TranslationTypes";

import ru from "./translations/ru.translation.json";

const resources: Record<string, { translation: TranslationTypes }> = {
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
