const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Estrellas
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

// FUNCIÓN PARA ABRIR NOTA MÁGICA
function openMagicNote(e, text, icon) {
    // Evita que el clic se propague al fondo inmediatamente
    e.stopPropagation();
    
    // Cerramos notas anteriores si queremos que solo haya una
    closeAllMessages();

    const container = document.getElementById('messages-container');
    const note = document.createElement('div');
    note.className = 'magic-note';
    
    // Creamos el contenido (Icono + Texto)
    note.innerHTML = `
        <div class="note-icon">${icon}</div>
        <div class="note-text">${text}</div>
    `;
    
    // Posición cerca del clic
    note.style.left = `${e.clientX - 100}px`;
    note.style.top = `${e.clientY - 120}px`;
    
    container.appendChild(note);
}

// FUNCIÓN PARA CERRAR TODO AL TOCAR FUERA
function closeAllMessages(event) {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
}

function playAudio(url) {
    if(!url || url.includes('URL_')) return;
    new Audio(url).play();
}