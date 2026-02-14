// Configuración de la Galaxia
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Crear estrellas
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

// Función de Mensajes Emergentes
function popMessage(e, text) {
    const container = document.getElementById('messages-container');
    const msg = document.createElement('div');
    msg.className = 'msg-pop';
    msg.innerText = text;
    
    // Posición donde se hizo clic
    msg.style.left = `${e.clientX}px`;
    msg.style.top = `${e.clientY}px`;
    
    container.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 3000);
}

// Reproducción de Audio
function playAudio(url) {
    if(!url || url.includes('URL_')) return;
    const audio = new Audio(url);
    audio.volume = 0.6; // Modo tarde: volumen suave
    audio.play().catch(error => console.log("Error al reproducir audio:", error));
}