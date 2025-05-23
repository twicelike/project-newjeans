import AppConfig from "../config.js";

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("addFriend");

    btn.addEventListener("click", function () {
        const currentId = btn.getAttribute("data-current-id");
        const targetId = btn.getAttribute("data-user-id");

        console.log(targetId + " " + currentId);

        fetch(`${AppConfig.ADD_FRIEND}/${targetId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fromUserId: currentId,
                toUserId: targetId
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Friend request sent!");
                } else {
                    alert("Something went wrong.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
    });
})