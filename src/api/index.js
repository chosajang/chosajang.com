import axios from 'axios';
import { getUserInfo } from '../utils/common.js';

// HTTP Request & Response 관련 기본 설정
const config = {
  baseUrl: 'http://api.chosajang.com'
};

// API 함수 정리
function fetchUserLogin (id, password) {
  const params = new URLSearchParams();
  params.append('id', id);
  params.append('password', password);
  return axios.post(`${config.baseUrl}/user/login`, params);
}

function fetchUserList () {
  const userInfo = getUserInfo();
  const params = new URLSearchParams();
  params.append('member_seq', userInfo.SEQ);
  params.append('session_id', userInfo.SESSION_ID);
  return axios.get(`${config.baseUrl}/admin/user/list`, params);
}

function userModify (formData) {
  const userInfo = getUserInfo();
  const headerInfo = {
    headers: {
      'Content-Type': 'multipart/fomr-data'
    }
  };
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/user/modify`, formData, headerInfo);
}

function userCreate (formData) {
  const userInfo = getUserInfo();
  const headerInfo = {
    headers: {
      'Content-Type': 'multipart/fomr-data'
    }
  };
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/user/create`, formData, headerInfo);
}

export {
  fetchUserLogin,
  fetchUserList,
  userModify,
  userCreate
};
