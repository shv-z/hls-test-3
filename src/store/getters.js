export default {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getLocale: state => state.locale
}