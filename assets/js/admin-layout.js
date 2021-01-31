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
    if( cObj.getAttribute('extension') == 'Y' ){
      let ulObj = cObj.getElementsByTagName('ul')[0];
      ulObj.style.display == '' ? ulObj.style.display = 'none' : ulObj.style.display = '';
    }
  }, false);

  // 이벤트 실행(준비)
  // menuObj.dispatchEvent(customEvent);

  // 모바일 메뉴 이벤트
  let asideObj = document.getElementById('aside-menu');
  let btnMobileMenuObj = document.getElementById('mobile-menu-btn');

  btnMobileMenuObj.addEventListener('click',(thisObj) => {
    asideObj.classList.toggle('hidden');
  });

  document.addEventListener('mouseup', (thisObj) => {
    console.log('mouse up', thisObj);
    // aside-menu 위인지 판단

  });
});