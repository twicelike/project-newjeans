const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

function TransPage(navButtons, sections) {
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      sections.forEach(section => {
        section.classList.add('hidden');
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove('hidden');
      }
    });
  });
}

TransPage(navButtons, sections);
