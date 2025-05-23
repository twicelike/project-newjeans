const images = document.querySelectorAll(".introduceImage");
const postDate = document.querySelectorAll(".dateTime");
let currentIndex = 0;

function TransImage(button) {
  images[currentIndex].classList.add("hidden");
  postDate[currentIndex].classList.add("hidden");

  if (button.id === "btnNext") {
    currentIndex = (currentIndex + 1) % images.length; // qua phải
  } else {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // qua trái
  }

  images[currentIndex].classList.remove("hidden");
  postDate[currentIndex].classList.remove("hidden");
}

