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

        alert('Sent OTP to your Email')

        fetch(`${AppConfig.SEND_OTP_URL}/${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email})
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.text();
            })
            .then(message => {
                console.log("OTP Message:", message);
                if (message.includes("!")) {
                    messageBox.textContent = message;
                    messageBox.className = "text-red-500";
                } else {
                    messageBox.textContent = message;
                    messageBox.className = "text-green-500";
                }
            })
            .catch(error => {
                messageBox.textContent = "Error sending OTP";
                messageBox.className = "text-red-500";
            });
    });
})
