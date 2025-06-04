
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
    const uploadLabel = input.closest('.uploadLabel');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container relative aspect-square w-full h-full';

            // Create a canvas to process the image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = function () {
                // Set canvas dimensions to desired size
                canvas.width = 800;  // High quality width
                canvas.height = 800; // High quality height

                // Calculate aspect ratio
                const aspectRatio = img.width / img.height;
                let drawWidth = canvas.width;
                let drawHeight = canvas.height;

                // Adjust dimensions to maintain aspect ratio
                if (aspectRatio > 1) {
                    drawHeight = canvas.width / aspectRatio;
                } else {
                    drawWidth = canvas.height * aspectRatio;
                }

                // Center the image
                const x = (canvas.width - drawWidth) / 2;
                const y = (canvas.height - drawHeight) / 2;

                // Draw image with high quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, x, y, drawWidth, drawHeight);

                // Create display image
                const displayImg = document.createElement('img');
                displayImg.src = canvas.toDataURL('image/jpeg', 0.95); // High quality JPEG
                displayImg.className = 'w-full h-full object-cover rounded-lg';

                // Create delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '×';
                deleteBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors';

                // Add delete functionality
                deleteBtn.onclick = function () {
                    imageContainer.remove();
                    // Show the upload label again after deletion
                    uploadLabel.style.display = 'flex';
                };

                // Append elements to container
                imageContainer.appendChild(displayImg);
                imageContainer.appendChild(deleteBtn);

                // Insert the new image container before the upload label
                container.insertBefore(imageContainer, uploadLabel);

                // Hide the upload label after successful upload
                uploadLabel.style.display = 'none';
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }

    // Clear the input value to allow uploading the same file again
    input.value = '';
}
