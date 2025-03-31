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

//Up/Down Button
document.addEventListener('DOMContentLoaded', function () {
  const posts = document.querySelectorAll('.main-wrapper > div');
  let currentIndex = 0;

  // Hàm hiển thị bài viết theo index
  function showPost(index) {
    posts.forEach((post, i) => {
      if (i === index) {
        post.classList.remove('hidden');
      } else {
        post.classList.add('hidden');
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

  //Cuộn chuột
  const mainWrapper = document.querySelector('.root');
  let isScrolling = false;

  mainWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0) {
      // Cuộn xuống
      if (currentIndex < posts.length - 1) {
        currentIndex++;
        showPost(currentIndex);
      }
    } else {
      // Cuộn lên
      if (currentIndex > 0) {
        currentIndex--;
        showPost(currentIndex);
      }
    }

    setTimeout(() => {
      isScrolling = false;
    }, 100);
  });
});
