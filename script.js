// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth follow for main cursor
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Slower follow for cursor follower
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .word-item, .feature-card, .pricing-card, .how-step');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
});

// ============================================
// PARTICLE SYSTEM
// ============================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        // ~30% of particles are orange accent
        this.isAccent = Math.random() < 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Fade in/out
        this.opacity += this.fadeDirection * 0.005;
        if (this.opacity >= 0.6) this.fadeDirection = -1;
        if (this.opacity <= 0.1) this.fadeDirection = 1;

        // Reset if off screen
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isAccent
            ? `rgba(240, 140, 46, ${this.opacity})`
            : `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// Connect nearby particles
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.15;
                const useAccent = particles[i].isAccent || particles[j].isAccent;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = useAccent
                    ? `rgba(240, 140, 46, ${opacity})`
                    : `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// GSAP ANIMATIONS
// ============================================

// Progress bar
gsap.to('.progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// Nav animation on load
gsap.to('.nav-logo', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
    ease: 'expo.out'
});

gsap.to('.nav-links', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.7,
    ease: 'expo.out'
});

// ============================================
// HERO SECTION ANIMATIONS
// ============================================
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
    .to('.symbol-icon', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'expo.out'
    })
    .to('.title-word', {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out'
    }, '-=1')
    .to('.hero-line', {
        width: '150px',
        duration: 1,
        ease: 'expo.inOut'
    }, '-=0.5')
    .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out'
    }, '-=0.5')
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.3')
    .to('.section-hero .hero-trust', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.4')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        ease: 'expo.out'
    }, '-=0.5');

// Hero parallax on scroll
gsap.to('.hero-content', {
    y: -100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

gsap.to('.scroll-indicator', {
    opacity: 0,
    scrollTrigger: {
        trigger: '.section-hero',
        start: '20% top',
        end: '40% top',
        scrub: true
    }
});

// ============================================
// HOW IT WORKS SECTION
// ============================================
const howTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-how',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

howTl
    .to('.section-how .section-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    })
    .to('.section-how .section-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.4')
    .to('.how-step', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out'
    }, '-=0.3');

// ============================================
// FEATURES SECTION
// ============================================
const featuresTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-features',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

featuresTl
    .to('.section-features .section-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    })
    .to('.section-features .section-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.4')
    .to('.feature-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out'
    }, '-=0.3');

// ============================================
// WORDS SECTION
// ============================================
const wordItems = document.querySelectorAll('.word-item');

wordItems.forEach((word, index) => {
    gsap.to(word, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: word,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
    });

    // Parallax effect based on data-speed
    const speed = word.dataset.speed || 0.5;
    gsap.to(word, {
        y: -50 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: '.section-words',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// ============================================
// PROMISE SECTION
// ============================================
const promiseTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-promise',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

promiseTl
    .to('.promise-brackets', {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'expo.out'
    })
    .to('.promise-line', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out'
    }, '-=0.4');

// ============================================
// PRICING SECTION
// ============================================
const pricingTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-pricing',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

pricingTl
    .to('.section-pricing .section-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    })
    .to('.section-pricing .section-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.4')
    .to('.pricing-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.4')
    .to('.pricing-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out'
    }, '-=0.3')
    .to('.pricing-footnote', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.3');

// ============================================
// FINAL CTA SECTION
// ============================================
const finalCtaTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-final-cta',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

finalCtaTl
    .to('.final-cta-content .section-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    })
    .to('.final-cta-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.4')
    .to('.final-cta-text', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.3')
    .to('.final-cta-content .btn-primary', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.3')
    .to('.final-cta-content .hero-trust', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
    }, '-=0.3');

// ============================================
// FOOTER SECTION
// ============================================
gsap.to('.footer-content', {
    opacity: 1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.section-footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// ============================================
// SMOOTH REVEAL ON SCROLL (section counters)
// ============================================
document.querySelectorAll('.section-counter').forEach(counter => {
    gsap.fromTo(counter,
        { opacity: 0, x: 20 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// ============================================
// TEXT SCRAMBLE EFFECT ON HOVER
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span style="opacity:0.5">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble to tagline on hover
const tagline = document.querySelector('.hero-tagline');
const originalText = tagline.textContent;
const scrambler = new TextScramble(tagline);

tagline.addEventListener('mouseenter', () => {
    scrambler.setText('Sign a contract with yourself. Keep it. Become.');
});

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

console.log('%c⚒ CONSISTENCYFORGE', 'font-size: 24px; font-weight: bold; color: #F08C2E; background: #0D1B2A; padding: 10px 20px;');
console.log('%cForge your word into iron.', 'color: #F08C2E; font-style: italic;');
