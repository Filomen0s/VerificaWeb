const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let isAnimating = false;

function goTo(i) {
    if (isAnimating) return;
    const next = (i + slides.length) % slides.length;
    if (next === current) return;

    isAnimating = true;

    // Mark current as leaving
    slides[current].classList.add('leaving');
    dots[current].classList.remove('active');

    // After leave animation, switch
    setTimeout(() => {
        slides[current].classList.remove('active', 'leaving');
        current = next;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        isAnimating = false;
    }, 280);
}

document.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
document.querySelector('.next').addEventListener('click', () => goTo(current + 1));
dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

// Auto-advance
let autoplay = setInterval(() => goTo(current + 1), 4000);
document.querySelector('.carousel-wrap').addEventListener('mouseenter', () => clearInterval(autoplay));
document.querySelector('.carousel-wrap').addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 4000);
});

// CTA button
document.getElementById('apoiar-btn').addEventListener('click', async () => {
    const btn = document.getElementById('apoiar-btn');
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    try {
        const response = await fetch('http://localhost:3000/insert', { method: 'PATCH' });
        const data = await response.json();
        console.log('Novo total:', data.apoio);
    } catch (e) {
        // Server might not be running in preview
    }

    btn.style.display = 'none';
    const msg = document.getElementById('apoiar-msg');
    msg.style.display = 'flex';
    msg.style.animation = 'fadeUp 0.5s ease both';
});
