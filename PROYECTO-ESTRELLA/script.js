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

function animate() {
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
    requestAnimationFrame(animate);
}
animate();

function openMagicNote(e, text, icon) {
    e.stopPropagation(); // Evita cerrar la nota al momento de abrirla
    
    const container = document.getElementById('messages-container');
    container.innerHTML = ''; // Limpia notas anteriores
    
    const note = document.createElement('div');
    note.className = 'magic-note';
    note.innerHTML = `
        <div class="note-icon">${icon}</div>
        <div class="note-text">${text}</div>
    `;
    
    // Calculamos posición para que no se salga de la pantalla
    let x = e.clientX - 100;
    let y = e.clientY - 150;
    
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    
    container.appendChild(note);
}

function closeAllMessages(event) {
    const container = document.getElementById('messages-container');
    // Solo cerramos si se toca fuera de una nota mágica
    if (!event.target.closest('.magic-note')) {
        container.innerHTML = '';
    }
}

function playAudio(url) {
    if(!url || url.includes('URL_')) return;
    new Audio(url).play();
}