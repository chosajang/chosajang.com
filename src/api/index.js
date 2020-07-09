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
  return axios.get(`${config.baseUrl}/admin/user/list`, {
    params: {
      member_seq: userInfo.SEQ,
      session_id: userInfo.SESSION_ID
    }
  });
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

function boardList () {
  const userInfo = getUserInfo();
  return axios.get(`${config.baseUrl}/admin/board/list`, {
    params: {
      member_seq: userInfo.SEQ,
      session_id: userInfo.SESSION_ID
    }
  });
}

function boardCreate (formData) {
  const userInfo = getUserInfo();
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/board/create`, formData);
}

function boardUpdate (formData) {
  const userInfo = getUserInfo();
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/board/update`, formData);
}

function postList () {
  const userInfo = getUserInfo();
  return axios.get(`${config.baseUrl}/admin/article/list`, {
    params: {
      member_seq: userInfo.SEQ,
      session_id: userInfo.SESSION_ID
    }
  });
}

function postRead (postSeq) {
  const userInfo = getUserInfo();
  return axios.get(`${config.baseUrl}/admin/article/read`, {
    params: {
      member_seq: userInfo.SEQ,
      session_id: userInfo.SESSION_ID,
      article_seq: postSeq
    }
  });
}

function postWrite (formData) {
  const userInfo = getUserInfo();
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/article/write`, formData);
}

function postUpdate (formData) {
  const userInfo = getUserInfo();
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/article/modify`, formData);
}

function postContentFileUpload (formData) {
  const userInfo = getUserInfo();
  const headerInfo = {
    headers: {
      'Content-Type': 'multipart/fomr-data'
    }
  };
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/article/file_upload`, formData, headerInfo);
}

function postDelete (formData) {
  const userInfo = getUserInfo();
  formData.append('member_seq', userInfo.SEQ);
  formData.append('session_id', userInfo.SESSION_ID);
  return axios.post(`${config.baseUrl}/admin/article/delete`, formData);
}

export {
  fetchUserLogin,
  fetchUserList,
  userModify,
  userCreate,
  boardList,
  boardCreate,
  boardUpdate,
  postList,
  postRead,
  postWrite,
  postUpdate,
  postContentFileUpload,
  postDelete
};
