let scene, camera, renderer, stars, characters = [];
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

const phrases = [
    "MONSE MONSE: ¡Eres mi paz! 💖",
    "MONSE MONSE: Itachi te protege 🥷",
    "MONSE MONSE: Todo estará bien 🐾",
    "MONSE MONSE: The world is yours 🤵",
    "MONSE MONSE: Eres mi estrella ⭐",
    "MONSE MONSE: Te amo infinito 💜"
];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container3d').appendChild(renderer.domElement);

    // Crear Galaxia de Estrellas
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
        starVertices.push((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Crear Personajes (Sprites 3D)
    const loader = new THREE.TextureLoader();
    const emojis = ['😈', '🥷', '🐾', '🤵', '⭐'];
    
    emojis.forEach((emoji, i) => {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.font = '80px serif';
        ctx.fillText(emoji, 20, 90);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        
        sprite.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
        sprite.scale.set(0.8, 0.8, 1);
        sprite.userData = { phrase: phrases[i % phrases.length] };
        
        characters.push(sprite);
        scene.add(sprite);
    });

    // Eventos de interacción
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onSelect);
    window.addEventListener('resize', onWindowResize);
    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onSelect(event) {
    // Detectar clic en personaje 3D
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(mouseX, mouseY);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(characters);

    if (intersects.length > 0) {
        popMessage(event, intersects[0].object.userData.phrase);
    }
}

function popMessage(e, text) {
    const container = document.getElementById('messages-container');
    const msg = document.createElement('div');
    msg.className = 'msg-pop';
    msg.innerText = text;
    msg.style.left = `${e.clientX}px`;
    msg.style.top = `${e.clientY}px`;
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Suavizado de rotación con el ratón
    targetRotationX += (mouseX * 0.05 - targetRotationX) * 0.05;
    targetRotationY += (mouseY * 0.05 - targetRotationY) * 0.05;
    
    scene.rotation.y += targetRotationX;
    scene.rotation.x -= targetRotationY;
    
    // Movimiento suave de personajes
    characters.forEach(c => {
        c.position.y += Math.sin(Date.now() * 0.001) * 0.002;
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function playAudio(url) {
    if(url.includes('URL_')) return;
    const audio = new Audio(url);
    audio.volume = 0.6;
    audio.play();
}

init();