/**
 * 공통 함수 정의
 */
function testFunc (message) {
  console.log('testFunc', message);
}

function isSession () {
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo !== null) {
    userInfo = JSON.parse(userInfo);
    // TODO : 세션키+유효시간 체크
    console.log(userInfo);
    return userInfo;
  } else {
    return false;
  }
}

export {
  testFunc,
  isSession
};
