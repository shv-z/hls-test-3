import { keys } from "@/config/constants";

export default () => ({
    user: JSON.parse(localStorage.getItem(keys.user.local)) || {},
    status: localStorage.getItem(keys.token.local) ? 'auth' : '',
    token: localStorage.getItem(keys.token.local) || '',
    modals: [],
    feature: [],
    playlistId: null,
    locale: localStorage.getItem(keys.locale.local) || 'ru',
    theme: localStorage.getItem(keys.theme.local) || ''
});
