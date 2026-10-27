// src/components/navData.js
const getBasePath = ()=>{
    const pathname = window.location.pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return './'
    }
    return pathSegments.length > 0 && !pathname.endsWith(".html")
        ? `/${pathSegments[0]}/`
        : './';
};

const BASE = getBasePath();

export const navData = {
    brand : {
        name: "Aquila Baseball",
        logo : `${BASE}assets/BI/Aquila-Logo.png`,
        link: `${BASE}index.html`,
        items : [
            {name : "설치", link: `${BASE}install.html`},
            {name: "about us", link: `${BASE}about.html`},
            {type: "divider"},
            {name : "AquilaForgeStudio", link: "https://aquilaforgestudio.github.io", studio: true}
        ]
    },
    dropdowns: [
        {
            title: "COMMUNITY",
            align: "align-right",
            items: [
                { name: "공지사항", link: `${BASE}community/notice/index.html` },
                { name: "자유게시판", link: `${BASE}community/free/index.html` },
                { name: "1:1 CHAT", link: `${BASE}community/chat/index.html`, highlight: true }
            ]
        },
        {
            title: "DEVLOG",
            align: "align-right",
            items: [
                { name: "Update Log", link: `${BASE}devlog/update/index.html` },
                { name: "버그 신고", link: `${BASE}devlog/bug-report/index.html` }
            ]
        }
    ],
    sidebarLinks: [
        { name: "설치", link: `${BASE}download/index.html` },
        { name: "About us", link: `${BASE}about/index.html` },
        { name: "Velora Studio", link: `${BASE}velora/index.html`, accent: true }
    ],
    actions: {
        notification: {
            id: "noti-trigger",
            ariaLabel: "알림 열기",
            badgeCount: 3
        },
        auth: {
            id: "auth-trigger-btn",
            ariaLabel: "계정 메뉴",
            link: `${BASE}account/index.html`,
            loginLink: `${BASE}login/index.html` // 👈 로그인 페이지 경로 추가
        }
    }
};