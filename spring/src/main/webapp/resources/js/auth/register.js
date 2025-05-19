import AppConfig from "../config.js";

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("sendOtpBtn").addEventListener("click", function () {
        const emailInput = document.getElementById("email");
        const messageBox = document.getElementById("messageBox");
        const email = emailInput.value;

        if (!email) {
            messageBox.textContent = "Please enter your email first.";
            messageBox.className = "text-red-500";
            return;
        }

        console.log(email)

        fetch(`${AppConfig.SEND_OTP_URL}/${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email})
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                messageBox.textContent = "Error sending OTP";
                messageBox.className = "text-red-500";
            });
    });
})
