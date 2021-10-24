import axios from 'axios'

// axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function request(config) {
    const instance = axios.create({
        //由于有跨域问题，所以调试和打包用不同的baseURL
        baseURL: Object.is(process.env.NODE_ENV, 'production') ? 'http://47.107.64.149:3000' : '/apis/',
        // baseURL: 'http://47.107.64.149:3000',
        timeout: 5000
    })

    //返回promise对象
    return instance(config);
}