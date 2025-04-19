const menuButton = document.getElementById("menuButton");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

let isSidebarOpen = true;

function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    sidebar.style.transform = isSidebarOpen ? "translateX(0)" : "translateX(-100%)";
}

window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
        sidebar.style.transform = "translateX(-100%)";
        isSidebarOpen = false;
    }
});

menuButton.removeEventListener("click", toggleSidebar);

menuButton.addEventListener("mouseenter", () => {
    sidebar.style.transform = "translateX(0)";
});

sidebar.addEventListener("mouseenter", () => {
    sidebar.style.transform = "translateX(0)";
});

sidebar.addEventListener("mouseleave", () => {
    sidebar.style.transform = "translateX(-100%)";
});

menuButton.addEventListener("mouseleave", (e) => {
    if (e.clientX > menuButton.getBoundingClientRect().right) {
        return;
    }
    sidebar.style.transform = "translateX(-100%)";
});

const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".content-section");

links.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        sections.forEach(section => section.classList.add("hidden"));
        document.getElementById(this.getAttribute("data-target")).classList.remove("hidden");
    });
});

document.getElementById("fileInput").addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePic").src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function handleImageUpload(input) {
    const container = document.getElementById('pictureContainer');
    const uploadLabel = document.getElementById('uploadLabel');
    const currentImages = container.querySelectorAll('.image-container').length;

    if (currentImages >= 6) {
        alert('Bạn chỉ có thể tải lên tối đa 6 ảnh!');
        return;
    }

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container relative aspect-square';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-full h-full object-cover rounded-lg';

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '×';
            deleteBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors';

            deleteBtn.onclick = function () {
                imageContainer.remove();
                const remainingImages = container.querySelectorAll('.image-container').length;

                if (remainingImages < 6) {
                    uploadLabel.style.display = 'flex';
                }
            };

            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteBtn);

            container.insertBefore(imageContainer, uploadLabel);

            if (currentImages + 1 >= 6) {
                uploadLabel.style.display = 'none';
            }
        };

        reader.readAsDataURL(input.files[0]);
    }

    input.value = '';
}

function addUploadButton(container) {
    const label = document.createElement('label');
    label.className = 'w-36 h-36 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors';
    label.innerHTML = `
                <input type="file" class="hidden" accept="image/*" onchange="handleImageUpload(this)">
                <span class="text-4xl text-gray-400">+</span>
            `;
    container.appendChild(label);
}
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('aside nav a');
    const contentSections = document.querySelectorAll('.content-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');

            contentSections.forEach(section => {
                section.classList.add('hidden');
            });

            document.getElementById(target).classList.remove('hidden');
        });
    });

    
    if (menuButton && sidebar && closeSidebar) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });
    }

    const fileInput = document.getElementById('fileInput');
    const profilePic = document.getElementById('profilePic');

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    const pictureContainer = document.getElementById('pictureContainer');
    const maxImages = 6;

    function createImagePreview(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'relative w-36 h-36';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-full h-full object-cover rounded-lg';

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '×';
            deleteButton.className = 'absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600';
            deleteButton.onclick = function () {
                imageContainer.remove();
                updateUploadButton();
            };

            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteButton);

            const uploadLabel = pictureContainer.querySelector('label');
            pictureContainer.insertBefore(imageContainer, uploadLabel);
            updateUploadButton();
        };
        reader.readAsDataURL(file);
    }

    function updateUploadButton() {
        const uploadLabel = pictureContainer.querySelector('label');
        const currentImages = pictureContainer.querySelectorAll('.relative').length;

        if (currentImages >= maxImages) {
            uploadLabel.style.display = 'none';
        } else {
            uploadLabel.style.display = 'flex';
        }
    }

    pictureContainer.querySelector('input[type="file"]').addEventListener('change', function (e) {
        const files = e.target.files;
        const currentImages = pictureContainer.querySelectorAll('.relative').length;

        for (let i = 0; i < files.length && currentImages + i < maxImages; i++) {
            if (files[i].type.startsWith('image/')) {
                createImagePreview(files[i]);
            }
        }

        this.value = '';
    });

    document.getElementById('userAge').addEventListener('wheel', function (e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            incrementAge(e.target.id);
        } else {
            decrementAge(e.target.id);
        }
    });

    const saveButton = document.getElementById('saveChanges');

    function collectFormData() {
        return {
            bio: document.getElementById('bio')?.value,
            gender: document.getElementById('gender')?.value,
            address: document.getElementById('address')?.value,
            age: document.getElementById('userAge')?.value,
            relationship: document.getElementById('relationship')?.value,
            educationLevel: document.getElementById('edu-level')?.value,
        };
    }

    async function handleSave() {
        try {
            const formData = collectFormData();

            saveButton.textContent = 'Saving...';
            saveButton.disabled = true;

            alert('Changes saved successfully!');

        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes. Please try again.');
        } finally {
            saveButton.textContent = 'Save';
            saveButton.disabled = false;
        }
    }

    saveButton.addEventListener('click', handleSave);

    function setupChangeTracking() {
        const formElements = document.querySelectorAll('input, select, textarea');
        let hasChanges = false;

        formElements.forEach(element => {
            element.addEventListener('change', () => {
                hasChanges = true;
                saveButton.style.opacity = '1';
                saveButton.disabled = false;
            });
        });

        saveButton.style.opacity = '0.5';
        saveButton.disabled = true;
    }

    setupChangeTracking();

});