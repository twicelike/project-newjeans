
function transPage(navigationLink, section){
  const settingsNavLinks = document.querySelectorAll('.'+navigationLink);//
  const settingsSections = document.querySelectorAll('.'+section+'-section');//

  if (settingsSections.length > 0) {
      settingsSections[0].classList.remove('hidden');
  }

  settingsNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();

          settingsNavLinks.forEach(l => l.classList.remove('active'));

          link.classList.add('active');

          settingsSections.forEach(section => {
              section.classList.add('hidden');
          });

          const targetId = `${link.dataset.target}-section`;
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              targetSection.classList.remove('hidden');
          }

          document.getElementById(section).classList.remove('hidden');
      });
  });
}
transPage('settings-nav-link','settings');
transPage('settings-nav-general-link','general');