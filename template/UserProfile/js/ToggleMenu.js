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