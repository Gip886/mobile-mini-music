import axois from 'axios'
export function request(config) {
    const instance = axois.create({
        //由于有跨域问题，所以调试和打包用不同的baseURL
        // baseURL: Object.is(process.env.NODE_ENV, 'production') ? 'https://api.zsfmyz.top/music/' : '/apis/',
        baseURL: 'http://47.107.64.149:3000',
        timeout: 5000
    })
    //返回promise对象
    return instance(config);
}