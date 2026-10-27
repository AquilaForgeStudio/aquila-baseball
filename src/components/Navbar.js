import { navData } from './navData.js';

/**
 * Creates a navigation bar based on the provided navData.
 * This function generates the HTML structure for the navigation bar, including brand information,
 * dropdown menus, sidebar links, and action buttons.
 * @returns {HTMLElement} The constructed navigation bar element.
 * @version 1.0.0
 */
export function createNavbar() {
    // 💡 로그인 상태 확인 (예시: localStorage에 저장된 상태값 활용)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 1. 로고 및 드롭다운 아이템 생성
    const brandDropdownItemsHTML = navData.brand.items.map(item => {
        if (item.type === "divider") return `<hr class="divider">`;
        return `<li><a href="${item.link}" class="${item.studio ? 'studio-link' : ''}">${item.name}</a></li>`;
    }).join('');

    const desktopDropdownsHTML = navData.dropdowns.map(menu => `
        <div class="dropdown">
            <button class="nav-txt-btn">${menu.title}</button>
            <ul class="dropdown-menu ${menu.align || ''}">
                ${menu.items.map(item => `<li><a href="${item.link}" class="${item.highlight ? 'support-link' : ''}">${item.name}</a></li>`).join('')}
            </ul>
        </div>
    `).join('');

    const mobileSectionsHTML = navData.dropdowns.map((menu, index) => `
        <div class="nav-section">
            <button class="s-link accordion-trigger" id="m-trigger-${index}">
                ${menu.title}
                <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <div class="accordion-content" id="m-content-${index}">
                ${menu.items.map(item => `<a href="${item.link}" class="s-link sub ${item.highlight ? 'support-highlight' : ''}">${item.name}</a>`).join('')}
            </div>
        </div>
    `).join('');

    const notiIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;
    
    // 로그아웃 상태면 로그인 아이콘(Login), 로그인 상태면 계정 아이콘(User)
    const authIconSvg = isLoggedIn 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>`;

    const authText = isLoggedIn ? "계정 관리" : "로그인";
    const authLink = isLoggedIn ? navData.actions.auth.link : navData.actions.auth.loginLink;

    return `
        <header class="navbar" id="global-nav">
            <div class="nav-container">
                <!-- 좌측: 로고 + 로고 호버 드롭다운 -->
                <div class="nav-left">
                    <div class="dropdown brand-dropdown">
                        <a href="${navData.brand.link}" class="brand-link">
                            <img src="${navData.brand.logo}" alt="${navData.brand.name}" class="nav-logo">
                        </a>
                        <ul class="dropdown-menu">
                            ${brandDropdownItemsHTML}
                        </ul>
                    </div>
                </div>

                <!-- 우측: 데스크톱 메뉴 & 액션 버튼들 -->
                <div class="nav-right">
                    <nav class="desktop-only-group desktop-only">
                        ${desktopDropdownsHTML}
                        <a href="${navData.brand.link}" class="cta-install-btn">웹버전 사용하기</a>

                        <!-- 알림 버튼 -->
                        <div class="noti-wrapper" style="position: relative; display: inline-flex; align-items: center;">
                            <button class="noti-trigger-btn" id="${navData.actions.notification.id}-dt" aria-label="${navData.actions.notification.ariaLabel}" style="background: transparent; border: none; cursor: pointer; padding: 6px; color: #4b5563;">
                                ${notiIconSvg}
                                <span class="noti-badge" style="position: absolute; top: 0; right: 0; background: #f97316; color: #fff; font-size: 10px; padding: 2px 5px; border-radius: 10px;">${navData.actions.notification.badgeCount}</span>
                            </button>
                        </div>

                        <!-- 계정/로그인 버튼 -->
                        <a href="${authLink}" class="icon-auth-btn" aria-label="${authText}" style="background: none; border: none; color: #4b5563; padding: 6px; display: flex; align-items: center; text-decoration: none;" title="${authText}">
                            ${authIconSvg}
                        </a>
                    </nav>

                    <!-- 모바일 햄버거 버튼 -->
                    <button class="hamburger-btn" id="menu-toggle" aria-label="메뉴 열기">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- 모바일 사이드바 (드로어) -->
        <aside class="sidebar" id="mobile-sidebar">
            <div class="sidebar-inner">
                <div class="sidebar-top">
                    <img src="${navData.brand.logo}" alt="${navData.brand.name}" class="nav-logo-sm">
                    <button class="close-btn" id="menu-close" aria-label="메뉴 닫기">✕</button>
                </div>

                <!-- 모바일 사이드바 상단에 추가된 로그인/계정 및 알림 액션 바 -->
                <div class="mobile-actions-bar" style="display: flex; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                    <a href="${authLink}" class="s-link" style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; padding: 8px 12px; background: #f3f4f6; border-radius: 8px; flex: 1; justify-content: center; text-decoration: none; color: #1f2937;">
                        ${authIconSvg} ${authText}
                    </a>
                    <button id="${navData.actions.notification.id}-mb" class="s-link" style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; padding: 8px 12px; background: #f3f4f6; border-radius: 8px; border: none; color: #1f2937; cursor: pointer; flex: 1; justify-content: center;">
                        ${notiIconSvg} 알림
                    </button>
                </div>

                <nav class="sidebar-links">
                    ${navData.sidebarLinks.map(s => `<a href="${s.link}" class="s-link ${s.accent ? 'studio-accent' : ''}">${s.name}</a>`).join('')}
                    ${mobileSectionsHTML}
                </nav>
            </div>
        </aside>
        <div class="overlay" id="menu-overlay"></div>
    `;
}

export function initNavbarEvents() {
    const toggleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("menu-close");
    const sidebar = document.getElementById("mobile-sidebar");
    const overlay = document.getElementById("menu-overlay");

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });
    }

    function closeSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        }
    }

    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    // 모바일 아코디언 메뉴 토글
    const triggers = document.querySelectorAll(".accordion-trigger");
    triggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content) {
                content.classList.toggle("active");
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    });
}