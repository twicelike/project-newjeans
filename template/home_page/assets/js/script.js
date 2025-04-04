//Swiper slider image
var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
});

//Interact icon click
const interactIcon = document.getElementById('interactIcon');
interactIcon.addEventListener('click', function(){
    interactIcon.classList.toggle('interact-icon');
});

//Search Box
const ctSearch = document.getElementById('ctSearch');
const searchBox = document.getElementById('searchBox');
const closeSearch = document.getElementById('closeSearch');
const ctContent = document.getElementsByClassName('ct-content');

document.addEventListener('click', (e) => {
  if(ctSearch.contains(e.target)) {
      searchBox.classList.toggle('hidden');
  }
  else {
    if(searchBox.contains) {
      if(closeSearch.contains(e.target)){
        searchBox.classList.add('hidden');
      }
      else if(!searchBox.contains(e.target)){
        searchBox.classList.add('hidden');
      }
    }
  }
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

