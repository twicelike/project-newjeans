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