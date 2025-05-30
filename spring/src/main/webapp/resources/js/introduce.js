document.addEventListener('DOMContentLoaded', function () {
    // Xử lý dropdown
    function handleDropdown(buttonId, menuId) {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);

        if (button && menu) {
            button.addEventListener('mouseover', () => {
                menu.classList.remove('hidden');
            });


            button.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
            });

            menu.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
            });
        }
    }

    handleDropdown('productBtn', 'productMenu');
    handleDropdown('safetyBtn', 'safetyMenu');

    // Xử lý chọn ngôn ngữ
    const languageMenu = document.getElementById('languageMenu');
    const mainTitle = document.getElementById('mainTitle');

    if (languageMenu && mainTitle) {
        languageMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const lang = event.target.getAttribute('data-lang');
                changeLanguage(lang);
                languageMenu.classList.add('hidden');
            }
        });
    }

    function changeLanguage(lang) {
        if (mainTitle) {
            if (lang === 'en') {
                mainTitle.textContent = 'Swipe Right®';
            } else if (lang === 'vi') {
                mainTitle.textContent = 'Vuốt Phải®';
            } else if (lang === 'es') {
                mainTitle.textContent = 'Desliza a la Derecha®';
            }
        }
    }

    // Xử lý nút "Personalize my choices"
    const personalizeButton = document.getElementById('personalizeButton');
    if (personalizeButton) {
        personalizeButton.addEventListener('click', () => {
            window.location.href = 'https://example.com/personalize';
        });
    }

    // Xử lý nút "I accept"
    const acceptButton = document.getElementById('acceptButton');
    const declineButton = document.getElementById('declineButton');
    const privacySection = document.getElementById('privacySection');

    if (acceptButton && privacySection) {
        acceptButton.addEventListener('click', () => {
            privacySection.classList.add('hidden');
            window.location.href = 'https://example.com';
        });
    }

    if (declineButton && privacySection) {
        declineButton.addEventListener('click', () => {
            privacySection.classList.add('hidden');
        });
    }
});