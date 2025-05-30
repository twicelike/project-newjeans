import AppConfig from "../config.js";

//Swiper slider image
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const users = [
    {name: 'User 1'},
    {name: 'User 2'},
    {name: 'User 3'},
    {name: 'User 4'},
    {name: 'User 5'},
    {name: 'User 6'},
];

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('matchPopup');
    const popupBg = document.getElementById('popupBg');
    const nameSpan = popup.querySelector('.popup-profile span');
    const avatarImg = popup.querySelector('.popup-profile img');
    const newJeansBtn = document.getElementById('matchBtn');
    let selectedUserId = null; // <<== lưu ID user hiện tại

    // Hiển thị popup
    function showPopup(name, avatar, id) {
        nameSpan.textContent = name;
        avatarImg.src = avatar;
        avatarImg.alt = name;
        selectedUserId = id; // lưu ID người được match

        popup.classList.replace('opacity-0', 'opacity-100');
        popup.classList.add('z-[200]');
        popupBg.classList.replace('opacity-0', 'opacity-50');
        popupBg.classList.add('z-[150]');
    }

    // Ẩn popup
    function hidePopup() {
        popup.classList.replace('opacity-100', 'opacity-0');
        popup.classList.remove('z-[200]');
        popupBg.classList.replace('opacity-50', 'opacity-0');
        popupBg.classList.remove('z-[150]');
    }

    // Gắn sự kiện cho nút match
    document.querySelectorAll('.inner-match').forEach(matchBtn => {
        matchBtn.addEventListener('click', () => {
            const userId = matchBtn.dataset.id;
            const userName = matchBtn.dataset.name;
            const userAvatar = matchBtn.dataset.avatar;
            if (matchBtn.classList.contains('grayscale-0')) {
                matchBtn.classList.remove('grayscale-0');
                matchBtn.classList.add('grayscale');

                fetch(`${AppConfig.UNFRIEND}/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        toUserId: userId
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            alert("Revoke Njz send!");
                        } else {
                            alert("Something went wrong.");
                        }
                    })
                    .catch(err => {
                        console.error("Error:", err);
                    });

                return;
            }
            showPopup(userName, userAvatar, userId);
        });
    });

    // Gắn sự kiện đóng popup
    document.querySelectorAll('.close-icon, #popupBg').forEach(el => {
        el.addEventListener('click', hidePopup);
    });

    // Xử lý khi bấm nút NewJeans
    newJeansBtn.addEventListener('click', () => {
        if (!selectedUserId) return;

        const targetMatch = document.querySelector(`#match-${selectedUserId}`);

        targetMatch.classList.add('grayscale-0');
        targetMatch.classList.remove('grayscale');
        const content = document.getElementById('messageBox')

        fetch(`${AppConfig.ADD_FRIEND}/${selectedUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content.value)
        })
            .then(response => {
                if (response.ok) {
                    alert("Friend request sent!");
                    hidePopup();
                } else {
                    alert("Something went wrong.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
    });


    //Logout
    const profileToggle = document.querySelector('.inner-profile');
    const logoutBox = document.querySelector('.log-out-box');

    profileToggle.addEventListener('click', e => {
        e.stopPropagation();
        logoutBox.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        if (!logoutBox.classList.contains('hidden')) {
            logoutBox.classList.add('hidden');
        }
    });

    logoutBox.addEventListener('click', e => {
        e.stopPropagation();
    });
});

