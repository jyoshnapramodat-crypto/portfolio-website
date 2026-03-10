/* CUSTOM CURSOR */
const dot = document.getElementById('dot');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; 
    my = e.clientY;
    dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

(function loop() {
    rx += (mx - rx - 16) * 0.13;
    ry += (my - ry - 16) * 0.13;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
})();

// Cursor interaction on hover
document.querySelectorAll('a, button, .lead-card, .skill-cat, .stat-card, .c-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

/* NAVIGATION LOGIC */
const nav = document.getElementById('nav');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

window.addEventListener('scroll', () => {
    // Add background to nav on scroll
    nav.classList.toggle('stuck', window.scrollY > 70);
    
    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

/* REVEAL ANIMATIONS */
const observerOptions = { threshold: 0.12 };
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('on');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* SPARKLE TRAIL */
document.addEventListener('mousemove', e => {
    if (Math.random() > 0.7) {
        const sparkle = document.createElement('span');
        const icons = ['✿', '✦', '❋', '❀', '✨', '🌸'];
        sparkle.textContent = icons[Math.floor(Math.random() * icons.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: ${10 + Math.random() * 12}px;
            pointer-events: none;
            z-index: 8000;
            transform: translate(-50%, -50%);
            animation: fadeTrail 0.8s ease forwards;
            color: #ff85a1;
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
});