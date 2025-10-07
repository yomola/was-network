document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Video Carousel (No Auto-Rotation)
    // ======================
    const initVideoCarousel = () => {
        const slides = document.querySelector('.video-slides');
        const slideItems = document.querySelectorAll('.video-slide');
        const prevBtn = document.querySelector('.prev-video');
        const nextBtn = document.querySelector('.next-video');
        const dotsContainer = document.querySelector('.video-dots');
        
        if (!slides || slideItems.length === 0) return;
        
        let currentIndex = 0;
        const slideCount = slideItems.length;
        
        const createDots = () => {
            slideItems.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('video-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        };
        
        const updateCarousel = () => {
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            document.querySelectorAll('.video-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };
        
        createDots();
        updateCarousel();
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
        
        window.addEventListener('resize', () => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease-in-out';
            });
        });
    };

    // ======================
    // Image Carousel (Auto-Rotation)
    // ======================
    const initImageCarousel = () => {
        const slides = document.querySelector('.image-slides');
        const slideItems = document.querySelectorAll('.image-slide');
        const prevBtn = document.querySelector('.image-prev-btn');
        const nextBtn = document.querySelector('.image-next-btn');
        const dotsContainer = document.querySelector('.image-dots');
        
        if (!slides || slideItems.length === 0) return;
        
        let currentIndex = 0;
        const slideCount = slideItems.length;
        let slideInterval;
        
        const createDots = () => {
            slideItems.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('image-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        };
        
        const updateCarousel = () => {
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            document.querySelectorAll('.image-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };
        
        const startAutoSlide = () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000);
        };
        
        createDots();
        updateCarousel();
        startAutoSlide();
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
            resetAutoSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
            resetAutoSlide();
        });
        
        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            startAutoSlide();
        };
        
        const carousel = document.querySelector('.image-carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
        
        window.addEventListener('resize', () => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease-in-out';
            });
        });
    };

    // ======================
    // Testimonial Slider (Auto-Rotation)
    // ======================
    const initTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;
        
        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            testimonials.forEach(t => t.classList.remove('active'));
            testimonials[index].classList.add('active');
        };
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    };

    // ======================
    // Smooth Scrolling
    // ======================
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Initialize all components
    initVideoCarousel();
    initImageCarousel();
    initTestimonialSlider();
    initSmoothScrolling();
});

// ======================
// Mobile Menu Toggle
// ======================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});
