import axios from 'axios';

// HTTP Request & Response 관련 기본 설정
const config = {
  baseUrl: 'http://api.chosajang.com/'
};

// API 함수 정리
function fetchUserLogin (id, password) {
  const params = new URLSearchParams();
  params.append('id', id);
  params.append('password', password);
  return axios.post(`${config.baseUrl}/user/login`, params);
}

export {
  fetchUserLogin
};
