const users = [
  { name: 'User 1' },
  { name: 'User 2' },
  { name: 'User 3' },
  { name: 'User 4' },
  { name: 'User 5' },
  { name: 'User 6' },
];

document.addEventListener('DOMContentLoaded', () => {
  const matchIcons = document.querySelectorAll('.inner-item .inner-match');
  const popupBg    = document.getElementById('popupBg');
  const matchPopup = document.getElementById('matchPopup');
  const popupAvatar= matchPopup.querySelector('.popup-profile img');
  const popupName  = matchPopup.querySelector('.popup-profile span');
  const msgBox     = matchPopup.querySelector('#messageBox');
  const countChar  = matchPopup.querySelector('#countCharacter');
  const matchBtn   = document.getElementById('matchBtn');
  const closeBtn   = matchPopup.querySelector('.close-icon');

  let activeIcon = null;

  function openPopup(iconEl) {
    activeIcon = iconEl;
    const item = iconEl.closest('.inner-item');

    // Lấy avatar và tên từ item
    const avatarSrc = item.querySelector('.inner-profile .inner-image img').src;
    const userName  = item.querySelector('.inner-profile .inner-info .inner-name').textContent.trim();

    // Đổ vào popup
    popupAvatar.src       = avatarSrc;
    popupName.textContent = userName;

    // Reset textarea và counter
    msgBox.value = '';
    countChar.textContent = '0/360 Characters';

    // Hiển thị popup
    popupBg.classList.add('active');
    matchPopup.classList.add('active');
  }

  function closePopup() {
    popupBg.classList.remove('active');
    matchPopup.classList.remove('active');
  }

  // Click vào icon để mở popup
  matchIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      // Nếu đã match rồi (grayscale-0), bỏ qua
      if (icon.classList.contains('grayscale-0')) return;
      openPopup(icon);
    });
  });

  // Đếm ký tự trong textarea
  msgBox.addEventListener('input', () => {
    countChar.textContent = `${msgBox.value.length}/360 Characters`;
  });

  // Khi bấm nút Match trong popup
  matchBtn.addEventListener('click', () => {
    if (activeIcon) {
      activeIcon.classList.remove('grayscale');
      activeIcon.classList.add('grayscale-0');
    }
    closePopup();
  });

  // Đóng popup
  closeBtn.addEventListener('click', closePopup);
  popupBg.addEventListener('click', closePopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopup();
  });


  const boxMenu = document.getElementById('boxMenu');
  const btnBars = document.getElementById('btnBars');

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

  //Search
  const searchInput = boxSearch.querySelector('.inner-input-search input');
  const innerWrap   = boxSearch.querySelector('.inner-wrap');

  const resultsDiv     = document.createElement('div');
  resultsDiv.className = 'search-results mt-4 max-h-60 overflow-y-auto text-[var(--color-one)]';
  innerWrap.append(resultsDiv);

  function renderSearch(q) {
    if (!q) {
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';
      return;
    }
    const lc = q.toLowerCase();
    const matches = users.filter(u => u.name.toLowerCase().includes(lc));

    if (matches.length === 0) {
      resultsDiv.innerHTML = `<p class="py-2">No results.</p>`;
    } else {
      resultsDiv.innerHTML = '<ul class="space-y-1">' +
        matches.map(u => `<li class="py-1 border-b">${u.name}</li>`).join('') +
        '</ul>';
    }
    resultsDiv.style.display = 'block';
  }

  searchInput.addEventListener('input', e => {
    renderSearch(e.target.value.trim());
  });

  document.addEventListener('click', e => {
    if (!boxSearch.contains(e.target)) {
      resultsDiv.style.display = 'none';
    }
  });

  //Logout
  const profileToggle = document.querySelector('.inner-profile');
  const logoutBox     = document.querySelector('.log-out-box');

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