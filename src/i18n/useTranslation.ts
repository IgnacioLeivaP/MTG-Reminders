import { useLanguageStore } from '../store/useLanguageStore';
import { translations, Language } from './translations';

export function useTranslation() {
  const language = useLanguageStore(state => state.language) as Language;
  return translations[language] ?? translations.en;
}
