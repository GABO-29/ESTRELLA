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
            const p = document.createElement('p');
            p.className = "scarface-style animate-pulse";
            p.innerText = `"${item.texto}"`;
            muro.appendChild(p);
        });
    }
}

function playAudio(url) {
    if(!url || url.includes('PON_AQUI')) return;
    const audio = new Audio(url);
    audio.volume = 0.6;
    audio.play();
}

cargarFrases();