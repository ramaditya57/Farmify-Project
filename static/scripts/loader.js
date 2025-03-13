document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".loader-container");
    
    // Show loader for 1.5s, then hide
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500); // 0.5s fade out effect
    }, 1500);
});
