const supabaseUrl = 'https://ruwtsbccogrcuhnegarx.supabase.co';
const supabaseKey = 'sb_publishable__e1jlN-DPxv6hUxEzatbKw_hMZ2ZjTo';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function cargarFrases() {
    const { data, error } = await _supabase
        .from('frases')
        .select('*')
        .order('created_at', { ascending: false });

    if (data) {
        const muro = document.getElementById('muro');
        muro.innerHTML = ''; // Limpiar
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = "py-6 border-b border-white/5 animate-fade-in";
            div.innerHTML = `<p class="scarface-style">"${item.texto}"</p>`;
            muro.appendChild(div);
        });
    }
}

function playAudio(url) {
    if(url.includes('URL_')) return alert("¡Te falta subir el audio a Supabase y pegar el link!");
    const audio = new Audio(url);
    audio.volume = 0.6;
    audio.play();
}

cargarFrases();