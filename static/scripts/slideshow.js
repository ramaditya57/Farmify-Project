document.addEventListener("DOMContentLoaded", function() {
    // Debug log to ensure the script is running
    console.log("Script loaded");

    // Get elements
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    // Debug log to check if elements are found
    console.log("Slides found:", slides.length);
    console.log("Prev button found:", prevButton);
    console.log("Next button found:", nextButton);

    let currentIndex = 0;
    let autoSlideInterval;

    function changeSlide(direction) {
        // Debug log
        console.log("Changing slide, direction:", direction);
        
        // Remove active class from current slide
        slides[currentIndex].classList.remove("active");
        
        // Calculate new index
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        
        // Add active class to new slide
        slides[currentIndex].classList.add("active");
        
        // Debug log
        console.log("New current index:", currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 2500);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Add click event listeners
    if (prevButton) {
        prevButton.onclick = function(e) {
            e.preventDefault();
            console.log("Previous button clicked");
            changeSlide(-1);
            resetAutoSlide();
        };
    }

    if (nextButton) {
        nextButton.onclick = function(e) {
            e.preventDefault();
            console.log("Next button clicked");
            changeSlide(1);
            resetAutoSlide();
        };
    }

    // Start the automatic slideshow
    startAutoSlide();
});