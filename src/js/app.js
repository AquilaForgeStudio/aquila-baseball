// src/main.js (또는 메인 진입점 스크립트)

// 1. 우리가 만든 동적 컴포넌트와 이벤트 함수를 가져옵니다.
import { createNavbar, initNavbarEvents } from '../components/Navbar.js';

// 2. HTML 문서가 완전히 로드된 후 실행합니다.
document.addEventListener("DOMContentLoaded", () => {
    
    // 3. body 태그의 맨 처음에 동적으로 생성된 네비게이션 HTML을 쏙 집어넣습니다!
    document.body.insertAdjacentHTML('afterbegin', createNavbar());

    // 4. 네비게이션이 화면에 만들어진 직후에 햄버거 버튼과 아코디언, 드롭다운 이벤트를 연결합니다.
    initNavbarEvents();
    
});