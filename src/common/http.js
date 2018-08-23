import axios from 'axios';

const OVER_TIME = 5000;// 请求的超时时间

const http = axios.create({
    baseURL: process.env.BASER_URL,
    timeout: OVER_TIME,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // withCredentials: true // 允许携带cookie
});
http.interceptors.request.use(
    config => config,
    err => Promise.reject(err));

http.interceptors.response.use(
    (response) => {
        const { status } = response;
        switch (status) {
            case 204:
                debugger;
                break;
            default:
                break;
        }
        return response;
    },
    (error) => {
        let msg = '';
        if (error.response) {
            switch (error.response.status) {
                case 302:
                    debugger;
                    break;
                case 400:
                    msg = '请求出现语法错误!';
                    break;
                case 401:
                    msg = '权限不足，未认证！';
                    break;
                case 403:
                    msg = '权限不足，不能访问该资源！';
                    break;
                case 404:
                    msg = '访问的资源不存在!';
                    break;
                case 500:
                    msg = '服务器异常！';
                    break;
                default:
                    msg = error.response.data.error;
                    break;
            }
        }
        return Promise.reject(msg);
    });
export default http;
