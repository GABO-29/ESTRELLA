// Tus credenciales de Supabase
const supabaseUrl = 'https://ruwtsbccogrcuhnegarx.supabase.co';
const supabaseKey = 'sb_publishable__e1jlN-DPxv6hUxEzatbKw_hMZ2ZjTo';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Función para obtener las frases de la tabla
async function cargarFrases() {
    const { data, error } = await _supabase
        .from('frases')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error cargando frases:', error);
        return;
    }

    if (data) {
        const muro = document.getElementById('muro');
        // Limpiamos el muro pero mantenemos el título
        muro.innerHTML = '<h2 class="text-xs font-bold text-gray-600 uppercase tracking-widest border-b border-gray-800 pb-2">Subtítulos para tu día</h2>';
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = "frase-card";
            div.innerHTML = `<p class="scarface-style text-lg italic">"${item.texto}"</p>`;
            muro.appendChild(div);
        });
    }
}

// Función para reproducir los audios
function playAudio(url) {
    if (url === 'URL_DE_TU_AUDIO_SCARFACE' || url === 'URL_DE_TU_AUDIO_VOZ') {
        alert('Oye, te falta pegar el link real de Supabase en el HTML.');
        return;
    }
    const audio = new Audio(url);
    audio.volume = 0.7; // Volumen amable para el hospital
    audio.play().catch(e => console.error("Error al reproducir:", e));
}

// Iniciar carga
cargarFrases();