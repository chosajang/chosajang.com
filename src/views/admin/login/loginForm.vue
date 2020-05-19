<template>
  <div class="login-wrap">
    <div class="logo">
      <div class="logo-image"></div>
      <div class="logo-text">CHOSAJANG</div>
    </div>
    <div class="loginForm">
      <div class="form-wrap">
        <div class="title">ID(Email)</div>
        <div class="form"><input type="text" name="id" placeholder="ID(Email)을 입력하세요"/></div>
      </div>
      <div class="form-wrap">
        <div class="title">Password</div>
        <div class="form"><input type="password" name="password" placeholder="비밀번호를 입력하세요"/></div>
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
export default {
  methods: {
    async login () {
      try {
        console.log('login');
      } catch (error) {
        console.log(error);
      }
    },
    loginUser () {
      console.log('loginUser');
    }
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

.form-wrap input[type=text], input[type=password] {
  width: 100%;
  padding: 8px 14px;
  margin: 4px 0;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #2D353C;
}

.form-wrap input::placeholder {
  color: #B6B6B6;
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
}
</style>
