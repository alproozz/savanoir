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
    const limitNote = document.getElementById('form-limit-note');
    const SUBMIT_LABEL = 'SUBMIT & JADWALKAN &rarr;';
    const WHATSAPP_URL = 'https://wa.me/62895095902557';

    // ---- Batas pengiriman per perangkat (anti-spam) ----
    const FORM_LIMIT = 3;                              // maksimal pengiriman
    const FORM_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;  // dalam 24 jam; isi null untuk batas permanen
    const SUBMISSIONS_KEY = 'savanoir_form_submissions';
    const DEVICE_ID_KEY = 'savanoir_device_id';

    // localStorage bisa diblokir (mode privat tertentu), jadi selalu dibungkus try/catch
    const readSubmissions = () => {
        try {
            const list = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
            if (!Array.isArray(list)) return [];
            if (FORM_LIMIT_WINDOW_MS === null) return list;
            const cutoff = Date.now() - FORM_LIMIT_WINDOW_MS;
            return list.filter(t => typeof t === 'number' && t > cutoff);
        } catch (e) {
            return [];
        }
    };

    const writeSubmissions = list => {
        try { localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list)); } catch (e) {}
    };

    const recordSubmission = () => {
        const list = readSubmissions();
        list.push(Date.now());
        writeSubmissions(list);
    };

    // Dipakai saat server menolak karena batas: tandai perangkat ini sudah penuh
    const markLimitReached = () => {
        const list = readSubmissions();
        while (list.length < FORM_LIMIT) list.push(Date.now());
        writeSubmissions(list);
    };

    const isLimited = () => readSubmissions().length >= FORM_LIMIT;

    // ID acak per perangkat, dikirim ke Apps Script agar batas juga bisa dicek di server
    const getDeviceId = () => {
        try {
            let id = localStorage.getItem(DEVICE_ID_KEY);
            if (!id) {
                id = (window.crypto && crypto.randomUUID)
                    ? crypto.randomUUID()
                    : Date.now().toString(36) + Math.random().toString(36).slice(2);
                localStorage.setItem(DEVICE_ID_KEY, id);
            }
            return id;
        } catch (e) {
            return '';
        }
    };

    const applyLimitState = () => {
        submitBtn.disabled = true;
        submitBtn.textContent = 'BATAS PENGIRIMAN TERCAPAI';
        if (!limitNote) return;

        let resetText = '';
        const list = readSubmissions();
        if (FORM_LIMIT_WINDOW_MS !== null && list.length) {
            const resetAt = new Date(Math.min(...list) + FORM_LIMIT_WINDOW_MS);
            resetText = ' Form dapat digunakan lagi pada ' + resetAt.toLocaleString('id-ID', {
                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
            }) + '.';
        }
        limitNote.innerHTML = 'Anda sudah mengirim ' + FORM_LIMIT + ' pesan dari perangkat ini.' + resetText +
            ' Butuh respons cepat? <a href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer">Hubungi kami via WhatsApp &#8599;</a>';
        limitNote.hidden = false;
    };

    const resetSubmitButton = () => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = SUBMIT_LABEL;
    };

    if (form && submitBtn) {
        // Cek saat halaman dibuka: kalau batas sudah tercapai, form langsung dikunci
        if (isLimited()) applyLimitState();

        form.addEventListener('submit', e => {
            e.preventDefault();

            if (isLimited()) {
                applyLimitState();
                showToast('Batas pengiriman dari perangkat ini sudah tercapai.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = 'MENGIRIM...';

            const formData = new FormData(form);
            const now = new Date();
            formData.append('Timestamp', now.toLocaleString('id-ID')); // Waktu lokal pengunjung
            formData.append('DeviceId', getDeviceId());

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            // Apps Script boleh membalas JSON {result: 'limited'}; balasan lain dianggap sukses
            .then(response => response.json().catch(() => null))
            .then(data => {
                if (data && data.result === 'limited') {
                    markLimitReached();
                    applyLimitState();
                    showToast('Batas pengiriman dari perangkat ini sudah tercapai.', 'error');
                    return;
                }

                recordSubmission();
                showToast('Terima kasih! Pesan Anda telah terkirim.');
                form.reset();

                if (isLimited()) {
                    applyLimitState();
                } else {
                    resetSubmitButton();
                }
            })
            .catch(() => {
                // Gagal kirim tidak dihitung sebagai pengiriman
                showToast('Terjadi kesalahan, silakan coba lagi.', 'error');
                resetSubmitButton();
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

// Testimonial Marquee: gandakan kartu agar loop berjalan mulus.
// Animasi CSS bergeser -50%, jadi isi track = 2 salinan identik.
// Tiap salinan berisi set asli x2 supaya cukup lebar untuk layar besar.
document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.testi-track').forEach(track => {
        const originals = Array.from(track.children);
        for (let i = 0; i < 3; i++) {
            originals.forEach(card => {
                const clone = card.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
        }
    });
});

// Package Rows Accordion (klik baris untuk lihat detail paket)
document.addEventListener("DOMContentLoaded", () => {
    const pkgRows = document.querySelectorAll('.pkg-row');
    pkgRows.forEach(row => {
        const summary = row.querySelector('.pkg-summary');
        if (summary) {
            summary.addEventListener('click', () => {
                const isOpen = row.classList.contains('open');

                // Close all others
                pkgRows.forEach(other => {
                    other.classList.remove('open');
                    const otherSummary = other.querySelector('.pkg-summary');
                    if (otherSummary) otherSummary.setAttribute('aria-expanded', 'false');
                });

                // Toggle current
                if (!isOpen) {
                    row.classList.add('open');
                    summary.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
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

// =====================================================
// Noir Halftone Reveal (WebGL2, ditulis khusus untuk Savanoir)
// Foto section Noir dicetak sebagai titik halftone di atas latar hitam.
// Di sekitar kursor titik membesar dan berubah jadi foto asli, lalu
// perlahan kembali jadi titik. Klik / tap memunculkan gelombang.
// Jika WebGL2 tidak tersedia, gambar <img> biasa tetap tampil.
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.section-4-image-container');
    const img = container && container.querySelector('.section-4-image');
    if (!container || !img) return;

    const CONFIG = {
        cellSize: 7,               // jarak antar titik (px)
        cellSizeMobile: 5,         // jarak antar titik di layar < 768px
        angle: 45,                 // kemiringan grid titik (derajat)
        dotScale: 0.95,            // ukuran titik; > 1 makin rapat
        contrast: 1.15,            // kontras foto sebelum dicetak
        paper: [0.02, 0.02, 0.02], // warna latar di antara titik (RGB 0-1)
        revealRadius: 150,         // radius area foto asli di sekitar kursor (px)
        softness: 0.55,            // kelembutan tepi area reveal (0-1)
        linger: 1.2,               // detik jejak kursor bertahan sebelum kembali jadi titik
        introSeconds: 1.6          // durasi titik "tumbuh" saat section pertama terlihat
    };
    const TRAIL = 48;              // jumlah titik jejak kursor yang dikirim ke shader
    const MAX_BURSTS = 3;
    const BURST_SECONDS = 1.4;

    const canvas = document.createElement('canvas');
    canvas.className = 'noir-halftone-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const gl = canvas.getContext('webgl2', {
        alpha: false, antialias: false, depth: false, stencil: false
    });
    if (!gl) return;

    const VERT = [
        '#version 300 es',
        'in vec2 aPos;',
        'void main() { gl_Position = vec4(aPos, 0.0, 1.0); }'
    ].join('\n');

    const FRAG = [
        '#version 300 es',
        'precision highp float;',
        '#define TRAIL ' + TRAIL,
        '#define BURSTS ' + MAX_BURSTS,
        'uniform sampler2D uImage;',
        'uniform vec2 uRes;',          // ukuran canvas (px perangkat)
        'uniform vec2 uView;',         // ukuran container (px CSS)
        'uniform vec4 uFrame;',        // posisi & ukuran foto (object-fit: cover)
        'uniform float uCellLod;',
        'uniform float uPhotoLod;',
        'uniform float uCell;',
        'uniform float uAngle;',
        'uniform float uDotScale;',
        'uniform float uContrast;',
        'uniform vec3 uPaper;',
        'uniform float uIntro;',
        'uniform vec3 uTrail[TRAIL];', // x, y, kekuatan
        'uniform float uRadius;',
        'uniform float uSoft;',
        'uniform vec4 uBursts[BURSTS];', // x, y, radius gelombang, kekuatan
        'uniform float uBurstWidth;',
        'out vec4 fragColor;',
        '',
        'vec2 toUv(vec2 p) { return clamp((p - uFrame.xy) / uFrame.zw, 0.0, 1.0); }',
        'float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453); }',
        '',
        'void main() {',
        '    vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) * (uView / uRes);',
        '',
        // Grid titik yang diputar
        '    float c = cos(uAngle);',
        '    float s = sin(uAngle);',
        '    mat2 R = mat2(c, s, -s, c);',
        '    vec2 q = R * p / uCell;',
        '    vec2 id = floor(q);',
        '    vec2 f = q - id - 0.5;',
        '    vec2 center = transpose(R) * ((id + 0.5) * uCell);',
        '',
        // Warna rata-rata foto di sel ini; makin terang = titik makin besar
        '    vec3 cellColor = textureLod(uImage, toUv(center), uCellLod).rgb;',
        '    float peak = max(cellColor.r, max(cellColor.g, cellColor.b));',
        '    float bright = clamp((peak - 0.5) * uContrast + 0.5, 0.0, 1.0);',
        '    vec3 ink = min(cellColor / max(peak, 0.04), vec3(1.0));',
        '',
        // Intro: titik tumbuh dari tengah ke luar
        '    vec2 fromMid = (center - uView * 0.5) / max(uView.x, uView.y);',
        '    float delay = length(fromMid) * 0.9 + rand(id) * 0.15;',
        '    float grow = clamp((uIntro * 1.6 - delay) / 0.5, 0.0, 1.0);',
        '    grow = grow * grow * (3.0 - 2.0 * grow);',
        '    float radius = sqrt(bright / 3.14159) * uDotScale * grow;',
        '',
        // Area reveal: jejak kursor + gelombang klik
        '    float shown = 0.0;',
        '    float inner = uRadius * (1.0 - uSoft);',
        '    for (int i = 0; i < TRAIL; i++) {',
        '        vec3 t = uTrail[i];',
        '        if (t.z <= 0.0) continue;',
        '        float k = 1.0 - smoothstep(inner, uRadius, distance(p, t.xy));',
        '        shown = max(shown, k * t.z);',
        '    }',
        '    for (int i = 0; i < BURSTS; i++) {',
        '        vec4 b = uBursts[i];',
        '        if (b.w <= 0.0) continue;',
        '        float ring = distance(p, b.xy) - b.z;',
        '        float k = ring > 0.0 ? 1.0 - ring / (uBurstWidth * 0.3) : 1.0 + ring / uBurstWidth;',
        '        shown = max(shown, clamp(k, 0.0, 1.0) * b.w);',
        '    }',
        '    shown = shown * shown * (3.0 - 2.0 * shown);',
        '',
        // Titik membesar sampai menutup sel, isinya berubah jadi foto asli
        '    float d = length(f);',
        '    float aa = fwidth(d) * 0.8 + 0.0001;',
        '    float r = mix(radius, 0.75, shown);',
        '    float dotMask = (1.0 - smoothstep(r - aa, r + aa, d)) * clamp(r / (aa * 2.0), 0.0, 1.0);',
        '    vec3 photo = textureLod(uImage, toUv(p), uPhotoLod).rgb;',
        '    vec3 dotColor = mix(ink, photo, shown);',
        '    fragColor = vec4(mix(uPaper, dotColor, dotMask), 1.0);',
        '}'
    ].join('\n');

    const compile = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
        console.warn('Noir halftone shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, 'aPos');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const u = {};
    ['uImage', 'uRes', 'uView', 'uFrame', 'uCellLod', 'uPhotoLod', 'uCell', 'uAngle',
        'uDotScale', 'uContrast', 'uPaper', 'uIntro', 'uTrail', 'uRadius', 'uSoft',
        'uBursts', 'uBurstWidth'].forEach(name => { u[name] = gl.getUniformLocation(program, name); });

    // Satu segitiga besar yang menutupi seluruh canvas
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const texture = gl.createTexture();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { w: 1, h: 1, dpr: 1, ready: false, visible: false, introStart: null };
    const pointer = { x: 0, y: 0, inside: false };
    const brush = { x: 0, y: 0, fresh: true };
    const trail = [];
    const bursts = [];
    const trailData = new Float32Array(TRAIL * 3);
    const burstData = new Float32Array(MAX_BURSTS * 4);
    let presence = 0;
    let raf = 0;
    let lastTime = 0;

    const frameRect = () => {
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(state.w / iw, state.h / ih);
        const fw = iw * scale;
        const fh = ih * scale;
        // Sama seperti CSS gambar: object-fit cover, object-position bottom
        return [(state.w - fw) / 2, state.h - fh, fw, fh];
    };

    const draw = intro => {
        const [fx, fy, fw, fh] = frameRect();
        const texelsPerPx = img.naturalWidth / fw;
        const cell = window.innerWidth < 768 ? CONFIG.cellSizeMobile : CONFIG.cellSize;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(u.uImage, 0);
        gl.uniform2f(u.uRes, canvas.width, canvas.height);
        gl.uniform2f(u.uView, state.w, state.h);
        gl.uniform4f(u.uFrame, fx, fy, fw, fh);
        gl.uniform1f(u.uCellLod, Math.log2(Math.max(cell * texelsPerPx, 1)));
        gl.uniform1f(u.uPhotoLod, Math.log2(Math.max(texelsPerPx / state.dpr, 1)));
        gl.uniform1f(u.uCell, cell);
        gl.uniform1f(u.uAngle, (CONFIG.angle * Math.PI) / 180);
        gl.uniform1f(u.uDotScale, CONFIG.dotScale);
        gl.uniform1f(u.uContrast, CONFIG.contrast);
        gl.uniform3fv(u.uPaper, CONFIG.paper);
        gl.uniform1f(u.uIntro, intro);
        gl.uniform3fv(u.uTrail, trailData);
        gl.uniform1f(u.uRadius, CONFIG.revealRadius);
        gl.uniform1f(u.uSoft, CONFIG.softness);
        gl.uniform4fv(u.uBursts, burstData);
        gl.uniform1f(u.uBurstWidth, Math.max(80, CONFIG.revealRadius));
        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.bindVertexArray(null);
    };

    const introProgress = now => {
        if (reduceMotion) return 1;
        if (state.introStart === null) return 0;
        const t = Math.min(1, (now - state.introStart) / 1000 / CONFIG.introSeconds);
        return 1 - (1 - t) * (1 - t);
    };

    const frame = now => {
        raf = 0;
        if (!state.ready) return;
        if (state.visible && state.introStart === null) state.introStart = now;

        const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
        lastTime = now;

        // Kekuatan reveal di posisi kursor naik/turun dengan halus
        presence += ((pointer.inside ? 1 : 0) - presence) * (1 - Math.exp(-dt / 0.15));

        // "Kuas" mengikuti kursor sedikit tertinggal agar gerakannya lembut
        if (brush.fresh) {
            brush.x = pointer.x;
            brush.y = pointer.y;
            brush.fresh = false;
        } else {
            const follow = 1 - Math.exp(-dt / 0.04);
            brush.x += (pointer.x - brush.x) * follow;
            brush.y += (pointer.y - brush.y) * follow;
        }

        // Jejak kursor: simpan posisi bila kursor bergerak cukup jauh atau cukup lama
        if (pointer.inside) {
            const prev = trail[trail.length - 1];
            if (!prev || now - prev.t > 60 ||
                Math.hypot(brush.x - prev.x, brush.y - prev.y) > CONFIG.revealRadius * 0.2) {
                trail.push({ x: brush.x, y: brush.y, t: now });
                if (trail.length > TRAIL - 1) trail.shift();
            }
        }
        while (trail.length && (now - trail[0].t) / 1000 > CONFIG.linger) trail.shift();

        trailData.fill(0);
        trailData[0] = brush.x;
        trailData[1] = brush.y;
        trailData[2] = presence;
        trail.forEach((pt, i) => {
            // Jejak tetap kuat di awal, lalu memudar cepat menjelang habis
            const age = Math.min(1, (now - pt.t) / 1000 / CONFIG.linger);
            trailData[(i + 1) * 3] = pt.x;
            trailData[(i + 1) * 3 + 1] = pt.y;
            trailData[(i + 1) * 3 + 2] = 1 - age * age;
        });

        // Gelombang klik
        for (let i = bursts.length - 1; i >= 0; i--) {
            if ((now - bursts[i].start) / 1000 > BURST_SECONDS) bursts.splice(i, 1);
        }
        burstData.fill(0);
        bursts.forEach((b, i) => {
            const k = (now - b.start) / 1000 / BURST_SECONDS;
            const far = Math.hypot(Math.max(b.x, state.w - b.x), Math.max(b.y, state.h - b.y)) + 80;
            burstData[i * 4] = b.x;
            burstData[i * 4 + 1] = b.y;
            burstData[i * 4 + 2] = far * (1 - Math.pow(1 - k, 3));
            burstData[i * 4 + 3] = 1 - k * k;
        });

        const intro = introProgress(now);
        draw(intro);

        // Loop hanya berjalan saat ada yang bergerak, supaya hemat baterai
        const busy = pointer.inside || presence > 0.01 || trail.length > 0 ||
            bursts.length > 0 || intro < 1;
        if (busy && state.visible) raf = requestAnimationFrame(frame);
        else lastTime = 0;
    };

    const wake = () => {
        if (!raf && state.ready) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
        state.w = Math.max(1, container.clientWidth);
        state.h = Math.max(1, container.clientHeight);
        state.dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(state.w * state.dpr));
        canvas.height = Math.max(1, Math.round(state.h * state.dpr));
        if (state.ready) {
            draw(introProgress(performance.now()));
            wake();
        }
    };

    const start = () => {
        try {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        } catch (e) {
            // Mis. dibuka lewat file:// (gambar dianggap beda origin): tetap pakai <img> biasa
            return;
        }
        container.appendChild(canvas);
        state.ready = true;
        resize();
        container.classList.add('is-halftone');

        new ResizeObserver(resize).observe(container);
        new IntersectionObserver(entries => {
            state.visible = entries.some(entry => entry.isIntersecting);
            if (state.visible) wake();
        }, { threshold: 0.25 }).observe(container);
    };

    // Interaksi kursor / sentuhan
    const locate = event => {
        const rect = container.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
    };
    const onMove = event => {
        locate(event);
        if (!pointer.inside) {
            pointer.inside = true;
            brush.fresh = true;
        }
        wake();
    };
    const onLeave = () => {
        pointer.inside = false;
        wake();
    };
    container.addEventListener('pointerenter', onMove, { passive: true });
    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener('pointerleave', onLeave, { passive: true });
    container.addEventListener('pointercancel', onLeave, { passive: true });
    container.addEventListener('pointerdown', event => {
        locate(event);
        if (reduceMotion || (event.pointerType === 'mouse' && event.button !== 0)) return;
        bursts.push({ x: pointer.x, y: pointer.y, start: performance.now() });
        if (bursts.length > MAX_BURSTS) bursts.shift();
        wake();
    }, { passive: true });

    canvas.addEventListener('webglcontextlost', () => {
        state.ready = false;
        container.classList.remove('is-halftone');
    });

    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });
});
