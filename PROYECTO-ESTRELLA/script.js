let scene, camera, renderer, starGroup, characters = [];
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0.002, y: 0.002 };

// 1. CONFIGURACIÓN DE TUS PERSONAJES
const characterData = [
    { url: 'kuromi.png', phrase: 'MONSE MONSE: ¡Energía explosiva! 😈' },
    { url: 'snoopy.png', phrase: 'MONSE MONSE: Calma y amor puro 🐾' },
    { url: 'kuromi.png', phrase: 'MONSE MONSE: ¡Eres mi universo! 💖' }, // Puedes repetir o añadir más
    { url: 'snoopy.png', phrase: 'MONSE MONSE: Todo estará bien ⭐' }
];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container3d').appendChild(renderer.domElement);

    starGroup = new THREE.Group();
    scene.add(starGroup);

    // 2. CREAR ESTRELLAS DE FONDO
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 4000; i++) {
        starVertices.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 });
    starGroup.add(new THREE.Points(starGeometry, starMaterial));

    // 3. CARGAR LAS IMÁGENES QUE SUBISTE
    const loader = new THREE.TextureLoader();
    characterData.forEach((data) => {
        loader.load(data.url, (texture) => {
            const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(material);
            
            // Posicionarlos aleatoriamente en el espacio
            sprite.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
            sprite.scale.set(2, 2, 1); // Ajusta el tamaño aquí (2 es el doble de grande)
            sprite.userData = { phrase: data.phrase };
            
            characters.push(sprite);
            starGroup.add(sprite);
        }, undefined, (err) => {
            console.error("No se pudo cargar la imagen: " + data.url);
        });
    });

    setupControls();
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize);
    animate();
}

// --- LÓGICA DE MOVIMIENTO E INTERACCIÓN ---

function setupControls() {
    const start = (x, y) => { isDragging = true; previousMousePosition = { x, y }; };
    const move = (x, y) => {
        if (isDragging) {
            const deltaX = x - previousMousePosition.x;
            const deltaY = y - previousMousePosition.y;
            rotationVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
            starGroup.rotation.y += rotationVelocity.x;
            starGroup.rotation.x += rotationVelocity.y;
            previousMousePosition = { x, y };
        }
    };
    const end = () => isDragging = false;

    window.addEventListener('mousedown', e => start(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    window.addEventListener('mouseup', end);
    window.addEventListener('touchstart', e => start(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('touchmove', e => move(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('touchend', end);
}

function onClick(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(characters);
    if (intersects.length > 0) {
        popMessage(event.clientX, event.clientY, intersects[0].object.userData.phrase);
    }
}

function popMessage(x, y, text) {
    const container = document.getElementById('messages-container');
    const msg = document.createElement('div');
    msg.className = 'msg-pop';
    msg.innerText = text;
    msg.style.left = `${x}px`;
    msg.style.top = `${y}px`;
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 3500);
}

function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
        starGroup.rotation.y += rotationVelocity.x;
        starGroup.rotation.x += rotationVelocity.y;
        rotationVelocity.x *= 0.98; 
        rotationVelocity.y *= 0.98;
        if (Math.abs(rotationVelocity.x) < 0.0005) rotationVelocity.x = 0.0005;
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function playAudio(url) {
    if(url.includes('URL_')) return;
    new Audio(url).play().catch(() => {});
}

init();