import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { skillsData, skillCategories } from './data/skills';
import { projectsData } from './data/projects';
import { journeyData } from './data/journey';
import { Project, TimelineItem, Skill } from './types';

// ========================================================
// 1. DESKTOP CUSTOM CURSOR CONTROLLER
// ========================================================
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const follower = document.getElementById('custom-cursor-follower');
  const badge = document.getElementById('custom-cursor-badge');

  if (!dot || !follower) return;

  // Disable on touch / mobile devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    dot.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth lerp follower loop
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  requestAnimationFrame(animateFollower);

  // Hover states
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const interactive = target.closest('button, a, input, textarea, select, [data-cursor="pointer"]');
    const projectCard = target.closest('.project-card-interactive');

    if (projectCard) {
      follower.classList.add('hovering-project');
      if (badge) badge.textContent = 'INSPECT';
    } else if (interactive) {
      follower.classList.add('hovering');
      follower.classList.remove('hovering-project');
      if (badge) badge.textContent = '';
    } else {
      follower.classList.remove('hovering', 'hovering-project');
      if (badge) badge.textContent = '';
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

// ========================================================
// 2. HERO THREE.JS 3D INTERACTIVE CORE
// ========================================================
function initHeroThreeScene() {
  const container = document.getElementById('hero-three-canvas');
  if (!container) return;

  const width = container.clientWidth || 400;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 7.5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Group for mouse tilt interaction
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Central Inner Crystal (Octahedron)
  const innerGeo = new THREE.OctahedronGeometry(1.5, 0);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x005577,
    emissiveIntensity: 0.6,
    wireframe: false
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  mainGroup.add(innerMesh);

  // Outer Wireframe Cage (Icosahedron)
  const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const outerMesh = new THREE.Mesh(outerGeo, outerMat);
  mainGroup.add(outerMesh);

  // Orbital Gyro Ring 1
  const ringGeo1 = new THREE.TorusGeometry(3.0, 0.03, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.4
  });
  const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringMesh1.rotation.x = Math.PI / 3;
  mainGroup.add(ringMesh1);

  // Orbital Gyro Ring 2
  const ringGeo2 = new THREE.TorusGeometry(3.2, 0.03, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.35
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.rotation.y = Math.PI / 4;
  ringMesh2.rotation.x = -Math.PI / 4;
  mainGroup.add(ringMesh2);

  // 3D Particle Constellation
  const particleCount = 220;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const r = 3.5 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[i + 2] = r * Math.cos(phi);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.06,
    transparent: true,
    opacity: 0.7
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  mainGroup.add(particleSystem);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLightCyan = new THREE.PointLight(0x00f0ff, 3, 20);
  pointLightCyan.position.set(5, 5, 5);
  scene.add(pointLightCyan);

  const pointLightEmerald = new THREE.PointLight(0x10b981, 2, 20);
  pointLightEmerald.position.set(-5, -5, -2);
  scene.add(pointLightEmerald);

  // Mouse tilt tracking
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;

    targetRotationY = normX * 0.7;
    targetRotationX = -normY * 0.7;
  });

  // Resize handler
  const handleResize = () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', handleResize);

  // Render loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Constant slow revolutions
    innerMesh.rotation.x += delta * 0.4;
    innerMesh.rotation.y += delta * 0.5;

    outerMesh.rotation.x -= delta * 0.2;
    outerMesh.rotation.y -= delta * 0.3;

    ringMesh1.rotation.z += delta * 0.3;
    ringMesh2.rotation.z -= delta * 0.25;

    particleSystem.rotation.y += delta * 0.08;

    // Smooth lerp to mouse tilt
    mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
    mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }
  animate();
}

// ========================================================
// 3. THREE.JS 3D SPATIAL LABORATORY
// ========================================================
function initThreeLab() {
  const container = document.getElementById('lab-three-canvas');
  if (!container) return;

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Active Lab State
  let speedMultiplier = 1.0;
  let isWireframe = false;
  let showParticles = true;

  // Geometries Library
  const geometries: Record<string, THREE.BufferGeometry> = {
    torusKnot: new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3),
    icosahedron: new THREE.IcosahedronGeometry(2.0, 1),
    sphere: new THREE.SphereGeometry(2.0, 32, 32),
    cylinder: new THREE.CylinderGeometry(1.2, 1.2, 3.2, 24, 6)
  };

  // Lab Main Mesh
  const labMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    roughness: 0.25,
    metalness: 0.85,
    wireframe: isWireframe,
    emissive: 0x003344,
    emissiveIntensity: 0.5
  });

  let currentMesh = new THREE.Mesh(geometries.torusKnot, labMat);
  scene.add(currentMesh);

  // Particles Cloud
  const pCount = 300;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i += 3) {
    const r = 3.5 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    pPos[i] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i + 2] = r * Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x10b981,
    size: 0.05,
    transparent: true,
    opacity: 0.6
  });
  const labParticles = new THREE.Points(pGeo, pMat);
  scene.add(labParticles);

  // Lights
  const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambLight);

  const lightCyan = new THREE.PointLight(0x00f0ff, 3, 20);
  lightCyan.position.set(6, 6, 6);
  scene.add(lightCyan);

  const lightEmerald = new THREE.PointLight(0x10b981, 2, 20);
  lightEmerald.position.set(-6, -6, -4);
  scene.add(lightEmerald);

  // Drag to Orbit Controls
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;

    currentMesh.rotation.y += deltaX * 0.01;
    currentMesh.rotation.x += deltaY * 0.01;

    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMouseX;
    const deltaY = e.touches[0].clientY - prevMouseY;

    currentMesh.rotation.y += deltaX * 0.01;
    currentMesh.rotation.x += deltaY * 0.01;

    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Wireframe toggle button
  const btnWireframe = document.getElementById('btn-toggle-wireframe');
  btnWireframe?.addEventListener('click', () => {
    isWireframe = !isWireframe;
    labMat.wireframe = isWireframe;
    btnWireframe.textContent = `Wireframe: ${isWireframe ? 'ON' : 'OFF'}`;
    btnWireframe.className = isWireframe
      ? 'px-3 py-1 rounded-lg text-xs font-mono-code bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 cursor-pointer'
      : 'px-3 py-1 rounded-lg text-xs font-mono-code bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 cursor-pointer';
  });

  // Particle toggle button
  const btnParticles = document.getElementById('btn-toggle-particles');
  btnParticles?.addEventListener('click', () => {
    showParticles = !showParticles;
    labParticles.visible = showParticles;
    btnParticles.textContent = `Constellation: ${showParticles ? 'ON' : 'OFF'}`;
    btnParticles.className = showParticles
      ? 'px-3 py-1 rounded-lg text-xs font-mono-code bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 cursor-pointer'
      : 'px-3 py-1 rounded-lg text-xs font-mono-code bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 cursor-pointer';
  });

  // Speed multiplier buttons
  const speedButtons = document.querySelectorAll('.lab-speed-btn');
  speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedButtons.forEach(b => {
        b.className = 'lab-speed-btn px-2 py-0.5 rounded text-xs font-mono-code bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 cursor-pointer';
      });
      btn.className = 'lab-speed-btn px-2 py-0.5 rounded text-xs font-mono-code bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 cursor-pointer';
      const sp = parseFloat((btn as HTMLElement).dataset.speed || '1.0');
      speedMultiplier = sp;
    });
  });

  // Geometry selector buttons
  const geoButtons = document.querySelectorAll('.lab-geo-btn');
  const indicator = document.getElementById('lab-geometry-indicator');

  geoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const geoKey = (btn as HTMLElement).dataset.geo || 'torusKnot';
      if (!geometries[geoKey]) return;

      currentMesh.geometry = geometries[geoKey];

      geoButtons.forEach(b => {
        b.className = 'lab-geo-btn px-3 py-2.5 rounded-xl text-xs font-mono-code text-left border transition-all cursor-pointer bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/5';
      });
      btn.className = 'lab-geo-btn px-3 py-2.5 rounded-xl text-xs font-mono-code text-left border transition-all cursor-pointer bg-cyan-500/20 border-cyan-500/50 text-cyan-300';

      if (indicator) {
        indicator.textContent = `${geoKey.toUpperCase().replace('-', '_')} // ACTIVE`;
      }
    });
  });

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Render loop
  const clock = new THREE.Clock();
  function animateLab() {
    requestAnimationFrame(animateLab);
    const delta = clock.getDelta();

    if (!isDragging) {
      currentMesh.rotation.x += delta * 0.4 * speedMultiplier;
      currentMesh.rotation.y += delta * 0.6 * speedMultiplier;
    }

    labParticles.rotation.y += delta * 0.1 * speedMultiplier;

    renderer.render(scene, camera);
  }
  animateLab();
}

// ========================================================
// 4. 3D CARD TILT EFFECT (Vanilla Pointer Events)
// ========================================================
function init3DCardTilt() {
  const cards = document.querySelectorAll<HTMLElement>('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// ========================================================
// 5. RENDER SKILLS MATRIX (Dynamic HTML Generation)
// ========================================================
function renderSkillsMatrix() {
  const container = document.getElementById('skills-grid');
  const filterContainer = document.getElementById('skills-filter-container');
  if (!container) return;

  let activeCategory = 'All';

  function render(category: string) {
    const filtered = category === 'All'
      ? skillsData
      : skillsData.filter(s => s.category === category);

    container!.innerHTML = filtered.map(skill => `
      <div class="tilt-card glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between group" data-cursor="pointer">
        <div class="tilt-glare"></div>

        <div>
          <!-- Header -->
          <div class="flex items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <span class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${skill.color}"></span>
              <h3 class="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                ${skill.name}
              </h3>
            </div>
            <span class="text-xs font-mono-code text-cyan-400 font-bold">
              ${skill.level}%
            </span>
          </div>

          <!-- Proficiency Progress Bar -->
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
            <div class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700" style="width: ${skill.level}%"></div>
          </div>

          <!-- Experience Badge -->
          <div class="inline-block text-[11px] font-mono-code text-slate-300 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 mb-3">
            ${skill.experience}
          </div>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
            ${skill.description}
          </p>
        </div>

        <!-- Highlight Tags -->
        <div class="flex flex-wrap gap-1 pt-3 border-t border-white/5">
          ${skill.highlights.slice(0, 3).map(h => `
            <span class="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-slate-300">
              ${h}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');

    init3DCardTilt();
  }

  // Bind filter buttons
  filterContainer?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.skill-filter-btn') as HTMLElement | null;
    if (!btn) return;

    activeCategory = btn.dataset.category || 'All';

    filterContainer.querySelectorAll('.skill-filter-btn').forEach(b => {
      b.className = 'skill-filter-btn px-3.5 py-1.5 text-xs font-mono-code rounded-xl transition-all cursor-pointer text-slate-400 hover:text-white hover:bg-white/5 border border-transparent';
    });
    btn.className = 'skill-filter-btn px-3.5 py-1.5 text-xs font-mono-code rounded-xl transition-all cursor-pointer bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm';

    render(activeCategory);
  });

  render('All');
}

// ========================================================
// 6. RENDER PROJECTS & MODAL INSPECTOR
// ========================================================
function renderProjects() {
  const container = document.getElementById('projects-grid');
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  const btnCloseModal = document.getElementById('btn-close-project-modal');
  const modalBackdrop = document.getElementById('project-modal-backdrop');

  if (!container) return;

  container.innerHTML = projectsData.map(project => `
    <div class="tilt-card project-card-interactive glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between group cursor-pointer" data-id="${project.id}" data-cursor="pointer">
      <div class="tilt-glare"></div>

      <div>
        <!-- Category Pill & Badge -->
        <div class="flex items-center justify-between gap-3 mb-4">
          <span class="text-xs font-mono-code px-3 py-1 rounded-full uppercase tracking-wider font-semibold" style="background-color: ${project.accentColor}15; color: ${project.accentColor}; border: 1px solid ${project.accentColor}40">
            ${project.category}
          </span>
          <span class="text-xs font-mono-code text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
            ${project.previewBadge}
          </span>
        </div>

        <!-- Title & Subtitle -->
        <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2">
          ${project.title}
        </h3>
        <p class="text-xs font-mono-code text-cyan-400/90 mb-4">
          // ${project.subtitle}
        </p>

        <!-- Narrative Description -->
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          ${project.description}
        </p>

        <!-- Live Telemetry Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          ${project.metrics.map(m => `
            <div class="glass-panel rounded-xl p-3 border border-white/5 text-center">
              <span class="block text-[10px] font-mono-code text-slate-400 uppercase truncate">${m.label}</span>
              <span class="block text-sm sm:text-base font-display font-extrabold text-cyan-300 mt-1">${m.value}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <!-- Technology tags -->
        <div class="flex flex-wrap gap-1.5 mb-6">
          ${project.technologies.slice(0, 5).map(t => `
            <span class="text-[10px] font-mono-code px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-slate-300">
              ${t}
            </span>
          `).join('')}
          ${project.technologies.length > 5 ? `<span class="text-[10px] font-mono-code px-2 py-1 rounded-md bg-white/[0.03] text-slate-400">+${project.technologies.length - 5}</span>` : ''}
        </div>

        <!-- Action Row -->
        <div class="flex items-center justify-between pt-4 border-t border-white/10">
          <button class="btn-open-project flex items-center gap-1.5 text-xs font-mono-code text-cyan-400 group-hover:text-cyan-300 font-semibold transition-colors cursor-pointer" data-id="${project.id}">
            <span>Inspect Architecture</span>
            <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>

          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="GitHub Repository" onclick="event.stopPropagation()">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  init3DCardTilt();

  // Open Modal logic
  function openModal(projectId: string) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <div>
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs font-mono-code px-3 py-1 rounded-full uppercase tracking-wider font-semibold" style="background-color: ${project.accentColor}20; color: ${project.accentColor}; border: 1px solid ${project.accentColor}50">
            ${project.category}
          </span>
          <span class="text-xs font-mono-code text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
            ${project.previewBadge}
          </span>
        </div>

        <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-1">
          ${project.title}
        </h2>
        <p class="text-xs sm:text-sm font-mono-code text-cyan-400 mb-6">
          // ${project.subtitle}
        </p>

        <!-- Full Technical Narrative -->
        <p class="text-sm text-slate-300 leading-relaxed mb-8">
          ${project.fullDescription}
        </p>

        <!-- Telemetry Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          ${project.metrics.map(m => `
            <div class="glass-panel rounded-2xl p-4 border border-white/10 text-center">
              <span class="block text-[11px] font-mono-code text-slate-400 uppercase mb-1">${m.label}</span>
              <span class="block text-xl font-display font-extrabold text-cyan-400">${m.value}</span>
            </div>
          `).join('')}
        </div>

        <!-- Engineering Architecture Breakdown -->
        <div class="mb-8">
          <h3 class="text-base font-display font-bold text-white mb-3 flex items-center gap-2">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            System Architecture & Flow
          </h3>
          <div class="space-y-2.5">
            ${project.architecture.map((item, idx) => `
              <div class="flex items-start gap-3 text-xs sm:text-sm text-slate-300 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span class="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono-code flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">${idx + 1}</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Key Accomplishments Checklist -->
        <div class="mb-8">
          <h3 class="text-base font-display font-bold text-white mb-3 flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Key Engineering Features
          </h3>
          <div class="space-y-2">
            ${project.keyFeatures.map(feat => `
              <div class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${feat}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tech Stack Tags -->
        <div class="mb-8">
          <h3 class="text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2">Technologies Deployed</h3>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => `
              <span class="text-xs font-mono-code px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-200">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono-code font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>View Source on GitHub ↗</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  container.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.project-card-interactive') as HTMLElement | null;
    if (card && card.dataset.id) {
      openModal(card.dataset.id);
    }
  });

  btnCloseModal?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ========================================================
// 7. RENDER TIMELINE (JOURNEY)
// ========================================================
function renderJourney() {
  const container = document.getElementById('journey-timeline-items');
  const filterContainer = document.getElementById('journey-filter-container');
  if (!container) return;

  const categoryColors: Record<string, string> = {
    Education: '#00f0ff',
    Projects: '#10b981',
    Hackathons: '#f59e0b',
    'Open Source': '#ec4899',
    Learning: '#8b5cf6'
  };

  function render(category: string) {
    const filtered = category === 'All'
      ? journeyData
      : journeyData.filter(item => item.category === category);

    container!.innerHTML = filtered.map(item => {
      const color = categoryColors[item.category] || '#00f0ff';

      return `
        <div class="relative pl-8 md:pl-12 group">
          <!-- Timeline Node Icon -->
          <div class="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-110 z-10" style="background-color: #070a13; border-color: ${color}; box-shadow: 0 0 15px ${color}40">
            <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${color}"></span>
          </div>

          <!-- Glass Card -->
          <div class="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="text-xs font-mono-code px-3 py-1 rounded-full uppercase tracking-wider font-semibold" style="background-color: ${color}15; color: ${color}; border: 1px solid ${color}40">
                  ${item.category}
                </span>
                ${item.badge ? `<span class="text-[11px] font-mono-code text-slate-300 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">${item.badge}</span>` : ''}
              </div>
              <div class="text-xs font-mono-code text-slate-400 flex items-center gap-1.5">
                <span class="text-cyan-400">●</span>
                <span>${item.year}</span>
              </div>
            </div>

            <h3 class="text-xl md:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
              ${item.title}
            </h3>
            <p class="text-xs sm:text-sm font-mono-code text-cyan-400/90 mb-4">
              @ ${item.organization}
            </p>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              ${item.description}
            </p>

            <div class="space-y-2 mb-6">
              ${item.keyAchievements.map(achieve => `
                <div class="flex items-start gap-2.5 text-xs text-slate-400">
                  <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>${achieve}</span>
                </div>
              `).join('')}
            </div>

            <div class="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
              ${item.technologies.map(tech => `
                <span class="text-[10px] font-mono-code px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-slate-300">
                  ${tech}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  filterContainer?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.journey-filter-btn') as HTMLElement | null;
    if (!btn) return;

    const cat = btn.dataset.category || 'All';

    filterContainer.querySelectorAll('.journey-filter-btn').forEach(b => {
      b.className = 'journey-filter-btn px-3 py-1.5 text-xs font-mono-code rounded-xl transition-all cursor-pointer text-slate-400 hover:text-white hover:bg-white/5 border border-transparent';
    });
    btn.className = 'journey-filter-btn px-3 py-1.5 text-xs font-mono-code rounded-xl transition-all cursor-pointer bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm';

    render(cat);
  });

  render('All');
}

// ========================================================
// 8. CONTACT FORM CONTROLLER WITH VALIDATION & CONFETTI
// ========================================================
function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
  const msgInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;

  const errName = document.getElementById('err-contact-name');
  const errEmail = document.getElementById('err-contact-email');
  const errMessage = document.getElementById('err-contact-message');

  const submitBtn = document.getElementById('contact-submit-btn') as HTMLButtonElement | null;
  const btnText = document.getElementById('contact-btn-text');
  const successAlert = document.getElementById('contact-success-alert');

  const copyEmailBtn = document.getElementById('btn-copy-email');
  const copyGithubBtn = document.getElementById('btn-copy-github');

  // Copy Email Handler
  copyEmailBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText('hm5884116@gmail.com');
    const origHtml = copyEmailBtn.innerHTML;
    copyEmailBtn.innerHTML = `<span class="text-xs text-emerald-400 font-mono-code font-bold">Copied!</span>`;
    setTimeout(() => {
      copyEmailBtn.innerHTML = origHtml;
    }, 2000);
  });

  // Copy GitHub Profile URL Handler
  copyGithubBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText('https://github.com/Harshmishra214');
    const textEl = document.getElementById('copy-github-text');
    if (textEl) {
      const orig = textEl.textContent;
      textEl.textContent = 'URL Copied!';
      setTimeout(() => {
        textEl.textContent = orig;
      }, 2000);
    }
  });

  if (!form || !nameInput || !emailInput || !msgInput) return;

  function validate() {
    let isValid = true;

    // Name check
    if (!nameInput!.value.trim() || nameInput!.value.trim().length < 2) {
      errName?.classList.remove('hidden');
      if (errName) errName.textContent = 'Please enter your name (min 2 characters)';
      nameInput!.classList.add('border-rose-500');
      isValid = false;
    } else {
      errName?.classList.add('hidden');
      nameInput!.classList.remove('border-rose-500');
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput!.value.trim() || !emailRegex.test(emailInput!.value.trim())) {
      errEmail?.classList.remove('hidden');
      if (errEmail) errEmail.textContent = 'Please enter a valid email address';
      emailInput!.classList.add('border-rose-500');
      isValid = false;
    } else {
      errEmail?.classList.add('hidden');
      emailInput!.classList.remove('border-rose-500');
    }

    // Message check
    if (!msgInput!.value.trim() || msgInput!.value.trim().length < 10) {
      errMessage?.classList.remove('hidden');
      if (errMessage) errMessage.textContent = 'Please write a message (min 10 characters)';
      msgInput!.classList.add('border-rose-500');
      isValid = false;
    } else {
      errMessage?.classList.add('hidden');
      msgInput!.classList.remove('border-rose-500');
    }

    return isValid;
  }

  // Clear errors on input
  nameInput.addEventListener('input', () => {
    errName?.classList.add('hidden');
    nameInput.classList.remove('border-rose-500');
  });

  emailInput.addEventListener('input', () => {
    errEmail?.classList.add('hidden');
    emailInput.classList.remove('border-rose-500');
  });

  msgInput.addEventListener('input', () => {
    errMessage?.classList.add('hidden');
    msgInput.classList.remove('border-rose-500');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Transmitting...';

    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
      successAlert?.classList.remove('hidden');

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#10b981', '#a855f7']
      });

      form.reset();
    }, 1000);
  });
}

// ========================================================
// 9. SOURCE CODE INSPECTOR MODAL (HTML, CSS & JS)
// ========================================================
function initSourceModal() {
  const modal = document.getElementById('source-modal');
  const btnOpen = document.getElementById('btn-view-source');
  const btnMobileOpen = document.getElementById('btn-mobile-source');
  const btnClose = document.getElementById('btn-close-source-modal');
  const backdrop = document.getElementById('source-modal-backdrop');
  const pre = document.getElementById('source-code-pre');
  const tabBtns = document.querySelectorAll('.source-tab-btn');
  const copyBtn = document.getElementById('btn-copy-active-source');
  const copyText = document.getElementById('copy-source-text');

  const codeSnippets: Record<string, string> = {
    html: `<!-- Harsh Mishra | HTML5 Semantic Architecture -->
<!doctype html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Harsh Mishra | AI Engineer & Developer Portfolio</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body class="bg-[#06080d] text-slate-100 antialiased">
    <!-- Desktop Custom Cursor -->
    <div id="custom-cursor-dot"></div>
    <div id="custom-cursor-follower"><span id="custom-cursor-badge"></span></div>

    <!-- Navigation Bar -->
    <header class="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <nav class="max-w-6xl mx-auto glass-panel rounded-2xl flex items-center justify-between p-3">
        <a href="#" class="font-display font-bold text-cyan-400">HM. Harsh Mishra</a>
        <div class="hidden md:flex gap-4 font-mono text-xs">
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#lab">3D_LAB</a>
          <a href="#journey">JOURNEY</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>
    </header>

    <!-- Interactive Hero Canvas -->
    <section id="hero">
      <div id="hero-three-canvas"></div>
    </section>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="main.js"></script>
  </body>
</html>`,
    css: `/* Harsh Mishra | Modern CSS3 Styling */
:root {
  --bg-dark: #06080d;
  --cyan: #00f0ff;
  --emerald: #10b981;
}

body {
  background-color: var(--bg-dark);
  color: #e2e8f0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}

/* Glassmorphic Panel */
.glass-panel {
  background: rgba(14, 20, 31, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* 3D Tilt Card Perspective */
.tilt-card {
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
}

/* Cyber mesh background */
.bg-grid-cyber {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}`,
    js: `// Harsh Mishra | Pure Vanilla JavaScript & Three.js Engine
import * as THREE from 'three';

// Initialize Three.js Neural Core
const container = document.getElementById('hero-three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 7.5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Glowing Octahedron Mesh
const geometry = new THREE.OctahedronGeometry(1.5, 0);
const material = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2, metalness: 0.8 });
const coreMesh = new THREE.Mesh(geometry, material);
scene.add(coreMesh);

// Animate loop with mouse interaction
function animate() {
  requestAnimationFrame(animate);
  coreMesh.rotation.x += 0.005;
  coreMesh.rotation.y += 0.008;
  renderer.render(scene, camera);
}
animate();`
  };

  let activeTab = 'html';

  function renderCode(tab: string) {
    activeTab = tab;
    if (pre) pre.textContent = codeSnippets[tab] || '';
    tabBtns.forEach(btn => {
      const isCurrent = (btn as HTMLElement).dataset.tab === tab;
      btn.className = isCurrent
        ? 'source-tab-btn px-3 py-1.5 rounded-lg text-xs font-mono-code bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-pointer'
        : 'source-tab-btn px-3 py-1.5 rounded-lg text-xs font-mono-code bg-white/5 text-slate-400 hover:text-white border border-white/10 cursor-pointer';
    });
  }

  function open() {
    if (!modal) return;
    renderCode(activeTab);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  btnOpen?.addEventListener('click', open);
  btnMobileOpen?.addEventListener('click', open);
  btnClose?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      renderCode((btn as HTMLElement).dataset.tab || 'html');
    });
  });

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(codeSnippets[activeTab] || '');
    if (copyText) {
      const orig = copyText.textContent;
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = orig;
      }, 2000);
    }
  });
}

// ========================================================
// 10. NAVBAR SCROLLSPY & MOBILE DRAWER
// ========================================================
function initNavbarAndScroll() {
  const header = document.getElementById('navbar-container');
  const mobileToggle = document.getElementById('btn-mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const backToTop = document.getElementById('btn-back-to-top');

  // Year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Scrollspy & Glass blur on scroll
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('bg-[#070a12]/90', 'backdrop-blur-xl', 'shadow-[0_12px_40px_rgba(0,0,0,0.6)]');
    } else {
      header.classList.remove('bg-[#070a12]/90', 'shadow-[0_12px_40px_rgba(0,0,0,0.6)]');
    }
  });

  // Mobile drawer toggle
  mobileToggle?.addEventListener('click', () => {
    if (!mobileMenu) return;
    const isClosed = mobileMenu.classList.contains('hidden');
    if (isClosed) {
      mobileMenu.classList.remove('hidden');
      hamIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      hamIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  });

  // Close mobile menu when a link is tapped
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      hamIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    });
  });

  // Back to top smooth scroll
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================================
// DOM CONTENT LOADED ENTRY POINT
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeroThreeScene();
  initThreeLab();
  renderSkillsMatrix();
  renderProjects();
  renderJourney();
  initContactForm();
  initSourceModal();
  initNavbarAndScroll();
});

// Also trigger immediately in case DOM is already ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initCustomCursor();
  initHeroThreeScene();
  initThreeLab();
  renderSkillsMatrix();
  renderProjects();
  renderJourney();
  initContactForm();
  initSourceModal();
  initNavbarAndScroll();
}
