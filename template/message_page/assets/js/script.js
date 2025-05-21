document.addEventListener('DOMContentLoaded', () => {
  const messageInput    = document.getElementById('messageInput');
  const sendButton      = document.getElementById('sendButton');
  const uploadImageBtn  = document.querySelector('.upload-image');
  const imageInput      = document.createElement('input');
  const chatContainer   = document.querySelector('.chat-container');
  const chatToggle      = document.getElementById('chatToggle');
  const mainChat        = document.getElementById('mainChat');
  const chatList        = document.getElementById('chatList');
  const chatHeader      = document.querySelector('.chat-header');
  const inputMessageBar = document.querySelector('.input-message');

  const contactItems = document.querySelectorAll('.contact-list li');
  const searchInput = document.getElementById('searchInput');
  const noResultMessage = document.getElementById('noResultMessage');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let matchCount = 0;
  
    contactItems.forEach(item => {
      const name = item.querySelector('.contact-name').innerText.toLowerCase();
      if (name.includes(query)) {
        item.classList.remove('hidden');
        matchCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    // Hiện/ẩn thông báo "Không tìm thấy kết quả"
    if (matchCount === 0) {
      noResultMessage.classList.remove('hidden');
    } else {
      noResultMessage.classList.add('hidden');
    }
  });


  // Placeholder khi chưa chọn người
  const placeholder = document.createElement('div');
  placeholder.id    = 'placeholderChat';
  placeholder.className = 'flex-1 flex items-center justify-center text-gray-500';
  placeholder.textContent = `Let's Chat`;
  mainChat.appendChild(placeholder);

  // Tạo <input type="file"> ẩn
  imageInput.type   = 'file';
  imageInput.accept = 'image/*';
  imageInput.classList.add('hidden');
  document.body.appendChild(imageInput);

  function appendMessage(el) {
    chatContainer.appendChild(el);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function sendTextMessage() {
    const raw = messageInput.value.trim();
    if (!raw) return;

    const newMessage = document.createElement('div');
    newMessage.className = 'message send-message relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-blue-300 self-end';

    const p = document.createElement('p');
    p.className = 'content-message whitespace-pre-wrap';
    p.textContent = raw;
    newMessage.appendChild(p);

    const ts = document.createElement('span');
    ts.className = 'time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]';
    ts.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    newMessage.appendChild(ts);

    appendMessage(newMessage);

    messageInput.value       = '';
    messageInput.rows        = 1;
    messageInput.style.height= 'auto';
  }

  function sendImageMessage(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const newMessage = document.createElement('div');
      newMessage.className = 'message send-message relative max-w-[60%] my-[10px] p-4 rounded-[10px] bg-blue-300 self-end';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'uploaded image';
      img.className = 'max-w-full object-cover rounded-lg mb-2';
      newMessage.appendChild(img);

      const ts = document.createElement('span');
      ts.className = 'time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]';
      ts.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      newMessage.appendChild(ts);

      appendMessage(newMessage);
    };
    reader.readAsDataURL(file);
  }

  messageInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  });
  sendButton.addEventListener('click', sendTextMessage);

  uploadImageBtn.addEventListener('click', () => {
    imageInput.click();
  });
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) sendImageMessage(file);
    imageInput.value = '';
  });

  // Xử lý sự kiện nút quay lại danh sách
  chatToggle.addEventListener('click', () => {
    mainChat.classList.add('hidden');
    mainChat.classList.remove('flex');

    chatHeader.classList.add('hidden');
    chatContainer.classList.add('hidden');
    inputMessageBar.classList.add('hidden');

    chatList.classList.remove('hidden');
    chatToggle.classList.add('hidden');

    // Trả lại placeholder "Let's Chat"
    if (!document.getElementById('placeholderChat')) {
      const placeholder = document.createElement('div');
      placeholder.id = 'placeholderChat';
      placeholder.className = 'flex-1 flex items-center justify-center text-gray-500';
      placeholder.textContent = `Let's Chat`;
      mainChat.appendChild(placeholder);
    }
  });

  // Di chuyển vào trong DOMContentLoaded
  contactItems.forEach(item => {
    item.addEventListener('click', () => {
      const avatarSrc = item.querySelector('.contact-avatar img').src;
      const userName  = item.querySelector('.contact-name').innerText;

      const headerAvatarImg = chatHeader.querySelector('.contact-avatar img');
      const headerNameSpan  = chatHeader.querySelector('.contact-name');

      headerAvatarImg.src = avatarSrc;
      headerNameSpan.innerText = userName;

      const ph = document.getElementById('placeholderChat');
      if (ph) ph.remove();
      mainChat.classList.remove('hidden');
      mainChat.classList.add('flex');

      chatToggle.classList.remove('hidden');
      chatHeader.classList.remove('hidden');
      chatContainer.classList.remove('hidden');
      inputMessageBar.classList.remove('hidden');

      if (window.innerWidth < 640) {
        chatList.classList.add('hidden');
      }
      else {
        chatToggle.classList.add('hidden');
      }

      const messages = messagesByUser[userName] || [];
      chatContainer.innerHTML = renderMessages(messages);
    });
  });

  //Search Box
  const searchTriggers = document.querySelectorAll('.inner-search');
  const boxSearch = document.getElementById('boxSearch');

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      boxSearch.classList.toggle('hidden');
    });
  });

  // Close
  document.addEventListener('click', e => {
    if (!boxSearch.contains(e.target) &&
      ![...searchTriggers].some(t => t.contains(e.target))) {
      boxSearch.classList.add('hidden');
    }
  });

   document.addEventListener('click', (e) => {
    if (btnBars.contains(e.target)) {
      //Click Toggle Top Menu Icon
      boxMenu.classList.toggle('hidden');
    } else {
      //Click outside from Toggle Top Menu Icon
      if (!boxMenu.contains(e.target)) {
        boxMenu.classList.add('hidden')
      }
    }
  });
});

//
const messagesByUser = {
  "User 1": [
    { type: 'receive', text: 'Hello!', time: '09:53' },
    { type: 'send',    text: 'Hi, how are you?', time: '09:55' },
    // ...
  ],
  "User 2": [
    { type: 'receive', text: 'Hi!', time: '09:53' },
    { type: 'send',    text: 'How are you?', time: '09:55' },
    // ...
  ],
  "User 3": [
    { type: 'receive', text: 'Hello!', time: '09:53' },
    { type: 'send',    text: '???', time: '09:55' },
    // ...
  ],
  "User 4": [
    { type: 'receive', text: 'Hello!', time: '09:53' },
    { type: 'send',    text: '...', time: '09:55' },
    // ...
  ],
  "User 5": [
    { type: 'receive', text: 'Sport?', time: '09:53' },
    { type: 'send',    text: 'Football', time: '09:55' },
    // ...
  ],
  "User 6": [
    { type: 'receive', text: 'Hold on', time: '09:53' },
    { type: 'send',    text: 'Okay', time: '09:55' },
    // ...
  ],
  "User 7": [
    { type: 'receive', text: 'Where are you?', time: '09:53' },
    { type: 'send',    text: 'VietNam', time: '09:55' },
    // ...
  ],
};
function renderMessages(messages) {
  return messages.map(msg => `
    <div class="message ${msg.type === 'send' ? 'send-message self-end bg-blue-300' : 'reveice-message self-start bg-slate-200'} 
                relative max-w-[60%] my-[10px] p-4 rounded-[10px]">
      <p class="content-message">${msg.text}</p>
      <span class="time absolute text-[12px] text-black opacity-70 bottom-[-20px] left-[5px]">${msg.time}</span>
    </div>
  `).join('');
}
