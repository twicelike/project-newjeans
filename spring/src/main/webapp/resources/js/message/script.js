'use strict';
let stompClient = null;
import AppConfig from "../config.js";

document.addEventListener('DOMContentLoaded', () => {

        const mainChat = document.getElementById('mainChat');
        const header = mainChat.querySelector('.chat-header');
        const chatContainer = mainChat.querySelector('.chat-container');
        const input = mainChat.querySelector('.input-message');
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('contact-name');
        const phaseIcon = document.getElementById('phase-icon');
        const userProfile = document.getElementById('user-profile');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const sendSurvey = document.getElementById('createSurvey')
        const levelUpBtn = document.getElementById("phase-icon")

        let receiverId

        function connect() {
            const socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, onConnected, onError);
        }

        function onConnected() {
            stompClient.subscribe(`/topic/chat.privateMessage/${id}`, onMessageReceived);
        }

        function onError() {
            alert('Something goes wrong, please try again!')
        }

        function disconnect() {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
                stompClient = null
            }
        }

        function levelUp() {
            fetch(`${AppConfig.LEVEL_UP}/${id}/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    alert('Success Level Up!!!')
                    window.location.reload();
                } else {
                    alert('Fail Level Up!!!')
                }
            }).catch(err => {
                console.log(err);
            })

        }

        function onMessageReceived(payload) {
            const message = JSON.parse(payload.body);

            if (message.senderId == receiverId) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const formatted = `${hours}:${minutes}`;

                let htmlString = '';

                if (message.type === 'survey') {
                    htmlString = `
                <a href="/survey/${message.senderId}" 
                target="_blank" rel="noopener noreferrer"
                   class="message reveice-message relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-blue-300 self-start">
                    <button title="Survey Link">
                        <i class="fa-solid fa-clipboard-list inline-block text-[#002275] text-2xl"></i>
                    </button>
                    <span class="time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]">
                        ${formatted}
                    </span>
                </a>
            `;
                } else {
                    htmlString = `
                <div class="message reveice-message relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-slate-200 self-start">
                    <p class="content-message whitespace-pre-wrap">${message.content}</p>
                    <span class="time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]">
                        ${formatted}
                    </span>
                </div>
            `;
                }

                const template = document.createElement('template');
                template.innerHTML = htmlString.trim();
                const messageElement = template.content.firstChild;

                chatContainer.appendChild(messageElement);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }


        function sendPrivateMessage(event) {
            const message = messageInput.value.trim();
            if(message.length > 200) {
                event.preventDefault();
                alert("Message could not be greater than 200 characters, sir!");
                return;
            }
            if (message && receiverId && stompClient) {  // Added message check
                const chatMessage = {
                    senderId: id,
                    receiverId: receiverId,
                    content: message,
                    type: 'message',
                    timestamp: Date.now()
                };
                try {
                    stompClient.send(`/app/chat.privateMessage/${receiverId}`, {}, JSON.stringify(chatMessage));
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');

                    const formatted = `${hours}:${minutes}`;

                    const htmlString =
                        `
                    <div class="message send-message relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-blue-300 self-end">
                        <p class="content-message">${message}</p>
                        <span class="time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]">${formatted}</span>
                    </div>
                    `

                    const template = document.createElement('template');
                    template.innerHTML = htmlString.trim(); // remove whitespace

                    const messageElement = template.content.firstChild;
                    chatContainer.appendChild(messageElement);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                } catch (error) {
                    alert('Could not send message. Please try again!');
                }
                messageInput.value = "";
            }
            event.preventDefault();
        }

        function sendSurveyForm(event) {
            fetch(`${AppConfig.IS_SURVEY_EXISTS}/${id}`)
                .then(result => {
                    if (result.ok) {
                        // send survey
                        if (stompClient) {
                            const chatMessage = {
                                senderId: id,
                                receiverId: receiverId,
                                content: `/survey/${id}`,
                                type: 'survey',
                                timestamp: Date.now()
                            };
                            stompClient.send(`/app/chat.privateMessage/${receiverId}`, {}, JSON.stringify(chatMessage));
                            const now = new Date();
                            const hours = String(now.getHours()).padStart(2, '0');
                            const minutes = String(now.getMinutes()).padStart(2, '0');

                            const formatted = `${hours}:${minutes}`;

                            const htmlString =
                                `
                            <a href="/survey/${id}" target="_blank" rel="noopener noreferrer" class="message send-message relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-blue-300 self-end">
                                <button><i class="fa-solid fa-clipboard-list inline-block text-[#002275] text-2xl"></i></button>
                            </a>
                            `

                            const template = document.createElement('template');
                            template.innerHTML = htmlString.trim(); // remove whitespace

                            const messageElement = template.content.firstChild;
                            chatContainer.appendChild(messageElement);
                            chatContainer.scrollTop = chatContainer.scrollHeight;
                        }
                    } else {
                        alert('You have to create your survey first!')
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            event.preventDefault();
        }

        connect()

        window.addEventListener('beforeunload', () => {
            disconnect()
        });

        sendButton.addEventListener('click', sendPrivateMessage);
        sendSurvey.addEventListener('click', sendSurveyForm);
        levelUpBtn.addEventListener('click', levelUp)

        const contactItems = document.querySelectorAll('.contact-item');

        contactItems.forEach(item => {
            item.addEventListener('click', () => {
                const info = item.id.split(':')
                console.log(info)
                openChatForUser(info);
            });
        });


        function openChatForUser(info) {
            chatContainer.innerHTML = ""
            mainChat.classList.remove('hidden');
            header.classList.remove('hidden');
            chatContainer.classList.remove('hidden');
            input.classList.remove('hidden');

            userAvatar.src = `/images/userImages/${info[1]}`
            userName.textContent = info[2];
            phaseIcon.src = `${info[3]}`
            userProfile.href = `/profile/${info[2]}`
            receiverId = info[0]

            fetch(`${AppConfig.GET_MESSAGE}/${id}/${info[0]}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(message => {
                        const now = new Date(message.timestamp);
                        const hours = String(now.getHours()).padStart(2, '0');
                        const minutes = String(now.getMinutes()).padStart(2, '0');
                        const timeHtml = `
                        <span class="time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]">
                          ${hours}:${minutes}
                        </span>`;

                        // decide alignment class
                        const isSender = message.senderId == id;
                        const selfClass = isSender ? 'self-end' : 'self-start';

                        let htmlString;

                        if (message.type === 'survey') {
                            // survey message: wrap in <a>
                            htmlString = `
                              <a href="${message.content}" 
                                target="_blank" rel="noopener noreferrer"
                                 class="message receive-or-send relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-blue-300 ${selfClass}">
                                <button>
                                  <i class="fa-solid fa-clipboard-list inline-block text-[#002275] text-2xl"></i>
                                </button>
                                ${timeHtml}
                              </a>`;
                        } else {
                            // normal text message
                            const bg = isSender ? 'bg-slate-200' : 'bg-slate-100';
                            htmlString = `
                              <div class="message receive-or-send relative max-w-[60%] my-[10px] p-4 rounded-[10px] ${bg} ${selfClass}">
                                <p class="content-message whitespace-pre-wrap">${message.content}</p>
                                ${timeHtml}
                              </div>`;
                        }

                        // inject into DOM
                        const template = document.createElement('template');
                        template.innerHTML = htmlString.trim();
                        const messageElement = template.content.firstChild;
                        chatContainer.appendChild(messageElement);
                    });

                    setTimeout(() => {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }, 0);
                })
                .catch(error => console.log(error));

        }

    }
)
