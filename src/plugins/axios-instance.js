import axios from 'axios'
import {apiUrls, keys} from '@/config/constants';

let axiosInstance = axios.create();

axiosInstance.defaults.baseURL = apiUrls.baseURL;
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Version'] = '1.0.0';
axiosInstance.defaults.headers.common['Accept-Language'] = localStorage.getItem(keys.locale.local) || 'ru';

if (localStorage.getItem(keys.token.local)) {
    axiosInstance.defaults.headers.common[keys.token.header] = localStorage.getItem(keys.token.local);
}

export default axiosInstance
