/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
// import router from '../router';
//  import store from '../store/index';
// import { Message } from 'element-ui';

/** 
 * 提示信息
 */
// const tip = msg => {
//   Message({
//     message: msg,
//     duration: 1000,
//   });
// }

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// }

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 400: 请求数据不合法
    case 400:
      console.log("请求数据不合法");
      break;
    // 401: 未登录状态，跳转登录页
    case 401:
    //   toLogin();
      console.log("未登录");
      break;
    // 403 服务器拒绝请求  
    // (token过期?) 清除token并跳转登录页
    case 403:
      console.log("服务器拒绝请求");
    //   tip('登录过期，请重新登录');
      // localStorage.removeItem('token');
      //  store.commit('loginSuccess', null);
      // setTimeout(() => {
      //   toLogin();
      // }, 1000);
      break;
    // 404请求不存在
    case 404:
      // tip('请求的资源不存在');
      console.log("找不到请求的页面");
      break;
    case 418:
      console.log("账号状态异常");
      break;
    default:
      console.log(other);
  }
}

// 创建axios实例
var instance = axios.create();
// 设置请求超时
instance.defaults.timeout = 8000;
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json';
// 本地开发接口代理
// instance.defaults.baseURL = '/api';

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
    //  const token = store.state.token;        
    //  token && (config.headers.Authorization = token);        
    return config;
  },
  error => Promise.error(error))

// 响应拦截器（基础版）
instance.interceptors.response.use(
  function(response) {
    // 接口响应成功（200）
    // 与后端约定好接口规范，如格式：{status:200,data:[]}，状态码最好根据业务来确定。
    let res = response.data // 接口返回值
    // let path = location.hash; // 获取当前路由hash
    if (res.status == 200) {
      // console.log("here");
      return Promise.resolve(res.data);
    // } else if (res.status == 10) { //没有登录
    //   // 非首页访问，需要登录
    //   if (path !== '#/index') {
    //     toLogin(); // 跳转登录
    //   }
    //   return Promise.reject(res.data);
    } else {
    //   tip(res.msg); // 提示信息
      errorHandle(res.status,res.data);
      return Promise.reject(res.data);
    }
  }, (error) => {
    // 接口响应失败（500）
    let res = error.response;
    // Message.error(res.data.message); // 提示信息
    return Promise.reject(res.data);
  })

// 响应拦截器（规范版）
// instance.interceptors.response.use(
//   // 请求成功
//   res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
//   // 请求失败
//   error => {
//     const { response } = error;
//     if (response) {
//       // 请求已发出，但是不在2xx的范围 
//       errorHandle(response.status, response.data.message);
//       return Promise.reject(response);
//     } else {
//       // 处理断网的情况
//       // eg:请求超时或断网时，更新state的network状态
//       // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
//       // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
//       if (!window.navigator.onLine) {
//         // store.commit('changeNetwork', false);
//       } else {
//         return Promise.reject(error);
//       }
//     }
//   });

export default instance;