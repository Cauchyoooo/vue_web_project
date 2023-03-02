<template>
  <div class="auth">
    <div class="container">
      <div class="content">
        <div class="img-box">
          <img src="../assets/images/auth/1.png"/>
        </div>
        <div class="user">
          <div class="nav-bar">
            <ul>
              <div class="nav-li" v-for="(item,index) in navList" :class="{'active-style':nowIndex === index}" @click="tabClick(index)">
                <p class="tag">{{item.name}}</p>
              </div>
            </ul>
          </div>
          <swiper class="swiper-container" ref="mySwiper" :options="swiperOptions">
            <!-- <div class="swiper-wrapper"> -->
            <!-- 登录 -->
            <swiper-slide class="swiper-slide form-box">
              <el-form :model="loginData" :rules="formRule" ref="loginForm">
                <el-form-item prop="phone" class="swiper-no-swiping">
                  <el-input v-model="loginData['phone']" maxlength="11" type="text" placeholder="手机号" ref="loginTel" @input="loginData['phone']=loginData['phone'].replace(/[^0-9.]/g,'')"/>
                </el-form-item>
                <el-form-item prop="passwd" class="swiper-no-swiping">
                  <el-input v-model="loginData['passwd']" maxlength="16" type="password" placeholder="密码" ref="loginPw"/>
                </el-form-item>
                <div class="second-check" v-if="isCheck">
                  <p>为保障您的账号安全，需要进行手机号验证</p>
                  <button type='button' class="check-btn swiper-no-swiping" @click="loginGetCode">获取验证码</button>
                  <el-form-item prop="2fa" class="swiper-no-swiping">
                    <el-input v-model="loginData['2fa']" maxlength="5" type="text" placeholder="手机验证码" ref="loginCheck"/>
                  </el-form-item>
                </div>
                <!-- 人机验证插件 -->
                <button type='button' class="auth-btn swiper-no-swiping" @click="login">登录</button>
              </el-form>
            </swiper-slide>
            <!-- 注册 -->
            <swiper-slide class="swiper-slide form-box">
              <el-form :model="registerData" :rules="formRule" ref="registerForm">
                <el-form-item prop="phone" class="swiper-no-swiping">
                  <el-input v-model="registerData['phone']" maxlength="11" type="text" placeholder="手机号" ref="registerTel"/>
                </el-form-item>
                <button type='button' class="check-btn swiper-no-swiping" @click="registerGetCode">获取验证码</button>
                <el-form-item prop="2fa" class="swiper-no-swiping">
                  <el-input v-model="registerData['2fa']" maxlength="5" type="text" placeholder="手机验证码" ref="registerCheck"/>
                </el-form-item>
                <el-form-item prop="newpasswd" class="swiper-no-swiping">
                  <el-input v-model="registerData['passwd']" maxlength="16" type="password" placeholder="密码" ref="registerPw"/>
                </el-form-item>
                <el-form-item prop="checkpasswd" class="swiper-no-swiping">
                  <el-input v-model="checkpw" type="password" maxlength="16" placeholder="确认密码" ref="checkPw"/>
                </el-form-item>
                <!-- 人机验证插件 -->
                <button type='button' class="auth-btn swiper-no-swiping" @click="register">注册</button>
              </el-form>
            </swiper-slide>
            <!-- </div> -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: "Auth",
  components:{
    Swiper,
    SwiperSlide
  },
  // directives: {
  //   swiper:directive
  // },
  data() {
    return {
      navList:[
        {name: "登录"},
        {name: "注册"}
      ],
      nowIndex: 0,
      isCheck: false,
      loginData: {
        'phone': '',
        'passwd':  '',
        '2fa': '',
        'redirect': 'url'
      },
      registerData: {
        'phone': '',
        'passwd': '',
        '2fa': '',
        'captcha_token': 'token'
      },
      formRule: {
        'phone': [{ required: true, validator: this.validatorPhone, trigger: 'blur' }],
        'passwd': [{ required: true, validator: this.validatorPass, trigger: 'blur' }],
        'newpasswd': [],
        'checkpasswd': [],
        '2fa': []
      },
      checkpw: '',
      swiperOptions: {
        initialSlide: 0,
        autoplay: false,
        keyboardControl: true,
        autoHeight: true,
        observer: true,
        observerParents: true,
        direction:'horizontal',
        grabCursor: true,
        noSwiping: true,
        on: {
          slideChangeTransitionEnd: () => {
            this.nowIndex = this.swiper.activeIndex;
            this.clearBox();
          },
        },
        pagination: {
          el: '.swiper-pagination',    //与slot="pagination"处 class 一致
        }
      },
    }
  },
  computed:{
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    // this.initSwiper();
    // this.swiper.init();
    console.log('Current Swiper instance object', this.swiper);
  },
  methods: {
    clearBox() {
      let login = this.loginData;
      let register = this.registerData;
      Object.keys(login).forEach(key => (login[key] = ''));
      Object.keys(register).forEach(key => (register[key] = ''));
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
    },
    tabClick(index) {
      this.nowIndex = index;
      this.clearBox();
      this.swiper.slideTo(index, 300, false);
    },
    getPhoneCheck() {

    },
    loginGetCode() {

    },
    login() {
      this.isCheck = true;
      return
    },
    registerGetCode() {

    },
    register() {

    },
    validatorPhone(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号！'))
      }
      else if (/^1[34578]\d{9}$/.test(value) == false) {
        callback(new Error("手机号格式错误，请输入11位合法手机号！"));
      } 
      callback()
    },
    validatorPass(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入密码！'))
      }
      callback()
    },
    validatorNewPass(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入密码！'))
      }
      callback()
    },
  }
}
</script>

<style lang="scss">
.auth {
  position: relative;
  min-height: 95vh;
  min-width: 95vw;
  // background: rgb(255,148,41);
  // background: linear-gradient(99deg, rgba(255,148,41,1) 0%, rgba(208,0,0,0.8632586823792017) 38%, rgba(199,0,203,0.8968721277573529) 78%, rgba(127,0,158,1) 100%); 
  background-image: linear-gradient(to right, #f9d423 0%, #ff4e50 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5vh 2.5vw;
  transition: 0.5s;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  .container {
    position: relative;
    width: 800px;
    height: 500px;
    background-color: #fff;
    box-shadow: 0 15px 50px rgba(0,0,0,0.1);
    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      .img-box {
        position: relative;
        width: 50%;
        height: 100%;
        transition: 0.5s;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .user {
      text-align: left;
      width: 50%;
      overflow: clip;
      .form-box {
        position: relative;
        // width: 50%;
        height: 100%;
        background-color: #fff;
        display: flex;
        // display: none;
        justify-content: center;
        align-items: center;
        padding: 5%;
        transition: 0.5s;
        form {
          width: 100%;
          height: 100%;
        }
        el-input {
          width: 100%;
          padding: 2%;
          background-color: #f5f5f5;
          color: #333;
          border: none;
          outline: none;
          box-shadow: none;
          font-size: 14px;
          margin: 8px 0;
          letter-spacing: 1px;
          font-weight: 300;
        }
        button {
          // max-width: 200px;
          border-radius: 4px;
          background-color: #e29611;
          color: #fff;
          font-size: 14;
          font-weight: 500;
          letter-spacing: 1px;
          padding: 5px 10px;
          // border-radius: 15px;
          cursor: pointer;
          width: 50%;
          margin: 5% 0;
          
        }
        // button:hover {
        //     background-color: #b48361;
        // }

      }
    }
    .nav-bar {
      width: 100%;
      height: 10%;
      border-bottom: 1px solid rgba(151,151,151,0.1);
      position: relative;
      .nav-li {
        padding: 3% 0;
        text-align: center;
        float: left;
        margin: 0 5%;
        width: 40%;
        cursor: pointer;
        p {
          font-style: normal;
          font-size: 16px;
        }
      }
      .active-style {
        color: #d38900;
        padding-bottom: 2px;
        border-bottom: 2px solid #d38900;
      }
    }
    .swiper-container {
      width: 100%;
      margin-bottom: 40px;
      position: relative;
      height: 90%;
      
    }
    .swiper-wrapper {
        width: 200%;
        height: 100%;
        display: flex;
    }
    .swiper-pagination-bullets {
      display: none;
    }
    // .swiper-slide {
    //   width: 100%;
    //   height: 100%;
    // }
  }
  @media (max-width:991px) {
    .container {
      max-width: 400px;
    }
    .container .img-box {
      display: none;
    }
    .container .user{
      width: 100%;
    }
  }
}
</style>