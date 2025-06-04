import AppConfig from "../config.js";

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('matchPopup');
    const popupBg = document.getElementById('popupBg');
    const nameSpan = popup.querySelector('.popup-profile span');
    const avatarImg = popup.querySelector('.popup-profile img');
    const newJeansBtn = document.getElementById('matchBtn');
    let selectedUserId = null; // <<== lưu ID user hiện tại
    const messageBox = document.getElementById('messageBox');

    // Hiển thị popup
    function showPopup(name, avatar, id) {
        popupBg.classList.remove('hidden')
        popup.classList.remove('hidden');
        nameSpan.textContent = name;
        avatarImg.src = `/images/userImages/${avatar}`;
        avatarImg.alt = name;
        selectedUserId = id;
        messageBox.textContent = ''
        popup.classList.replace('opacity-0', 'opacity-100');
        popup.classList.add('z-[200]');
        popupBg.classList.replace('opacity-0', 'opacity-50');
        popupBg.classList.add('z-[150]');
    }

    // Ẩn popup
    function hidePopup() {
        popupBg.classList.add('hidden')
        popup.classList.add('hidden');
        popup.classList.replace('opacity-100', 'opacity-0');
        popup.classList.remove('z-[200]');
        popupBg.classList.replace('opacity-50', 'opacity-0');
        popupBg.classList.remove('z-[150]');
    }

    document.querySelectorAll('.close-icon, #popupBg').forEach(el => {
        el.addEventListener('click', hidePopup);
    });

    const btn = document.getElementById('addFriend');

    btn.addEventListener('click', function () {
        const targetId = btn.getAttribute("data-user-id");
        const avatar = btn.getAttribute("data-user-avatar");
        const name = btn.getAttribute("data-user-name");
        if (document.getElementById('addornot').textContent.trim().includes("REMOVE")) {
            fetch(`${AppConfig.UNFRIEND}/${targetId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        document.getElementById('addornot').textContent = 'ADD NJZ';
                        alert("Friend request removed!");
                    } else {
                        alert("Something went wrong.");
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        } else {
            showPopup(name, avatar, targetId)
        }

    });

    newJeansBtn.addEventListener('click', () => {
        if (!selectedUserId) return;

        fetch(`${AppConfig.ADD_FRIEND}/${selectedUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageBox.value)
        })
            .then(response => {
                if (response.ok) {
                    document.getElementById('addornot').textContent = 'REMOVE NJZ';
                    alert("Friend request sent!");
                } else {
                    alert("Something went wrong.");
                }
                hidePopup()
            })
            .catch(err => {
                console.error("Error:", err);
            });
    })

})