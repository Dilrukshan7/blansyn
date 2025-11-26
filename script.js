// --- Three.js Background Animation ---
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // --- Abstract Particle Wave (Placeholder for 3D Model) ---
    // NOTE: To replace this with the "Girl with Jasmine Flower" model:
    // 1. Import GLTFLoader (needs separate CDN script if not in core build)
    // 2. Load your .glb file and add it to the scene.

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles in a wide area
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material - using the accent color dynamically would be cool, but for now static light blue
    const material = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x64ffda, // Matches Navy Blue accent
        transparent: true,
        opacity: 0.8,
    });

    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Add some floating geometric shapes for depth
    const geometry = new THREE.IcosahedronGeometry(10, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x112240,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(sphere);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate entire system slowly
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Rotate the wireframe sphere
        sphere.rotation.x -= 0.002;
        sphere.rotation.y -= 0.002;

        // Mouse interaction (optional parallax could go here)

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// --- Theme Switcher Logic ---
const initThemeSwitcher = () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeOptions = document.getElementById('theme-options');
    const buttons = themeOptions.querySelectorAll('button');

    // Toggle menu
    themeBtn.addEventListener('click', () => {
        themeOptions.classList.toggle('show');
    });

    // Handle theme selection
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');

            // Set theme on body/html
            document.documentElement.setAttribute('data-theme', theme);

            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Close menu
            themeOptions.classList.remove('show');
        });
    });
};

// --- WhatsApp Integration ---
const initWhatsApp = () => {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Construct WhatsApp URL
            // REPLACE '94770000000' with your actual phone number
            const phoneNumber = '+94721962732';
            const text = `*New Inquiry from Blansyn Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;

            const url = `https://wa.me/${phoneNumber}?text=${text}`;

            // Open in new tab
            window.open(url, '_blank');
        });
    }
};

// --- Mobile Menu ---
const initMobileMenu = () => {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');

    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.right = '0';
                nav.style.background = 'var(--glass-bg)';
                nav.style.width = '100%';
                nav.style.padding = '20px';
                nav.style.backdropFilter = 'blur(10px)';
            }
        });
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initThemeSwitcher();
    initWhatsApp();
    initMobileMenu();
});
