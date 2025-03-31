
document.addEventListener('DOMContentLoaded', function () {
    const bioSelectedTags = document.getElementById('bioSelectedTags');
    const findSelectedTags = document.getElementById('findSelectedTags');
    const interestButtons = document.querySelectorAll('.interest-btn');
    let bioselectedInterests = new Set();
    let targetselectedInterests = new Set();
    const maxInterests = 8;

    function createTag(emoji, text, section) {
        const tag = document.createElement('div');
        tag.className = 'flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded-lg';
        tag.innerHTML = `
            <span class="text-xl">${emoji}</span>
            <span>${text}</span>
            <button class="ml-2 hover:text-red-300">×</button>
        `;

        const button = tag.querySelector('button');
        button.addEventListener('click', function () {
            removeInterest(text, section);
        });

        return tag;
    }

    function addInterest(button, section, listInterest) {
        const interest = button.dataset.interest;
        const emoji = button.dataset.emoji;
        const container = section === 'bio' ? bioSelectedTags : findSelectedTags;

        if (listInterest.size >= maxInterests) {
            alert(`You can only select up to ${maxInterests} interests`);
            return;
        }

        if (!listInterest.has(interest)) {
            listInterest.add(interest);
            const tag = createTag(emoji, interest, section);
            container.appendChild(tag);

            button.classList.add('bg-purple-500', 'text-white', 'border-purple-500');
        }
    }

    function removeInterest(interest, section, button, listInterest) {
        if (listInterest.has(interest)) {
            listInterest.delete(interest);

            const container = section === 'bio' ? bioSelectedTags : findSelectedTags;
            const tags = container.getElementsByTagName('div');
            for (let tag of tags) {
                if (tag.textContent.includes(interest)) {
                    tag.remove();   
                    break;
                }
            }

            console.log("remove interest", button);
            if (button) {
                button.classList.remove('bg-purple-500', 'text-white', 'border-purple-500');
            }
        }
    }

    document.querySelectorAll('#bio-section .interest-btn').forEach(button => {
        button.addEventListener('click', () => {
            const interest = button.dataset.interest;
            if (bioselectedInterests.has(interest)) {
                removeInterest(interest, 'bio', button, bioselectedInterests);
            } else {
                addInterest(button, 'bio', bioselectedInterests);
            }
        });
    });

    document.querySelectorAll('#find-section .interest-btn').forEach(button => {
        button.addEventListener('click', () => {
            const interest = button.dataset.interest;
            if (targetselectedInterests.has(interest)) {
                removeInterest(interest, 'find', button, targetselectedInterests);
            } else {
                addInterest(button, 'find', targetselectedInterests);
            }
        });
    });

    window.removeInterest = removeInterest;
});