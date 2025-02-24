document.addEventListener('DOMContentLoaded', function () {
    // Xử lý popup đăng nhập/tạo tài khoản
    const authPopup = document.getElementById('authPopup');
    const loginButton = document.getElementById('loginButton');
    const closeAuthPopup = document.getElementById('closeAuthPopup');
    const popupTitle = document.getElementById('popupTitle');

    loginButton.addEventListener('click', () => {
        popupTitle.textContent = 'Log In';
        authPopup.classList.remove('hidden');
    });

    closeAuthPopup.addEventListener('click', () => {
        authPopup.classList.add('hidden');
    });

    // Đóng popup khi bấm ra ngoài
    window.addEventListener('click', (event) => {
        if (event.target === authPopup) {
            authPopup.classList.add('hidden');
        }
    });

    // Xử lý dropdown cho Products và Safety
    const productBtn = document.getElementById('productBtn');
    const productMenu = document.getElementById('productMenu');
    const safetyBtn = document.getElementById('safetyBtn');
    const safetyMenu = document.getElementById('safetyMenu');

    // Hiển thị dropdown khi hover vào Products
    productBtn.addEventListener('mouseenter', () => {
        productMenu.classList.remove('hidden');
    });

    // Ẩn dropdown khi rời chuột khỏi Products
    productBtn.addEventListener('mouseleave', () => {
        productMenu.classList.add('hidden');
    });

    // Hiển thị dropdown khi hover vào Safety
    safetyBtn.addEventListener('mouseenter', () => {
        safetyMenu.classList.remove('hidden');
    });

    // Ẩn dropdown khi rời chuột khỏi Safety
    safetyBtn.addEventListener('mouseleave', () => {
        safetyMenu.classList.add('hidden');
    });

    // Xử lý dropdown cho Language
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    const mainTitle = document.getElementById('mainTitle');

    // Hiển thị dropdown khi hover vào Language
    languageBtn.addEventListener('mouseenter', () => {
        languageMenu.classList.remove('hidden');
    });

    // Ẩn dropdown khi rời chuột khỏi Language
    languageBtn.addEventListener('mouseleave', () => {
        languageMenu.classList.add('hidden');
    });

    // Xử lý chọn ngôn ngữ
    languageMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const lang = event.target.getAttribute('data-lang');
            changeLanguage(lang);
            languageMenu.classList.add('hidden');
        }
    });

    // Hàm thay đổi ngôn ngữ
    function changeLanguage(lang) {
        if (lang === 'en') {
            mainTitle.textContent = 'Swipe Right®';
        } else if (lang === 'vi') {
            mainTitle.textContent = 'Vuốt Phải®';
        } else if (lang === 'es') {
            mainTitle.textContent = 'Desliza a la Derecha®';
        }
    }

    // Xử lý nút "Personalize my choices"
    const personalizeButton = document.getElementById('personalizeButton');
    personalizeButton.addEventListener('click', () => {
        // Chuyển hướng đến trang khác
        window.location.href = 'https://example.com/personalize';
    });

    // Xử lý nút "I accept"
    const acceptButton = document.getElementById('acceptButton');
    acceptButton.addEventListener('click', () => {
        // Ẩn thông báo
        const privacySection = document.getElementById('privacySection');
        privacySection.classList.add('hidden');

        // Chuyển hướng đến trang khác
        window.location.href = 'https://example.com';
    });

    // Xử lý nút "I decline"
    const declineButton = document.getElementById('declineButton');
    declineButton.addEventListener('click', () => {
        // Ẩn thông báo
        const privacySection = document.getElementById('privacySection');
        privacySection.classList.add('hidden');
    });

    // Xử lý chuyển đổi giữa đăng ký và đăng nhập
    const toggleOverlay = document.getElementById('toggleOverlay');
    const container = document.getElementById('container');
    const overlayText = document.getElementById('overlayText');
    const overlayDesc = document.getElementById('overlayDesc');
    const overlayButton = document.getElementById('overlayButton');

    toggleOverlay.addEventListener('click', () => {
        container.classList.toggle('active');
        if (container.classList.contains('active')) {
            overlayText.textContent = 'Chào Mừng!';
            overlayDesc.textContent = 'Bạn đã có tài khoản?';
            overlayButton.textContent = 'Đăng Nhập';
        } else {
            overlayText.textContent = 'Xin Chào!';
            overlayDesc.textContent = 'Bạn chưa có tài khoản?';
            overlayButton.textContent = 'Đăng Ký';
        }
    });
});