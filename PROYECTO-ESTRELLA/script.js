// const supabaseUrl = 'https://ruwtsbccogrcuhnegarx.supabase.co'; // Ya no es necesario si los mensajes son locales
// const supabaseKey = 'sb_publishable__e1jlN-DPxv6hUxEzatbKw_hMZ2ZjTo';
// const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Lista de mensajes para San Valentín que flotarán al hacer clic
const messages = [
    "¡Eres mi universo entero! 💖",
    "Cada día a tu lado es un regalo.",
    "Eres mi paz, mi fuerza, mi todo.",
    "Contigo lo es todo, mi amor eterno.",
    "Te quiero sin fin, eres lo que soñé.",
    "Mi galaxia entera gira alrededor de ti.",
    "Siempre tú, hoy y siempre.",
    "¡Eres la razón de mi sonrisa!",
    "En este San Valentín y en todos los que vengan, siempre tú.",
    "¡Puedes con todo! Eres la más valiente.",
    "Juntos siempre, en cada estrella.",
    "Itachi te cuida desde las sombras, yo desde aquí.",
    "Tony Montana dice: The World is Yours, pero mi mundo eres tú.",
    "Snoopy te envía calma y buenas vibras.",
    "Kuromi te da esa energía para brillar más fuerte.",
    "Tus ojos son zafiros deslumbrantes."
];

let currentMessageIndex = 0;

// Función para mostrar un mensaje flotante al hacer clic
function showFloatingMessage(event) {
    const messagesContainer = document.getElementById('messages-container');
    const newMessage = document.createElement('div');
    newMessage.className = 'floating-message';
    newMessage.innerText = messages[currentMessageIndex];

    // Posición aleatoria cerca del clic para que no salgan todos en el mismo sitio
    const x = event.clientX + (Math.random() * 100 - 50); // Variación de +/- 50px
    const y = event.clientY + (Math.random() * 100 - 50);
    newMessage.style.left = `${x}px`;
    newMessage.style.top = `${y}px`;

    messagesContainer.appendChild(newMessage);

    // Avanzar al siguiente mensaje o reiniciar la lista
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;

    // Remover el mensaje después de que su animación de desvanecimiento termine
    newMessage.addEventListener('animationend', () => {
        if (newMessage.style.opacity === '0') { // Solo remover cuando ya no sea visible
            newMessage.remove();
        }
    });
}

// Función para reproducir audios
function playAudio(url) {
    if(!url || url.includes('URL_')) {
        alert("¡Recuerda pegar el link del audio aquí!"); // Mensaje recordatorio
        return;
    }
    const audio = new Audio(url);
    audio.volume = 0.6; // Volumen amable para la clínica
    audio.play().catch(e => console.error("Error al reproducir audio:", e));
}

// Asignar el evento click a cada personaje flotante
document.querySelectorAll('.character-item').forEach(item => {
    item.addEventListener('click', showFloatingMessage);
});

// // Si quieres volver a usar Supabase para mensajes, descomenta y adapta esta función:
// async function cargarMensajesDesdeSupabase() {
//     const { data, error } = await _supabase
//         .from('frases') // Tu tabla de frases
//         .select('texto');
//     if (data) {
//         messages.push(...data.map(item => item.texto