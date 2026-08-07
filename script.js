const contactBtn = document.getElementById("contactBtn");
const emailBtn = document.getElementById("emailBtn");
const contactModal = document.getElementById("contactModal");
const emailModal = document.getElementById("emailModal");
const title = document.querySelector("h1");
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function openModal(modal) {
    modal?.classList.add("is-open");
    modal?.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
}

function setTheme(theme) {
    if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
    themeToggle?.setAttribute(
        "aria-label",
        theme === "dark" ? "라이트모드로 전환" : "다크모드로 전환"
    );
}

/* 저장된 테마 또는 시스템 설정으로 초기화 */
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
});

/* 연락처 보기 → 모달 열기 + 이름을 반갑습니다로 바꾸기 */
contactBtn?.addEventListener("click", () => {
    openModal(contactModal);
    if (title) title.textContent = "반갑습니다!";
});

/* 이메일 보기 → 모달 열기 */
emailBtn?.addEventListener("click", () => openModal(emailModal));

/* 닫기 버튼 → 부드럽게 닫기 */
document.querySelectorAll(".modal__close").forEach((btn) => {
    btn.addEventListener("click", () => {
        closeModal(btn.closest(".modal"));
    });
});

/* 어두운 배경 클릭 → 부드럽게 닫기 */
document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

/* ESC 키 → 열린 모달 닫기 */
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    document.querySelectorAll(".modal.is-open").forEach((modal) => {
        closeModal(modal);
    });
});
