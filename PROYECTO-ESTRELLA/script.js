const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateGalaxy() {
    ctx.fillStyle = '#020205';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
    });
    requestAnimationFrame(animateGalaxy);
}
animateGalaxy();

// LÓGICA DE ARRASTRE MEJORADA
let activeItem = null;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let isDragging = false;

function startDrag(e) {
    isDragging = false;
    const target = e.target.closest('.draggable');
    if (!target) return;

    // Obtener transform actual si ya se movió
    const style = window.getComputedStyle(target);
    const matrix = new WebKitCSSMatrix(style.transform);
    xOffset = matrix.m41;
    yOffset = matrix.m42;

    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    
    activeItem = target;
}

function drag(e) {
    if (activeItem) {
        e.preventDefault();
        isDragging = true;
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        activeItem.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
}

function endDrag() {
    activeItem = null;
}

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);

function openMagicNote(e, text, icon) {
    if (isDragging) return; // Si se estaba moviendo, no abre la nota
    e.stopPropagation();
    const container = document.getElementById('messages-container');
    container.innerHTML = ''; 
    const note = document.createElement('div');
    note.className = 'magic-note';
    note.innerHTML = `<div class="note-icon text-2xl">${icon}</div><div>${text}</div>`;
    note.style.left = `${Math.min(e.clientX - 100, window.innerWidth - 230)}px`;
    note.style.top = `${Math.max(e.clientY - 150, 10)}px`;
    container.appendChild(note);
}

function closeAllMessages(event) {
    if (!event.target.closest('.magic-note') && !event.target.closest('.old-letter')) {
        document.getElementById('messages-container').innerHTML = '';
    }
}

let heartInterval;
function playScene(videoUrl) {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('scene-video');
    document.getElementById('video-source').src = videoUrl;
    video.load();
    overlay.classList.remove('hidden');
    video.play();
    startHeartRain();
}

function closeVideo() {
    document.getElementById('video-overlay').classList.add('hidden');
    document.getElementById('scene-video').pause();
    stopHeartRain();
}

function startHeartRain() {
    const container = document.getElementById('heart-rain');
    heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const types = ['❤️', '💖', '💝', '🌸', '✨'];
        heart.innerHTML = types[Math.floor(Math.random() * types.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 150);
}

function stopHeartRain() {
    clearInterval(heartInterval);
    document.getElementById('heart-rain').innerHTML = '';
}

function openLetter() { document.getElementById('letter-overlay').classList.remove('hidden'); }
function closeLetter() { document.getElementById('letter-overlay').classList.add('hidden'); }