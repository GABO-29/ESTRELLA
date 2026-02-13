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
        muro.innerHTML = ''; 
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = "fade-in-item";
            div.innerHTML = `<p class="scarface-style">"${item.texto}"</p>`;
            muro.appendChild(div);
        });
        document.getElementById('loader-text').innerText = "Tu galaxia está lista ✨";
    }
}

function playAudio(url) {
    if(url.includes('URL_')) return;
    const audio = new Audio(url);
    audio.volume = 0.5; // Muy importante para la clínica
    audio.play();
}

cargarFrases();