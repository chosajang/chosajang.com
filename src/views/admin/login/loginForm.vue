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
          <input type="text" :class="objClass.id" v-model="userInfo.id" @keyup="idCheck" placeholder="ID(Email)을 입력하세요"/>
          <span class="error-message">{{ errorMessage.id }}</span>
        </div>
      </div>
      <div class="form-wrap">
        <div class="title">Password</div>
        <div class="form">
          <input type="password" :class="objClass.password" v-model="userInfo.password" @keyup="passwordCheck" @keyup.13="loginUser" :disabled="objDisable === true" placeholder="비밀번호를 입력하세요"/>
          <span class="error-message">{{ errorMessage.password }}</span>
        </div>
      </div>
      <div class="form-wrap">
        <div class="regist-id-wrap">
          <input type="checkbox" id="regist-id" v-model="checkRegistId">
          <label for="regist-id">아이디 기억하기</label>
        </div>
        <div class="login-button-wrap">
          <b-button variant="primary" class="btn-lg" @click="loginUser" :disabled="objDisable === true">Login</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserLogin } from '@/api';

export default {
  created () {
    // userInfo 값이 있을 경우, 관리자 메인으로 이동
    if (localStorage.getItem('userInfo') !== null) {
      // const userInfo = JSON.parse(localStorage.userInfo);
      this.$router.push({
        name: 'admin.user'
      });
    }
  },
  data () {
    return {
      userInfo: {
        id: '',
        password: ''
      },
      errorMessage: {
        id: '',
        password: ''
      },
      objClass: {
        id: '',
        password: ''
      },
      checkRegistId: '',
      objDisable: false
    };
  },
  methods: {
    // async login () {
    //   try {
    //     console.log('login');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    idCheck () {
      const id = this.userInfo.id;
      // eslint-disable-next-line no-useless-escape
      const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      let idCheckResult = false;
      if (id.length === 0) {
        this.objClass.id = '';
        this.errorMessage.id = '아이디(ID)를 입력하세요';
      } else if (id.length < 7) {
        // ID는 최소 7자 이상이어야 합니다
        this.objClass.id = 'error';
        this.errorMessage.id = '아이디(ID)는 7자 이상이어야 합니다';
      } else if (regExp.test(id) === false) {
        // 아이디(ID)는 이메일형식으로 입력해야합니다
        this.objClass.id = 'error';
        this.errorMessage.id = '아이디(ID)는 이메일형식으로 입력해야합니다';
      } else {
        this.objClass.id = 'active';
        this.errorMessage.id = '';
        idCheckResult = true;
      }
      return idCheckResult;
    },
    passwordCheck () {
      const password = this.userInfo.password;
      const num = /[0-9]/g;
      const eng = /[a-z]/ig;
      const spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
      let passwordCheckResult = false;
      if (password.length === 0) {
        this.objClass.password = 'error';
        this.errorMessage.password = '비밀번호를 입력하세요';
      } else if (password.length < 8 || password.length > 20) {
        // 비밀번호 길이는 8~20자 사이여야 합니다
        this.objClass.password = 'error';
        this.errorMessage.password = '비밀번호 길이는 8~20자 사이입니다';
      } else if (password.search(/\s/) !== -1) {
        // 비밀번호는 공백없이 입력해주세요
        this.objClass.password = 'error';
        this.errorMessage.password = '비밀번호는 공백없이 입력해주세요';
      } else if (password.search(num) < 0 || password.search(eng) < 0 || password.search(spe) < 0) {
        // 비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다
        this.objClass.password = 'error';
        this.errorMessage.password = '비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다';
      } else {
        this.objClass.password = 'active';
        this.errorMessage.password = '';
        passwordCheckResult = true;
      }
      return passwordCheckResult;
    },
    loginUser () {
      // 아이디&비밀번호 유효성 검사
      if (this.idCheck() && this.passwordCheck()) {
        // 요청폼(패스워드 엔터&로그인 버튼) 비활성화
        this.objDisable = true;
        const id = this.userInfo.id;
        const password = this.userInfo.password;
        fetchUserLogin(id, password)
          .then(response => {
            const loginResponse = response.data;
            console.log(loginResponse);
            if (loginResponse.result) {
              localStorage.userInfo = JSON.stringify(loginResponse.member_info);
              // 아이디 기억하기
              const registId = this.checkRegistId;
              if (registId) {
                localStorage.registId = id;
              } else {
                localStorage.removeItem('registId');
              }
              // 관리자 메인으로 이동
              this.$router.push({
                name: 'admin.user'
              });
            } else {
              this.userInfo.password = '';
              this.objClass.password = 'error';
              this.errorMessage.password = '비밀번호를 다시 입력하세요';
              this.$swal({
                title: '로그인 실패!',
                text: '아이디 혹은 비밀번호가 올바르지 않습니다',
                icon: 'error'
              });
              // 요청폼(패스워드 엔터&로그인 버튼) 활성화
              this.objDisable = false;
            }
          })
          .catch(error => {
            this.$swal({
              title: '장애 발생!',
              text: error,
              icon: 'error'
            });
            // 요청폼(패스워드 엔터&로그인 버튼) 활성화
            this.objDisable = false;
          });
      }
    },
    registId () {
      if (localStorage.registId !== '') {
        this.userInfo.id = localStorage.registId;
        this.checkRegistId = true;
        this.objClass.id = 'active';
      }
    }
  }, //   EO    methods:
  beforeMount () {
    this.registId();
  }
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
  transition: .2s;
  color: #4B8ECE;
  border-bottom: 3px solid #4B8ECE;
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
  color: #4B8ECE;
  border-bottom: 3px solid #4B8ECE;
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
