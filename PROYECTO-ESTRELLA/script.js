const messages = [
    "¡MONSE MONSE! Eres mi universo entero! 💖",
    "¡MONSE MONSE! Cada día a tu lado es un regalo.",
    "¡MONSE MONSE! Eres mi paz, mi fuerza, mi todo.",
    "¡MONSE MONSE! Contigo lo es todo, mi amor eterno.",
    "¡MONSE MONSE! Te quiero sin fin, eres lo que soñé.",
    "¡MONSE MONSE! Mi galaxia entera gira alrededor de ti.",
    "¡MONSE MONSE! Siempre tú, hoy y siempre.",
    "¡MONSE MONSE! ¡Eres la razón de mi sonrisa!",
    "¡MONSE MONSE! ¡Puedes con todo! Eres la más valiente.",
    "¡MONSE MONSE! Itachi te cuida desde las sombras.",
    "¡MONSE MONSE! Tony Montana dice: Mi mundo eres tú.",
    "¡MONSE MONSE! Snoopy te envía calma y buenas vibras.",
    "¡MONSE MONSE! Tus ojos son zafiros deslumbrantes."
];

let currentMessageIndex = 0;

function showFloatingMessage(event) {
    const messagesContainer = document.getElementById('messages-container');
    const newMessage = document.createElement('div');
    newMessage.className = 'floating-message';
    newMessage.innerText = messages[currentMessageIndex];

    const x = event.clientX + (Math.random() * 60 - 30);
    const y = event.clientY + (Math.random() * 60 - 30);
    newMessage.style.left = `${x}px`;
    newMessage.style.top = `${y}px`;

    messagesContainer.appendChild(newMessage);
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;

    newMessage.addEventListener('animationend', () => {
        newMessage.remove();
    });
}

function playAudio(url) {
    if(!url || url.includes('URL_')) return;
    const audio = new Audio(url);
    audio.volume = 0.6;
    audio.play();
}

document.querySelectorAll('.character-item').forEach(item => {
    item.addEventListener('click', showFloatingMessage);
});