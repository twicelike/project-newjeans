document.addEventListener('DOMContentLoaded', () => {

    function handleDropdown(buttonId, menuId) {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);

        if (button && menu) {
            button.addEventListener('mouseenter', () => {
                menu.classList.remove('hidden');
            });

            button.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
            });

            menu.addEventListener('mouseleave', () => {
                menu.classList.add('hidden');
            });
        }
    }

    handleDropdown('avtUser', 'dropDownAVTUser');
})