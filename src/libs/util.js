import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : '正在加载...';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://localhost:7001' :
    env === 'production' ?
    'http://47.94.5.252:7002' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;