import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize i18next
const i18nPromise = i18next.use(Backend).init({
  lng: 'en', // Default language
  fallbackLng: 'en',
  backend: {
    loadPath: path.join(__dirname, 'locales/{{lng}}.json'),  // Translation file path
  },
  interpolation: {
    escapeValue: false,  // Not needed for Node.js
  },
});

export { i18next as i18n, i18nPromise };
