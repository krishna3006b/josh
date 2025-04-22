const videoContainer = document.querySelector('.video-container');
const video = videoContainer.querySelector('video');
const playButton = videoContainer.querySelector('.play-button');

videoContainer.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
    } else {
        video.pause();
        playButton.style.display = 'block';
    }
});

video.addEventListener('play', () => {
    playButton.style.display = 'none';
});

video.addEventListener('pause', () => {
    playButton.style.display = 'block';
});

const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-dots .dot');
let currentSlide = 0;
let slideInterval;

const sliderContainer = document.createElement('div');
sliderContainer.className = 'slider-container';
testimonials.forEach(testimonial => sliderContainer.appendChild(testimonial.cloneNode(true)));
testimonialSlider.innerHTML = '';
testimonialSlider.appendChild(sliderContainer);

updateSlidePosition();

function updateSlidePosition() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    sliderContainer.style.transition = 'transform 0.5s ease-in-out';
    updateSlidePosition();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    sliderContainer.style.transition = 'transform 0.5s ease-in-out';
    updateSlidePosition();
}

function goToSlide(index) {
    currentSlide = index;
    sliderContainer.style.transition = 'transform 0.5s ease-in-out';
    updateSlidePosition();
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopSlideShow();
        goToSlide(index);
        startSlideShow();
    });
});

let touchStartX = 0;
let touchEndX = 0;

testimonialSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopSlideShow();
}, { passive: true });

testimonialSlider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startSlideShow();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

startSlideShow();

const contactForm = document.querySelector('.contact-form');
const successModal = document.getElementById('successModal');
const closeModal = successModal.querySelector('.close-modal');
const submitButton = contactForm.querySelector('button[type="submit"]');

function openModal() {
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    successModal.style.display = 'none';
    document.body.style.overflow = '';
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitButton.classList.add('loading');
    submitButton.textContent = 'Sending...';
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitButton.classList.remove('loading');
    submitButton.textContent = 'Send';
    
    openModal();
    
    contactForm.reset();
});

closeModal.addEventListener('click', closeModalHandler);

window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModalHandler();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.style.display === 'flex') {
        closeModalHandler();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.backgroundColor = 'rgba(37, 43, 66, 0.95)';
    } else {
        header.style.backgroundColor = '#252B42';
    }
    
    lastScrollTop = scrollTop;
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : '';
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initializeFooterCollapse();
    window.addEventListener('resize', initializeFooterCollapse);
});

function initializeFooterCollapse() {
    if (window.innerWidth < 769) {
        const footerSections = document.querySelectorAll('.footer-section');
        
        footerSections.forEach(section => {
            const heading = section.querySelector('h4');
            
            if (heading) {
                heading.addEventListener('click', () => {
                    footerSections.forEach(otherSection => {
                        if (otherSection !== section) {
                            otherSection.classList.remove('active');
                        }
                    });
                    
                    section.classList.toggle('active');
                });
            }
        });
    }
} 