const profileButton = document.querySelector(".profile-button");
const loginPanel = document.querySelector(".login-panel");
const authTabs = document.querySelectorAll(".auth-tab");
const authForms = document.querySelectorAll(".auth-form");
const mangaSearch = document.querySelector("#manga-search");
const mangaCards = document.querySelectorAll(".manga-card");

function closeLoginPanel() {
    loginPanel.hidden = true;
    profileButton.setAttribute("aria-expanded", "false");
}

function openLoginPanel() {
    loginPanel.hidden = false;
    profileButton.setAttribute("aria-expanded", "true");
    loginPanel.querySelector(".auth-form.active input").focus();
}

function showAuthForm(formName) {
    authTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.authTab === formName);
    });

    authForms.forEach((form) => {
        form.classList.toggle("active", form.dataset.authForm === formName);
    });

    loginPanel.querySelector(".auth-form.active input").focus();
}

profileButton.addEventListener("click", () => {
    if (loginPanel.hidden) {
        openLoginPanel();
    } else {
        closeLoginPanel();
    }
});

document.addEventListener("click", (event) => {
    const clickedInsideMenu = event.target.closest(".profile-menu");

    if (!clickedInsideMenu && !loginPanel.hidden) {
        closeLoginPanel();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !loginPanel.hidden) {
        closeLoginPanel();
        profileButton.focus();
    }
});

authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        showAuthForm(tab.dataset.authTab);
    });
});

authForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});

mangaSearch.addEventListener("input", () => {
    const searchText = mangaSearch.value.trim().toLowerCase();

    mangaCards.forEach((card) => {
        const title = card.dataset.title.toLowerCase();
        card.hidden = !title.includes(searchText);
    });
});
