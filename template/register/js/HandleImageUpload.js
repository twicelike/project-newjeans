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
          imageContainer.className = 'image-container relative aspect-square w-[200px] h-[200px]';

          // Create a canvas to process the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();

          img.onload = function() {
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

              imageContainer.appendChild(displayImg);
          imageContainer.appendChild(deleteBtn);

          container.insertBefore(imageContainer, uploadLabel);

          if (currentImages + 1 >= 6) {
              uploadLabel.style.display = 'none';
          }
          };

          img.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
  }

  input.value = '';
}