let scene, camera, renderer, starGroup, characters = [];
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0.002, y: 0.002 }; // Rotación inicial suave

const phrases = [
    "MONSE MONSE: ¡Eres mi paz! 💖",
    "MONSE MONSE: Itachi te protege 🥷",
    "MONSE MONSE: Todo estará bien 🐾",
    "MONSE MONSE: El mundo es tuyo 🤵",
    "MONSE MONSE: Eres mi estrella ⭐",
    "MONSE MONSE: Te amo infinito 💜"
];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container3d').appendChild(renderer.domElement);

    starGroup = new THREE.Group();
    scene.add(starGroup);

    // Galaxia 3D
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 4000; i++) {
        starVertices.push((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 });
    starGroup.add(new THREE.Points(starGeometry, starMaterial));

    // Personajes interactivos
    const emojis = ['😈', '🥷', '🐾', '🤵', '⭐', '😈'];
    emojis.forEach((emoji, i) => {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.font = '85px serif';
        ctx.fillText(emoji, 20, 95);
        
        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
        sprite.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
        sprite.scale.set(0.9, 0.9, 1);
        sprite.userData = { phrase: phrases[i % phrases.length] };
        characters.push(sprite);
        starGroup.add(sprite);
    });

    // Controles de Ratón y Táctil
    const startAction = (x, y) => { isDragging = true; previousMousePosition = { x, y }; };
    const moveAction = (x, y) => {
        if (isDragging) {
            const deltaX = x - previousMousePosition.x;
            const deltaY = y - previousMousePosition.y;
            rotationVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
            starGroup.rotation.y += rotationVelocity.x;
            starGroup.rotation.x += rotationVelocity.y;
            previousMousePosition = { x, y };
        }
    };
    const endAction = () => { isDragging = false; };

    window.addEventListener('mousedown', e => startAction(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => moveAction(e.clientX, e.clientY));
    window.addEventListener('mouseup', endAction);
    
    window.addEventListener('touchstart', e => startAction(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('touchmove', e => moveAction(e.touches[0].clientX, e.touches[0].clientY));
    window.addEventListener('touchend', endAction);

    // Clic para mensajes
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize);
    animate();
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
        // Inercia: se sigue moviendo un poquito y frena suavemente
        starGroup.rotation.y += rotationVelocity.x;
        starGroup.rotation.x += rotationVelocity.y;
        rotationVelocity.x *= 0.98;
        rotationVelocity.y *= 0.98;
        
        // Movimiento base si está casi quieto
        if (Math.abs(rotationVelocity.x) < 0.001) rotationVelocity.x = 0.001;
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