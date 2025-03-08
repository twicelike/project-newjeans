document.addEventListener('DOMContentLoaded', function () {
    // Xử lý popup đăng nhập/tạo tài khoản
    const authPopup = document.getElementById('authPopup');
    const loginButton = document.getElementById('loginButton');
    const closeAuthPopup = document.getElementById('closeAuthPopup');
    const container = document.getElementById('container');
    const toggleOverlay = document.getElementById('toggleOverlay');
    const overlayText = document.getElementById('overlayText');
    const overlayDesc = document.getElementById('overlayDesc');
    const overlayButton = document.getElementById('overlayButton');

    if (loginButton && authPopup) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn chặn hành động mặc định của nút
            authPopup.classList.remove('hidden');
        });
    }

    // Đóng popup
    if (closeAuthPopup && authPopup) {
        closeAuthPopup.addEventListener('click', () => {
            authPopup.classList.add('hidden');
        });
    }

    // Đóng popup khi click bên ngoài
    if (authPopup) {
        window.addEventListener('click', (event) => {
            if (event.target === authPopup) {
                authPopup.classList.add('hidden');
            }
        });
    }

    // Chuyển đổi giữa đăng nhập và đăng ký
    if (toggleOverlay && container) {
        toggleOverlay.addEventListener('click', () => {
            container.classList.toggle('active');

            if (overlayText && overlayDesc && overlayButton) {
                if (container.classList.contains('active')) {
                    overlayText.textContent = 'Welcome Back!';
                    overlayDesc.textContent = 'Already have an account?';
                    overlayButton.textContent = 'Login';
                } else {
                    overlayText.textContent = 'Hello, Friend!';
                    overlayDesc.textContent = 'Don\'t have an account?';
                    overlayButton.textContent = 'Register';
                }
            }
        });
    }

    // Xử lý dropdown
    function handleDropdown(buttonId, menuId) {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);

        if (button && menu) {
            button.addEventListener('mouseenter', () => {
                menu.classList.remove('hidden');
            });

            button.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
            });
        }
    }

    handleDropdown('productBtn', 'productMenu');
    handleDropdown('safetyBtn', 'safetyMenu');
    handleDropdown('languageBtn', 'languageMenu');

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

    // Xử lý gửi mã xác nhận và form đăng ký
    const sendCodeButton = document.getElementById('sendCodeButton');
    const registerForm = document.querySelector('.form-box.register form');

    if (sendCodeButton) {
        sendCodeButton.addEventListener('click', () => {
            const emailInput = document.querySelector('.form-box.register input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                alert('Vui lòng nhập email.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Email không hợp lệ. Vui lòng nhập lại.');
                return;
            }

            // Gửi yêu cầu gửi mã xác nhận
            sendVerificationCode(email);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Ngăn form submit mặc định

            // Lấy giá trị từ các trường input
            const username = document.querySelector('.form-box.register input[type="text"][placeholder="Tên đăng nhập"]').value.trim();
            const email = document.querySelector('.form-box.register input[type="email"]').value.trim();
            const verificationCode = document.querySelector('.form-box.register input[placeholder="Mã xác nhận"]').value.trim();
            const password = document.querySelector('.form-box.register input[type="password"][placeholder="Mật khẩu"]').value.trim();
            const confirmPassword = document.querySelector('.form-box.register input[type="password"][placeholder="Nhập lại mật khẩu"]').value.trim();

            // Kiểm tra tính hợp lệ
            if (!username || !email || !verificationCode || !password || !confirmPassword) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Email không hợp lệ. Vui lòng nhập lại.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Mật khẩu không khớp. Vui lòng nhập lại.');
                return;
            }

            // Gửi dữ liệu đăng ký (giả lập)
            registerUser(username, email, verificationCode, password);
        });
    }

    // Hàm kiểm tra email hợp lệ
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hàm gửi mã xác nhận (giả lập)
    function sendVerificationCode(email) {
        console.log(`Gửi mã xác nhận đến email: ${email}`);
        alert(`Mã xác nhận đã được gửi đến ${email}. Vui lòng kiểm tra email.`);
    }

    // Hàm đăng ký người dùng (giả lập)
    function registerUser(username, email, verificationCode, password) {
        console.log('Đăng ký người dùng:', { username, email, verificationCode, password });
        alert('Đăng ký thành công!');
    }
});