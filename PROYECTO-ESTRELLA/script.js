const frases = [
    "¡Eres mi universo entero! 💖",
    "Eres mi paz, mi fuerza, mi todo.",
    "Contigo lo es todo, mi amor eterno.",
    "Mi galaxia entera gira alrededor de ti.",
    "¡Puedes con todo! Eres la más valiente.",
    "Itachi te cuida desde las sombras, yo desde aquí.",
    "The World is Yours, pero mi mundo eres tú.",
    "Tus ojos son zafiros deslumbrantes."
];

let index = 0;

function showMessage(e) {
    const container = document.getElementById('messages-container');
    const msg = document.createElement('div');
    msg.className = 'floating-message';
    
    // Aquí combinamos tu saludo con la frase
    msg.innerText = `MONSE MONSE: ${frases[index]}`;

    msg.style.left = `${e.clientX}px`;
    msg.style.top = `${e.clientY}px`;

    container.appendChild(msg);
    index = (index + 1) % frases.length;

    setTimeout(() => msg.remove(), 4000);
}

// Asignar evento a todos los personajes
document.querySelectorAll('.character-item').forEach(char => {
    char.addEventListener('click', showMessage);
});

function playAudio(url) {
    if(!url || url.includes('URL_')) return;
    new Audio(url).play();
}