// Configuración de Supabase (Descomenta si vas a usar la base de datos)
const supabaseUrl = 'https://ruwtsbccogrcuhnegarx.supabase.co';
const supabaseKey = 'sb_publishable__e1jlN-DPxv6hUxEzatbKw_hMZ2ZjTo';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

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

// --- FUNCIÓN PARA EL EFECTO DE MENSAJES FLOTANTES ---
function showFloatingMessage(event) {
    const messagesContainer = document.getElementById('messages-container');
    const newMessage = document.createElement('div');
    newMessage.className = 'floating-message';
    newMessage.innerText = messages[currentMessageIndex];

    // Posición basada en el clic con una ligera variación aleatoria
    const x = event.clientX + (Math.random() * 100 - 50); // Variación de +/- 50px
    const y = event.clientY + (Math.random() * 100 - 50);
    newMessage.style.left = `${x}px`;
    newMessage.style.top = `${y}px`;

    messagesContainer.appendChild(newMessage);

    // Avanzar al siguiente mensaje de la lista o reiniciar
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;

    // Remover el elemento del DOM después de que termine la animación de CSS
    newMessage.addEventListener('animationend', () => {
        // La animación dura 4 segundos (según el CSS), luego se limpia
        newMessage.remove();
    });
}

// --- FUNCIÓN PARA REPRODUCIR AUDIOS ---
function playAudio(url) {
    // Validación para no intentar reproducir si el link no está puesto
    if(!url || url.includes('URL_')) {
        console.warn("Falta el link del audio en este botón.");
        return;
    }
    
    const audio = new Audio(url);
    audio.volume = 0.6; // Nivel de volumen adecuado (Modo Tarde)
    
    audio.play().catch(e => {
        console.error("Error al reproducir el audio. Asegúrate de que el link sea correcto:", e);
    });
}

// --- ASIGNACIÓN DE EVENTOS A LOS PERSONAJES ---
// Buscamos todos los personajes con la clase 'character-item' para que reaccionen al clic
document.querySelectorAll('.character-item').forEach(item => {
    item.addEventListener('click', (e) => {
        showFloatingMessage(e);
        
        // Efecto visual extra: pequeño salto al hacer clic
        item.style.transform = "scale(1.4)";
        setTimeout(() => {
            item.style.transform = "";
        }, 200);
    });
});

// --- FUNCIÓN PARA CARGAR FRASES EXTRAS DESDE SUPABASE (OPCIONAL) ---
async function cargarMensajesDesdeSupabase() {
    try {
        const { data, error } = await _supabase
            .from('frases') // Debe coincidir con el nombre de tu tabla en Supabase
            .select('texto');

        if (error) {
            console.error("Error cargando de Supabase:", error);
            return;
        }

        if (data && data.length > 0) {
            // Añadimos las frases de la base de datos al inicio de nuestra lista
            const frasesNuevas = data.map(item => item.texto);
            messages.unshift(...frasesNuevas);
            console.log("Mensajes de Supabase cargados correctamente.");
        }
    } catch (err) {
        console.error("Error de conexión:", err);
    }
}

// Ejecutar la carga de Supabase al iniciar si se desea
// cargarMensajesDesdeSupabase();