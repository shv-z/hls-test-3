import axios from "@/plugins/axios-instance";
import {USER, apiUrls, keys} from "@/config/constants";

export default {
    login({commit}) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            let rememberMe = true;
            axios.post('/user/login', USER)
                .then(resp => {
                    const user = resp.data.body;
                    const token = user.token;
                    axios.defaults.headers.common[keys.token.header] = token;
                    if (rememberMe) {
                        localStorage.setItem(keys.token.local, token);
                        localStorage.setItem(keys.user.local, JSON.stringify(user));
                    }
                    commit('auth_success', {token, user});
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error');
                    reject(err)
                })
        })
    },
    register({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios.post(apiUrls.user.SIGNUP, user)
                .then(resp => {
                    const user = resp.data.body;
                    const token = user.token;
                    axios.defaults.headers.common[keys.token.header] = token;
                    localStorage.setItem(keys.token.local, token);
                    localStorage.setItem(keys.user.local, JSON.stringify(user));
                    commit('auth_success', {token, user});
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err);
                    reject(err)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit('logout');
            delete axios.defaults.headers.common[keys.token.header];
            localStorage.removeItem(keys.token.local);
            localStorage.removeItem(keys.user.local);
            resolve()
        })
    },
    setAccountTab({commit}, tab) {
        commit('accountTab', tab)
    },
    setIdPlaylist({commit}, id) {
        commit('playlistId', id)
    },
    changeTheme(store, darkThemeOn) {
        let theme = darkThemeOn ? 'dark' : '';
        store.state.theme = theme;
        localStorage.setItem(keys.theme.local, theme);
    }
}