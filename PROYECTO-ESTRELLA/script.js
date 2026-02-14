// Configuración de Supabase
const supabaseUrl = 'https://ruwtsbccogrcuhnegarx.supabase.co';
const supabaseKey = 'sb_publishable__e1jlN-DPxv6hUxEzatbKw_hMZ2ZjTo';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

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

function showFloatingMessage(event) {
    const messagesContainer = document.getElementById('messages-container');
    const newMessage = document.createElement('div');
    newMessage.className = 'floating-message';
    newMessage.innerText = messages[currentMessageIndex];

    // Posición dinámica con un pequeño ajuste para que no tape el cursor
    newMessage.style.left = `${event.clientX - 50}px`;
    newMessage.style.top = `${event.clientY - 50}px`;

    messagesContainer.appendChild(newMessage);
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;

    // Se borra automáticamente después de la animación de 4s
    setTimeout(() => { newMessage.remove(); }, 4000);
}

function playAudio(url) {
    if(!url || url.includes('URL_')) return;
    const audio = new Audio(url);
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Error audio:", e));
}

// Vinculamos el clic a cada personaje de la galaxia
document.querySelectorAll('.character-item').forEach(item => {
    item.addEventListener('click', (e) => {
        showFloatingMessage(e);
    });
});

// Carga de Supabase opcional
async function cargarMensajesDesdeSupabase() {
    const { data } = await _supabase.from('frases').select('texto');
    if (data) {
        const frasesExtra = data.map(i => i.texto);
        messages.unshift(...frasesExtra);
    }
}
// cargarMensajesDesdeSupabase(); // Descomenta si quieres usar tus frases de la tabla