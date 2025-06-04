document.addEventListener('DOMContentLoaded', function () {
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

    saveButton.addEventListener('click', handleSave());

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
})
