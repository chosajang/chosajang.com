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

export {
  getUserInfo
};
