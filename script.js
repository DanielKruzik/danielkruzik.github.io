import PhotoSwipeLightbox from '/photoswipe/photoswipe-lightbox.esm.js';
const options = {
  gallery:'#grid-medium',
  children:'.pswp-gallery__item',
  pswpModule: () => import('/photoswipe/photoswipe.esm.js')
};
const lightbox = new PhotoSwipeLightbox(options);
lightbox.on('uiRegister', function() {
  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'root',
    html: 'Caption text',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content');
          if (hiddenCaption) {
            // get caption from element with class hidden-caption-content
            captionHTML = hiddenCaption.innerHTML;
          } else {
            // get caption from alt attribute
            captionHTML = currSlideElement.querySelector('img').getAttribute('alt');
          }
        }
        el.innerHTML = captionHTML || '';
      });
    }
  });
});
lightbox.init();

// CAROUSEL
let slides = document.querySelectorAll('.slide');
let progress = document.querySelector('.progress');
let currentIndex = 0;
const slideInterval = 3000; // 1000 = 1 second
let slideTimer;

function showSlide(index) {
    // Update the transform property of the slides to slide them horizontally
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`; // Move the slides left

    // Reset progress animation
    progress.style.transition = 'none';
    progress.style.width = '0%';
    setTimeout(() => {
        progress.style.transition = `width ${slideInterval}ms linear`;
        progress.style.width = '100%';
    }, 50);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function startCarousel() {
    showSlide(currentIndex);
    slideTimer = setInterval(nextSlide, slideInterval);
}

function stopCarousel() {
    clearInterval(slideTimer);
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Pause carousel when page is not visible
        stopCarousel();
    } else {
        // Resume carousel when page becomes visible
        startCarousel();
    }
}

// Initialize
startCarousel();

// Listen for visibility change event to pause/resume carousel
document.addEventListener('visibilitychange', handleVisibilityChange);


// IMAGE MODAL
var modal = document.querySelector('.image-modal');
var closeButton = document.querySelector('.close-btn');
var modalImage = document.querySelector('.modal-image');
var overlay = document.querySelector('.overlay');

// When the user clicks on the close button, close the modal and hide the overlay
closeButton.onclick = function() {
    closeModal();
}

// Function to close the modal
function closeModal() {
    modal.style.opacity = '0'; // Fade out the modal
    modal.style.transform = 'translate(-50%, -50%) scale(0)'; // Scale it down
    overlay.style.opacity = '0'; // Fade out the overlay

    // After the transition ends, hide the modal and overlay completely
    setTimeout(function() {
        modal.style.display = 'none'; // Hide the modal
        overlay.style.display = 'none'; // Hide the overlay
    }, 300); // Match the duration of the transition
}

// Function to open the modal and display the clicked image with customizable scale
function openImageModal(clickedImage, scaleVar) {
    var imageSrc = clickedImage.src;
    modalImage.src = imageSrc; // Set the src of the modal image to the clicked image's src
    modal.style.display = 'block'; // Show the modal
    overlay.style.display = 'block'; // Show the overlay

    // Trigger the fade-in and scaling transition
    setTimeout(function() {
        modal.style.opacity = '1'; // Fade in the modal
        modal.style.transform = `translate(-50%, -50%) scale(${scaleVar})`; // Apply custom scale value
        overlay.style.opacity = '1'; // Fade in the overlay
    }, 10); // A small delay to ensure the display property change is applied first
}

// Add event listener for the Escape key press to close the modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') { // Check if the Escape key is pressed
        closeModal();
    }
});

// Add event listener for clicks on the overlay to close the modal
overlay.addEventListener('click', function(event) {
    // Check if the click happened outside the modal image
    if (!modalImage.contains(event.target)) {
        closeModal();
    }
});