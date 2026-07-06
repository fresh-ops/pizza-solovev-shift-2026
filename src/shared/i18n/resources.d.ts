import "i18next";
import { TranslationTypes } from "./translations/TranslationTypes";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: TranslationTypes;
  }
}
