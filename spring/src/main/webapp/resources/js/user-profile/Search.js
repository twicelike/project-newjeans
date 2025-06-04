document.addEventListener('DOMContentLoaded', () => {
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
})