/**
 * 공통 함수 정의
 */
function getUserInfo () {
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo !== null) {
    userInfo = JSON.parse(userInfo);
    // TODO : 세션키+유효시간 체크
    return userInfo;
  } else {
    return false;
  }
}

function validationCheck (type, value, thisObj, allowEmpty) {
  allowEmpty = allowEmpty === undefined ? false : allowEmpty;
  let result = false;
  if (type === 'EMAIL') {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (allowEmpty === true) {
      if (value.length === 0) {
        thisObj.inputClass.id = '';
        thisObj.errorMessage.id = '';
        result = true;
      } else {
        if (value.length === 0) {
          thisObj.inputClass.id = '';
          thisObj.errorMessage.id = '아이디(ID)를 입력하세요';
        }
      }
    }
    if (result === false) {
      if (value.length < 7) {
        thisObj.inputClass.id = 'error';
        thisObj.errorMessage.id = '아이디(ID)는 7자 이상이어야 합니다';
      } else if (regExp.test(value) === false) {
        thisObj.inputClass.id = 'error';
        thisObj.errorMessage.id = '아이디(ID)는 이메일형식으로 입력해야합니다';
      } else {
        thisObj.inputClass.id = 'active';
        thisObj.errorMessage.id = '';
        result = true;
      }
    }
  } else if (type === 'PASSWORD') {
    const num = /[0-9]/g;
    const eng = /[a-z]/ig;
    const spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
    if (allowEmpty === true) {
      if (value.length === 0) {
        thisObj.inputClass.password = '';
        thisObj.errorMessage.password = '';
        result = true;
      }
    } else {
      if (value.length === 0) {
        thisObj.inputClass.password = 'error';
        thisObj.errorMessage.password = '비밀번호를 입력하세요';
      }
    }
    if (result === false) {
      if (value.length < 8 || value.length > 20) {
        // 비밀번호 길이는 8~20자 사이여야 합니다
        thisObj.inputClass.password = 'error';
        thisObj.errorMessage.password = '비밀번호 길이는 8~20자 사이입니다';
      } else if (value.search(/\s/) !== -1) {
        // 비밀번호는 공백없이 입력해주세요
        thisObj.inputClass.password = 'error';
        thisObj.errorMessage.password = '비밀번호는 공백없이 입력해주세요';
      } else if (value.search(num) < 0 || value.search(eng) < 0 || value.search(spe) < 0) {
        // 비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다
        thisObj.inputClass.password = 'error';
        thisObj.errorMessage.password = '비밀번호는 영문자, 숫자, 특수문자 조합으로 입력해야합니다';
      } else {
        thisObj.inputClass.password = 'active';
        thisObj.errorMessage.password = '';
        result = true;
      }
    }
  } else if (type === 'TEXT') {
    if (allowEmpty === true) {
      if (value.length === 0) {
        thisObj.inputClass.name = '';
        thisObj.errorMessage.name = '';
        result = true;
      }
    } else {
      if (value.length === 0) {
        thisObj.inputClass.name = 'error';
        thisObj.errorMessage.name = '값이 입력되지 않았습니다';
      } else {
        thisObj.inputClass.name = 'active';
        thisObj.errorMessage.name = '';
        result = true;
      }
    }
  }
  return result;
}

export {
  getUserInfo,
  validationCheck
};
