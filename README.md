# Blansyn Website Documentation

## 1. Project Setup
This website is built with **Vite**, **Three.js**, and **Vanilla HTML/CSS/JS**.

### Prerequisites
- Node.js installed on your computer.

### Installation
1. Open this folder in a terminal.
2. Run the following command to install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server and view the website:
```bash
npm run dev
```
This will open the site in your browser (usually at `http://localhost:3000`).

## 2. Customization

### Changing the WhatsApp Number
1. Open `main.js`.
2. Search for the `initWhatsApp` function.
3. Replace the placeholder number with your actual number:
   ```javascript
   const phoneNumber = '94770000000'; // Change this
   ```

### Changing Themes
The themes are defined in `style.css` using CSS variables.
- **To edit a theme**: Modify the hex codes in the `:root` or `[data-theme="..."]` blocks.
- **To add a new theme**:
  1. Add a new `[data-theme="new-theme-name"]` block in `style.css`.
  2. Add a button in `index.html` inside the `<div class="theme-options">`:
     ```html
     <button data-theme="new-theme-name">New Theme</button>
     ```

### Adding the 3D Model (Girl with Jasmine Flower)
Currently, the background is an abstract particle animation. To use your custom 3D model:
1. Place your `.glb` or `.gltf` model file in the `public/` folder (create one if it doesn't exist) or root directory.
2. Open `main.js`.
3. Import the GLTFLoader at the top:
   ```javascript
   import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
   ```
4. Inside `initThreeJS`, remove the particle code and add:
   ```javascript
   const loader = new GLTFLoader();
   loader.load('/your-model.glb', (gltf) => {
     scene.add(gltf.scene);
     // Adjust position/scale
     gltf.scene.position.set(0, -5, 0);
     gltf.scene.scale.set(1, 1, 1);
   });
   ```

## 3. Deployment
To create a production-ready version of the website:
```bash
npm run build
```
This will create a `dist` folder containing the optimized files. You can upload this folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).
