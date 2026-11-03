document.addEventListener("DOMContentLoaded", () => {
    // Wait for flicker animation to finish (around 2s)
    setTimeout(() => {
        document.getElementById('loading-overlay').style.display = 'none';

        const word1 = document.getElementById('word-1');
        const word2 = document.getElementById('word-2');
        const word3 = document.getElementById('word-3');
        const slogan = document.getElementById('main-slogan');
        const introContainer = document.getElementById('intro-container');
        const mainContent = document.getElementById('main-content');

        // Helper function for animation
        const animateElement = (element, delayIn, delayOut) => {
            setTimeout(() => {
                element.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }, delayIn);

            if (delayOut) {
                setTimeout(() => {
                    element.style.opacity = "0";
                    element.style.transform = "translateY(-30px)";
                }, delayOut);
            }
        };

        // Sequence:
        // sleep,
        animateElement(word1, 500, 2000);
        // smart,
        animateElement(word2, 2500, 4000);
        // naturally,
        animateElement(word3, 4500, 6000);

        // Feel Better Ur Brand With Us
        animateElement(slogan, 6500, null);

        // After slogan shows up, reveal main content and navbar
        setTimeout(() => {
            introContainer.style.transition = "opacity 1s ease";
            introContainer.style.opacity = "0";

            setTimeout(() => {
                introContainer.style.display = "none";
                mainContent.classList.remove('hidden');

                // Trigger reflow to apply transition
                void mainContent.offsetWidth;

                mainContent.classList.add('visible');
                document.body.style.overflow = "auto";

                // Fade up effect for Welcome To Savanoir
                const heroTitle = document.querySelector('.hero h1');
                if (heroTitle) {
                    const originalText = heroTitle.innerText;
                    fadeUpTextLetterByLetter(heroTitle, originalText, 80);
                }

                // Add Scroll Listener for Hero Section Scale-down Effect
                const heroSection = document.querySelector('.hero');
                const heroImage = document.querySelector('.hero-image');
                const navbar = document.querySelector('.navbar');

                mainContent.addEventListener('scroll', () => {
                    const scrollTop = mainContent.scrollTop;
                    const maxScroll = window.innerHeight * 0.8; // Trigger over 80% of viewport height

                    // Show navbar when scrolling down (e.g. past 50% of the viewport to match section 2 appearance)
                    if (scrollTop > window.innerHeight * 0.5) {
                        navbar.classList.add('show-on-scroll');
                    } else {
                        navbar.classList.remove('show-on-scroll');
                    }

                    if (scrollTop <= maxScroll) {
                        const progress = scrollTop / maxScroll;

                        // Scale from 1 up to 1.15 (Zoom In effect)
                        const scale = 1 + (0.15 * progress);

                        // Border radius from 0 to 50px
                        const radius = 50 * progress;

                        // Image Border radius from 0 to 20px
                        const imageRadius = 20 * progress;

                        // Slight opacity fade out
                        const opacity = 1 - (0.3 * progress);

                        heroSection.style.transform = `scale(${scale})`;
                        heroSection.style.borderRadius = `0 0 ${radius}px ${radius}px`;
                        heroSection.style.opacity = opacity;

                        if (heroImage) {
                            heroImage.style.borderRadius = `${imageRadius}px`;
                        }
                    }
                });

                // Parallax for Section 3 Images
                const brandingSection = document.getElementById('branding');
                const brandImages = document.querySelectorAll('.brand-img');
                
                // Parallax for Section 5 Images
                const section5 = document.getElementById('visual-thinkers');
                const sec5Images = document.querySelectorAll('.sec5-img');
                
                mainContent.addEventListener('scroll', () => {
                    const brandingRect = brandingSection.getBoundingClientRect();
                    // Check if branding section is in view
                    if (brandingRect.top < window.innerHeight && brandingRect.bottom > 0) {
                        // Offset is 0 when the section is at the top of the viewport (brandingRect.top === 0)
                        const scrollOffset = -brandingRect.top;
                        brandImages.forEach(img => {
                            const speed = parseFloat(img.getAttribute('data-speed'));
                            const yPos = -(scrollOffset * speed);
                            img.style.transform = `translateY(${yPos}px)`;
                        });
                    }

                    if (section5) {
                        const sec5Rect = section5.getBoundingClientRect();
                        if (sec5Rect.top < window.innerHeight && sec5Rect.bottom > 0) {
                            // Offset is 0 when the section is at the top of the viewport
                            // When scrolling down past the section, offset increases
                            // When scrolling up to the section (before it hits top), offset is negative (images move down slightly)
                            const scrollOffsetSec5 = -sec5Rect.top;
                            sec5Images.forEach(img => {
                                const speed = parseFloat(img.getAttribute('data-speed'));
                                const yPos = -(scrollOffsetSec5 * speed);
                                img.style.transform = `translateY(${yPos}px)`;
                            });
                        }
                    }
                });

                // 3D Card Tilt Animation for Section 2
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        const rotateX = ((y - centerY) / centerY) * -20; // Max tilt 10 degrees
                        const rotateY = ((x - centerX) / centerX) * 20;

                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
                        card.style.transition = 'transform 0.1s ease-out';
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
                        card.style.transition = 'transform 0.5s ease-out';
                    });
                });

                // --- Slat Transition & Final Section Animation ---
                const finalSection = document.getElementById('final-section');
                const slatOverlay = document.querySelector('.slat-transition-overlay');
                const slatBars = document.querySelectorAll('.slat-bar');
                const finalContent = document.querySelector('.final-content');
                let hasAnimatedSlats = false;

                if (finalSection && slatOverlay && slatBars.length > 0) {
                    const finalObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !hasAnimatedSlats) {
                                hasAnimatedSlats = true;
                                
                                // Pastikan overlay tampil
                                slatOverlay.style.display = 'flex';
                                
                                // Mulai animasi background
                                const bg = document.querySelector('.gradient-reveal-bg');
                                if (bg) bg.classList.add('animate');

                                // Trigger staggered rotation
                                slatBars.forEach((bar, index) => {
                                    setTimeout(() => {
                                        bar.classList.add('flipped');
                                    }, index * 150 + 100); 
                                });
                                
                                // Fade in content after flip finishes
                                setTimeout(() => {
                                    finalContent.classList.add('visible');
                                    
                                    // Remove slats from DOM flow so it doesn't block interactions
                                    setTimeout(() => {
                                        slatOverlay.style.display = 'none';
                                    }, 1000);
                                }, (slatBars.length * 150) + 600); 
                            }
                        });
                    }, { threshold: 0.4 });
                    
                    finalObserver.observe(finalSection);
                }

            }, 1000);
        }, 9500);

    }, 2000); // 2s initial delay corresponding to the flicker overlay
});

function fadeUpTextLetterByLetter(element, finalText, staggerDelay = 50) {
    element.innerHTML = "";
    const letters = finalText.split("");

    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        if (letter === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.innerText = letter;
        }

        // Make the word "Savanoir" blood red for contrast (index 11 and onwards in "Welcome To Savanoir")
        if (index >= 11) {
            span.style.color = "#ff0032";
            span.style.textShadow = "0 0 15px rgba(255, 0, 50, 0.6)";
        }
        
        // Initial state mimicking the intro words
        span.style.opacity = "0";
        span.style.transform = "translateY(30px)";
        span.style.display = "inline-block";
        span.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";

        if (index === 11) {
            const br = document.createElement('br');
            br.className = 'mobile-br';
            element.appendChild(br);
        }
        element.appendChild(span);

        // Trigger animation with a delay for each letter
        setTimeout(() => {
            span.style.opacity = "1";
            span.style.transform = "translateY(0)";
        }, index * staggerDelay + 100); // add a slight initial delay
    });
}

// Local Time & Location Detection
document.addEventListener("DOMContentLoaded", () => {
    const localTimeEl = document.getElementById('local-time');
    if (localTimeEl) {
        const updateLocalTime = () => {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            const timeString = now.toLocaleTimeString('en-US', options);
            
            let city = "LOCAL";
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz) {
                    city = tz.split('/').pop().replace(/_/g, ' ').toUpperCase();
                }
            } catch(e) {}
            
            localTimeEl.textContent = `${city} ${timeString}`;
        };
        
        updateLocalTime();
        setInterval(updateLocalTime, 60000); // Update setiap 1 menit
    }
});

// Google Sheets Form Integration
document.addEventListener("DOMContentLoaded", () => {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLoXLvPCFlj8XF8fIEUtIvHRwb0IS7mUOM8rW21C-2pJEgCvICaZ8-x9AhhAL3P4yZ/exec';
    const form = document.getElementById('savanoir-form');
    const submitBtn = document.getElementById('submit-btn');

    if (form && submitBtn) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'MENGIRIM...';

            const formData = new FormData(form);
            const now = new Date();
            formData.append('Timestamp', now.toLocaleString('id-ID')); // Waktu lokal pengunjung

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                showToast('Terima kasih! Pesan Anda telah terkirim.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'SUBMIT & JADWALKAN &rarr;';
            })
            .catch(error => {
                showToast('Terjadi kesalahan, silakan coba lagi.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'SUBMIT & JADWALKAN &rarr;';
            });
        });
    }

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast-notification');
        const toastMsg = document.getElementById('toast-message');
        if (!toast || !toastMsg) return;
        
        toastMsg.textContent = message;
        
        if (type === 'error') {
            toast.classList.add('error');
        } else {
            toast.classList.remove('error');
        }
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    const toastClose = document.getElementById('toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            const toast = document.getElementById('toast-notification');
            if (toast) toast.classList.remove('show');
        });
    }
});

// Portfolio Carousel Navigation (geser kiri/kanan)
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.horizontal-wrapper');
    const prevBtn = document.querySelector('.works-prev');
    const nextBtn = document.querySelector('.works-next');
    const currentEl = document.querySelector('.works-current');
    if (!wrapper || !prevBtn || !nextBtn) return;

    const items = wrapper.querySelectorAll('.portfolio-item');

    const updateNav = () => {
        // Section masih tersembunyi di balik intro
        if (wrapper.clientWidth === 0) return;
        const index = Math.round(wrapper.scrollLeft / wrapper.clientWidth);
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        prevBtn.disabled = wrapper.scrollLeft <= 5;
        nextBtn.disabled = wrapper.scrollLeft >= maxScroll - 5;
        if (currentEl) currentEl.textContent = String(Math.min(index + 1, items.length)).padStart(2, '0');
    };

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -wrapper.clientWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: wrapper.clientWidth, behavior: 'smooth' });
    });

    wrapper.addEventListener('scroll', updateNav, { passive: true });
    new ResizeObserver(updateNav).observe(wrapper);
});

// FAQ Accordion Animation
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const summary = item.querySelector('.faq-summary');
        if (summary) {
            summary.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                // Close all others
                faqItems.forEach(other => other.classList.remove('open'));
                
                // Toggle current
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });
});
