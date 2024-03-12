import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import checkUserLanguage from '../utils/checkUserlanguage';

const userLanguage = checkUserLanguage();

i18next.use(initReactI18next).init({
  lng: userLanguage,
  debug: true,
  resources: {
    en: {
      translation: {
        "title": "welcme {{name}}",
        "description": {
          "part1": "simple test",
          "part2": "😉"
        },
        "userMessagesUnread_one": "You have {{count}} unread message.",
        "userMessagesUnread_other": "You have {{count}} unread messages."
      }
    },
    pt: {
      translation: {
        "title": "bem-vindo {{name}}",
        "description": {
          "part1": "Isso é um exemplo simples",
          "part2": "😉"
        },
        "userMessagesUnread_one": "You have {{count}} unread message.",
        "userMessagesUnread_other": "You have {{count}} unread messages."
      }
    }
  },
});