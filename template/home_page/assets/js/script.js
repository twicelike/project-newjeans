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

//Interact icon click
const interactIcon = document.getElementById('interactIcon');
//Match Popup
const matchPopup = document.getElementById('matchPopup');
const popupBg = document.getElementById('popupBg');
const closePopup = document.getElementById('closePopup');
const matchBtn = document.getElementById('matchBtn');
//Search Box
const ctSearch = document.getElementById('ctSearch');
const searchBox = document.getElementById('searchBox');
const closeSearch = document.getElementById('closeSearch');
const ctContent = document.getElementsByClassName('ct-content');

document.addEventListener('click', (e) => {
  //Open Search Box
  if(ctSearch.contains(e.target)) {
      searchBox.classList.toggle('hidden');
  }
  //Open Match Popup
  if(interactIcon.contains(e.target)) {
    popupBg.classList.add('active');
    matchPopup.classList.add('active');
  }
  //Choose Match Button
  if(matchBtn.contains(e.target)){
    popupBg.classList.remove('active');
    matchPopup.classList.remove('active');
    interactIcon.classList.toggle('interact-icon');
  }
  //Close SearchBox
  if(searchBox.contains) {
    if(closeSearch.contains(e.target)){
      searchBox.classList.add('hidden');
    }
  }
  if (!ctSearch.contains(e.target) && !searchBox.contains(e.target)) {
    searchBox.classList.add('hidden');
  }

  //Close Match Popup
  if ((!interactIcon.contains(e.target) && !matchPopup.contains(e.target)) || closePopup.contains(e.target)) {
    popupBg.classList.remove('active');
    matchPopup.classList.remove('active');
  }
})

//Count Characters
const messageBox = document.getElementById('messageBox');
const countCharacter = document.getElementById('countCharacter');
messageBox.addEventListener('input', () => {
  const count = messageBox.value.length;
  countCharacter.textContent = `${count}/360 Characters`;
})


//Up/Down Button
document.addEventListener('DOMContentLoaded', function () {
  const posts = document.querySelectorAll('.main-wrapper > div');
  let currentIndex = 0;

  function showPost(index) {
    posts.forEach((post, i) => {
      if (i === index) {
        post.classList.add('active');
      } else {
        post.classList.remove('active');
      }
    });
  }

  const upButton = document.querySelector('.up-button');
  const downButton = document.querySelector('.down-button');

  //Up Button
  if (upButton) {
    upButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showPost(currentIndex);
      }
    });
  }

  //Down Button
  if (downButton) {
    downButton.addEventListener('click', () => {
      if (currentIndex < posts.length - 1) {
        currentIndex++;
        showPost(currentIndex);
      }
    });
  }

  const mainWrapper = document.querySelector('.root');
  let isScrolling = false;

  mainWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0) {
      if (currentIndex < posts.length - 1) {
        currentIndex++;
        showPost(currentIndex);
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
        showPost(currentIndex);
      }
    }

    setTimeout(() => {
      isScrolling = false;
    }, 400); 
  });
});

