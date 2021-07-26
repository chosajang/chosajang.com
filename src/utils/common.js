
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

function btnSpinner (btnObj, status, message, style) {
  btnObj.value = message
  btnObj.disabled = status
  btnObj.style = style
}

export {
  getUserInfo,
  btnSpinner
};
