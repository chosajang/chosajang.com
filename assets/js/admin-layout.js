/**
 * DOMContentLoaded
 * 문서(html,php...) 모든 자원이 로드 되었을때 발생(예:onload)하는 것이 아닌,
 * DOM 트리만 완성되면 바로 실행하는 이벤트
 */
document.addEventListener("DOMContentLoaded", function(){
  // 이벤트 객체 생성
  // let customEvent = document.createEvent('Event');
  // customEvent.initEvent('click', true, false);
  
  // 메뉴 펼침/닫힘 이벤트
  let menuObj = document.getElementById('menu-ext');
  menuObj.addEventListener('click',(thisObj) => {
    // 클릭한 요소의 dom 요소 접근
    const cObj = thisObj.path[0];
    const iObj = cObj.children[0];
    console.log(iObj);
    const extMenuObj = document.getElementById(cObj.getAttribute('for'));
    console.log(extMenuObj);
    if(extMenuObj != null ){
      extMenuObj.classList.toggle('hidden');
      iObj.classList.toggle('fa-rotate-180');
    }
  }, false);

  // 이벤트 실행(준비)
  // menuObj.dispatchEvent(customEvent);

  // 모바일 메뉴 이벤트
  const asideObj = document.getElementById('aside-menu');
  const btnMobileMenuObj = document.getElementById('mobile-menu-btn');

  btnMobileMenuObj.addEventListener('click',(thisObj) => {
    asideObj.classList.toggle('hidden');
  });

  // 헤더 : 개인 메뉴
  const personalInfoObj = document.getElementById('personal-info');
  const personalMenuObj = document.getElementById('personal-menu');
  personalInfoObj.addEventListener('click',(thisObj) => {
    personalMenuObj.classList.toggle('hidden');
  });
});