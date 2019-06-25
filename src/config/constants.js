const USER = {
    email: 's2s2s2@gmail.com',
    password: 's2s2s2'
};

// let env = {
//     'production': 'https://api.musiccapital.ru/v1',
//     'development': 'https://api.stage.musiccapital.ru/v1'
// };

let apiUrls = {
    // baseURL: env[process.env.NODE_ENV] || env.development,
    // baseURL: 'https://api.stelliummusic.ru/v1', //73
    baseURL: 'https://api.stellium.bigdig.com.ua/v1',//5 (4)
    user: {
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
    },
    sets: {
        GET_MY: '/library/set',
        DELETE: '/library/set-delete',
        UPDATE: '/library/set-update'
    },
    browse: {
        CATEGORIES: '/feature/feature-filter'
    },
    search: {
        FEATURE_TYPE: '/feature/list',
        FEATURE_MOOD: '/feature/value',
        PLAYLISTS: '/search/playlist'
    },
    playlist: {
        MEDIA: '/playlist/media'
    },
    profile: {
        CHANGE_PASSWORD: '/user/change-password',
    },
};

let keys = {
    user: {
        local: 'user'
    },
    token: {
        header: 'x-api-key',
        local: '_x-api-key'
    },
    deviceId: {
        header: 'device-id',
        local: '_did'
    },
    volume: {
        local: '_player-volume'
    },
    locale: {
        local: '_locale'
    },
    theme: {
        local: '_theme'
    }
};

export {USER, apiUrls, keys}