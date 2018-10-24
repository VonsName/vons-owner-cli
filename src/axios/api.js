import axois from 'axios'
import config from './config'
import qs from 'qs'

export default function $axois(options) {
  return new Promise((resolve, reject) => {
    const instance = axois.create({
      baseURL: config.baseURL,
      headers: config.headers,
      transformResponse: [function (data) {
      }]
    });

    //request拦截器
    instance.interceptors.request.use(
      config => {
        //请求带上token,没有token重定向到登录页面
        if (this.GLOBAL.token) {
          config.headers.token = this.GLOBAL.token;
        } else {
          config.headers.token = '';
        }
        //post请求序列化参数
        if (config.method.toLocaleLowerCase() === 'post') {
          config.data = qs.stringify(config.data);
        }
        return config;
      },
      error => {
        console.log('request', error);
        //判断请求超时
        if (error.message.indexOf('timeout') !== -1) {

        }
        //重定向到错误页面
        const errorInfo = error.response;
        console.log(errorInfo);
        if (errorInfo) {
          const errorStatus = errorInfo.status;
          this.$router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error);
      }
    );

    //response拦截器
    instance.interceptors.response.use(
      (response) => {
        let data;
        data = response.data.data;
        switch (response.data.code) {
          case this.GLOBAL.SUCCESS:
            break;
          case this.GLOBAL.FAILED:
            break;
          default:
            this.$router.push({
              path: `/error/401`
            });
            break;
        }
        return data;
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '请求路径未找到';
              break;

            case 401:
              error.message = '未授权，请登录';
              break;

            case 403:
              error.message = '拒绝访问';
              break;

            case 404:
              error.message = `请求地址出错: ${error.response.config.url}`;
              break;

            case 408:
              error.message = '请求超时';
              break;

            case 500:
              error.message = '服务器内部错误';
              break;

            case 501:
              error.message = '服务未实现';
              break;

            case 502:
              error.message = '网关错误';
              break;

            case 503:
              error.message = '服务不可用';
              break;

            case 504:
              error.message = '网关超时';
              break;

            case 505:
              error.message = 'HTTP版本不受支持';
              break;
            default:
              error.message = '网络错误';
          }
        }
        console.log(error);
        return Promise.reject(error);
      }
    );

    instance(options).then((res) => {
      resolve(res);
      return false;
    }).catch((error) => {
      reject(error);
    })
  })
}
