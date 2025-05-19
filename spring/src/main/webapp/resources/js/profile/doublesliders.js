document.addEventListener('DOMContentLoaded', function () {

    const rangeSlider = document.querySelector('.relative.h-2');
    const ageTrack = document.getElementById('ageTrack');
    const thumbMin = document.getElementById('thumbMin');
    const thumbMax = document.getElementById('thumbMax');
    const minValue = document.getElementById('minValue');
    const maxValue = document.getElementById('maxValue');
    const ageRange = document.getElementById('ageRange');

    const minAge = 18;
    const maxAge = 99;
    const minGap = 4;
    let currentMin = 18;
    let currentMax = 35;
    let isDraggingMin = false;
    let isDraggingMax = false;

    function calculatePercent(value) {
        return ((value - minAge) / (maxAge - minAge)) * 100;
    }

    function calculateValue(percent) {
        return Math.round((percent / 100) * (maxAge - minAge) + minAge);
    }

    function updateSliderUI() {
        console.log("updateSliderUI");
        const minPercent = calculatePercent(currentMin);
        const maxPercent = calculatePercent(currentMax);

        thumbMin.style.left = `${minPercent}%`;
        thumbMax.style.left = `${maxPercent}%`;

        ageTrack.style.left = `${minPercent}%`;
        ageTrack.style.width = `${maxPercent - minPercent}%`;

        // Cập nhật giá trị hiển thị
        minValue.textContent = currentMin;
        maxValue.textContent = currentMax;
        ageRange.textContent = `${currentMin} - ${currentMax}`;
    }

    function handleSliderMove(e) {
        if (!isDraggingMin && !isDraggingMax) return;

        const rect = rangeSlider.getBoundingClientRect();
        let percent = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100);
        let newValue = calculateValue(percent);

        if (isDraggingMin) {
            // Giới hạn giá trị tối thiểu và đảm bảo khoảng cách với max
            newValue = Math.max(minAge, Math.min(currentMax - minGap, newValue));
            currentMin = newValue;
        } else if (isDraggingMax) {
            // Giới hạn giá trị tối đa và đảm bảo khoảng cách với min
            newValue = Math.min(maxAge, Math.max(currentMin + minGap, newValue));
            currentMax = newValue;
        }

        updateSliderUI();
    }

    function handleTouchMove(e) {
        if (!isDraggingMin && !isDraggingMax) return;

        const touch = e.touches[0];
        const rect = rangeSlider.getBoundingClientRect();
        let percent = Math.min(Math.max(((touch.clientX - rect.left) / rect.width) * 100, 0), 100);
        let newValue = calculateValue(percent);

        if (isDraggingMin) {
            newValue = Math.max(minAge, Math.min(currentMax - minGap, newValue));
            currentMin = newValue;
        } else if (isDraggingMax) {
            newValue = Math.min(maxAge, Math.max(currentMin + minGap, newValue));
            currentMax = newValue;
        }

        updateSliderUI();
        e.preventDefault();
    }

// Mouse events
    thumbMin.addEventListener('mousedown', (e) => {
        console.log("mousedown");
        isDraggingMin = true;
        isDraggingMax = false;
        e.preventDefault();
        thumbMin.style.zIndex = "20";
        thumbMax.style.zIndex = "10";
    });

    thumbMax.addEventListener('mousedown', (e) => {
        console.log("mousedown max");
        isDraggingMax = true;
        isDraggingMin = false;
        e.preventDefault();
        thumbMax.style.zIndex = "20";
        thumbMin.style.zIndex = "10";
    });

    document.addEventListener('mousemove', handleSliderMove);
    document.addEventListener('mouseup', () => {
        isDraggingMin = false;
        isDraggingMax = false;
    });

// Touch events
    thumbMin.addEventListener('touchstart', (e) => {
        isDraggingMin = true;
        isDraggingMax = false;
        e.preventDefault();
        thumbMin.style.zIndex = "20";
        thumbMax.style.zIndex = "10";
    });

    thumbMax.addEventListener('touchstart', (e) => {
        isDraggingMax = true;
        isDraggingMin = false;
        e.preventDefault();
        thumbMax.style.zIndex = "20";
        thumbMin.style.zIndex = "10";
    });

    document.addEventListener('touchmove', handleTouchMove, {passive: false});
    document.addEventListener('touchend', () => {
        isDraggingMin = false;
        isDraggingMax = false;
    });

// Khởi tạo slider với giá trị mặc định
    updateSliderUI();
});