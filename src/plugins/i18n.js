import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { keys } from "@/config/constants";
import ru from "@/config/i18n/ru";
import en from "@/config/i18n/en";

Vue.use(VueI18n);

const messages = {
    'ru': ru,
    'en': en
};

const i18n = new VueI18n({
    locale: localStorage.getItem(keys.locale.local) || 'ru',
    fallbackLocale: 'en',
    messages
});

export default i18n;