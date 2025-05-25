import AppConfig from "../config.js";


document.addEventListener("DOMContentLoaded", function () {
    // Xử lý nút Accept
    document.querySelectorAll("button[id^='accept-']").forEach(button => {
        button.addEventListener("click", function () {
            const userId = this.dataset.id;

            console.log("Accepted:", userId);

            fetch(`${AppConfig.ACCEPT}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                })
            })
                .then(response => {
                    if (response.ok) {
                        alert("Accepted, Yes sir!");
                        const userElement = document.getElementById(`usercome-${userId}`);
                        if (userElement) {
                            userElement.remove();
                        }
                    } else {
                        alert("Something went wrong.");
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        });
    });

    // Xử lý nút Reject
    document.querySelectorAll("button[id^='reject-']").forEach(button => {
        button.addEventListener("click", function () {
            const userId = this.dataset.id;

            console.log("Rejected:", userId);
            fetch(`${AppConfig.DELETE}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert("Deleted, Yes sir!");
                        const userElement = document.getElementById(`usercome-${userId}`);
                        if (userElement) {
                            userElement.remove();
                        }
                    } else {
                        alert("Something went wrong.");
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        });
    });

    // edit
    document.querySelectorAll("button[id^='edit-']").forEach(button => {
        button.addEventListener("click", function () {
            const userId = this.dataset.id;

            console.log("edit:", userId);
            // TODO: Gọi API hoặc xử lý logic từ chối ở đây
        });
    });

    // delete
    document.querySelectorAll("button[id^='delete-']").forEach(button => {
        button.addEventListener("click", function () {
            const userId = this.dataset.id;

            console.log("delete:", userId);
            // TODO: Gọi API hoặc xử lý logic từ chối ở đây
            fetch(`${AppConfig.DELETE}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert("Deleted, Yes sir!");
                        const userElement = document.getElementById(`usersend-${userId}`);
                        if (userElement) {
                            userElement.remove();
                        }
                    } else {
                        alert("Something went wrong.");
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        });
    });
});