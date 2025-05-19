function TransPage(navButtons, sections) {
    const getNavButtons = document.querySelectorAll('.'+navButtons);
    const getSections = document.querySelectorAll('.'+sections);
    getNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            getSections.forEach(section => {
                section.classList.add('hidden');
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });
}

TransPage('settings-nav-link', 'bio-section');
TransPage('main-nav-link', 'content-section');
TransPage('profile-nav-link', 'profile-section');
