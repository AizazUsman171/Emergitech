document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress');
    const content = document.getElementById('main-content'); 
    let assetsLoaded = 0;
    
    // Calculate total assets
    const images = document.images;
    const videos = document.querySelectorAll('video');
    const totalAssets = images.length + videos.length;

    // Function to update progress
    function updateProgress() {
        assetsLoaded++;
        let progressPercent = (assetsLoaded / totalAssets) * 100;

        progressBar.style.width = progressPercent + '%';
        progressText.textContent = Math.round(progressPercent) + '%';

        if (progressPercent >= 100) {
            setTimeout(hidePreloader, 500); // Hide preloader when all assets are loaded
        }
    }

    // Function to hide the preloader and show the content
    function hidePreloader() {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
            content.style.display = 'block'; // Show the content when preloader is hidden
        }, 500);
        document.body.style.overflow = 'auto';
    }

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    // Add event listeners for images
    for (let img of images) {
        if (img.complete) {
            updateProgress(); // Already loaded images
        } else {
            img.addEventListener('load', updateProgress);
            img.addEventListener('error', updateProgress);
        }
    }

    // Add event listeners for videos
    for (let video of videos) {
        if (video.readyState >= 3) {
            updateProgress(); // Video is ready
        } else {
            video.addEventListener('loadeddata', updateProgress);
            video.addEventListener('error', updateProgress);
        }
    }

    // Start progress update
    if (totalAssets === 0) {
        hidePreloader(); // Hide if no assets to load
    }
});
