/*
鉴权系统(auth)相关接口
*/
import axios from './http';

const authApi = {
  // 获取手机验证码
  getPhoneCaptcha(params){
    return axios.get('api/v1/auth/2fa/sms',{params:params});
  },
  // 获取邮箱验证码
  getEmailCaptcha(params){
    return axios.get('api/v1/auth/2fa/email',{params:params});
  },
  // 密码登录
  loginByPassword(params){
    return axios.post('api/v1/auth/login/pass',params); 
  },
  // 手机验证码登录
  loginByPhoneCaptcha(params){
    return axios.post('api/v1/auth/login/sms',params); 
  },
  // 完整注册
  registerFull(params){
    return axios.post('api/v1/auth/register/full',params); 
  },
  // 快速注册
  registerQuick(params){
    return axios.post('api/v1/auth/register/quick',params); 
  },
  // 小程序注册
  registerWxapp(params){
    return axios.post('api/v1/auth/register/wxapp',params); 
  },
  // 获取 与服务器加密通讯使用的 ECDSA 公钥
  getToken(params){
    return axios.get('api/v1/auth/ptoken',{params:params});
  },
  // 用户登出
  logout(params){
    return axios.delete('api/v1/auth/session',{params:params});
  },
  // 重置密码
  resetPassword(params){
    return axios.post('api/v1/auth/updata/pass',params); 
  },
  // 删除账号
  delAccount(params){
    return axios.delete('api/v1/auth/updata/close',{params:params});
  },
  // 获取访问计数
  getApiCount(params){
    return axios.get('api/v1/auth/ptoken',{params:params});
  }, 
};

export default authApi;