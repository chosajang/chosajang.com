<template>
  <div class="login-wrap">
    <div class="logo">
      <div class="logo-image"></div>
      <div class="logo-text">CHOSAJANG</div>
    </div>
    <div class="loginForm">
      <div class="form-wrap">
        <div class="title">ID(Email)</div>
        <div class="form">
          <input type="text" v-model="loginInfo.id" @keyup="idCheck" :class="input_id" placeholder="ID(Email)을 입력하세요"/>
          <span class="error-message">{{ id_error_message }}</span>
        </div>
      </div>
      <div class="form-wrap">
        <div class="title">Password</div>
        <div class="form">
          <input type="password" v-model="loginInfo.password" @keyup="passwordCheck" :class="input_password" placeholder="비밀번호를 입력하세요"/>
          <span class="error-message">{{ password_error_message }}</span>
        </div>
      </div>
      <div class="form-wrap">
        <div class="regist-id-wrap">
          <input type="checkbox" id="regist-id">
          <label for="regist-id">아이디 기억하기</label>
        </div>
        <div class="login-button-wrap">
          <b-button variant="dark" class="btn-lg" @click="loginUser">Login</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserLogin } from '@/api';
// import { testFunc } from '@/utils/common.js';
// console.log(JSON.parse(localStorage.userInfo));

export default {
  data () {
    return {
      loginInfo: {
        id: '',
        password: ''
      },
      id_error_message: '',
      password_error_message: '',
      input_id: '',
      input_password: ''
    };
  },
  methods: {
    async login () {
      try {
        console.log('login');
      } catch (error) {
        console.log(error);
      }
    },
    idCheck () {
      const id = this.loginInfo.id;
      // eslint-disable-next-line no-useless-escape
      const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      if (id.length === 0) {
        this.input_id = '';
        this.id_error_message = '아이디(ID)를 입력하세요';
        return false;
      } else if (id.length < 7) {
        // ID는 최소 7자 이상이어야 합니다
        this.input_id = 'error';
        this.id_error_message = '아이디(ID)는 7자 이상이어야 합니다';
        return false;
      } else if (regExp.test(id) === false) {
        // 아이디(ID)는 이메일형식으로 입력해야합니다
        this.input_id = 'error';
        this.id_error_message = '아이디(ID)는 이메일형식으로 입력해야합니다';
        return false;
      } else {
        this.input_id = 'active';
        this.id_error_message = '';
        return true;
      }
    },
    passwordCheck () {
      const password = this.loginInfo.password;
      const num = /[0-9]/g;
      const eng = /[a-z]/ig;
      const spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;

      if (password.length === 0) {
        this.input_password = '';
        this.password_error_message = '비밀번호를 입력하세요';
        return false;
      } else if (password.length < 8 || password.length > 20) {
        // 비밀번호 길이는 8~20자 사이여야 합니다
        this.input_password = 'error';
        this.password_error_message = '비밀번호 길이는 8~20자 사이입니다';
        return false;
      } else if (password.search(/\s/) !== -1) {
        // 비밀번호는 공백없이 입력해주세요
        this.input_password = 'error';
        this.password_error_message = '비밀번호는 공백없이 입력해주세요';
        return false;
      } else if (password.search(num) < 0 || password.search(eng) < 0 || password.search(spe) < 0) {
        // 비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다
        this.input_password = 'error';
        this.password_error_message = '비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다';
        return false;
      } else {
        this.input_password = 'active';
        this.password_error_message = '';
        return true;
      }
    },
    loginUser () {
      this.$swal('Hello Vue world!!!');
      if (this.idCheck() && this.passwordCheck()) {
        // const vm = this;
        const id = this.loginInfo.id;
        const pwd = this.loginInfo.password;
        fetchUserLogin(id, pwd)
          .then(response => {
            const loginResponse = response.data;
            if (loginResponse.result) {
              localStorage.userInfo = JSON.stringify(loginResponse);
              console.log('로그인 성공');
            } else {
              // 로그인 정보가 올바르지 않습니다
              console.log('로그인 실패');
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log('paramCheck False');
      }
    }//   EOF   loginUser
  }//   EO    methods:
};
</script>

<style scoped>
/**
 * default(Desktop)
 */
.login-wrap {
  margin: 0 auto;
  margin-top: 15%;
  width: 400px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  margin: 0 auto;
  width: 100%;
}

.logo .logo-image {
  width: 60px;
  height: 60px;
  background-image: url('/img/people.png');
  background-size: cover;
}

.logo .logo-text {
  font-size: 30px;
  letter-spacing: 5px;
  text-decoration: none;
}

.loginForm {
  margin-top: 10px;
  clear: both;
  background-color: #FFF;
  width: 100%;
  height: 310px;
  border-radius: 5px;
}

.form-wrap {
  margin: 0px 30px 0px 30px;
  padding-top: 30px;
  width: 340px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: #2D353C;
}

.form-wrap .form {
  width: 340px;
}

input[type=text]:focus, input[type=password]:focus {
  outline: none;
  transition: .3s;
  color: #45BEAC;
  border-bottom: 3px solid #45BEAC;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 8px 14px;
  margin: 4px 0;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  border: none;
  border-bottom: 3px solid #2D353C;
}

input[type=text].error, input[type=password].error {
  color: #FF0000;
  border-bottom: 3px solid #FF0000;
}

input[type=text].active, input[type=password].active {
  color: #45BEAC;
  border-bottom: 3px solid #45BEAC;
}

input::placeholder {
  color: #B6B6B6;
}

.form .error-message {
  float: left;
  color: #FF0000;
  font-size: 12px;
  font-weight: bold;
}

.regist-id-wrap {
  float: left;
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
}

.regist-id-wrap label {
  margin-left: 5px;
}

.login-button-wrap {
  float: right;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .login-wrap {
    margin-top: 10%;
    width: 100%;
  }

  .logo .logo-image {
    width: 50px;
    height: 50px;
  }

  .logo .logo-text {
    font-size: 26px;
    letter-spacing: 3px;
    text-decoration: none;
  }

  .loginForm {
    background-color: #FFF;
    width: 100%;
    height: 310px;
    border-radius: 0px;
  }

  .form-wrap {
    margin: 0px;
    width: 100%;
  }

  .form-wrap .title {
    margin-left: 10px;
  }

  .form-wrap .form {
    width: 100%;
  }

  .regist-id-wrap {
    margin: 14px 0px 0px 10px;
  }

  .login-button-wrap {
    margin-right: 10px;
  }

  .form .error-message {
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
