/* =============================================================
   LES MAINS MAGIQUES DAX — Animations et effets de la page
   (aucune modification nécessaire pour changer les textes)
   ============================================================= */

// Animations réduites si la personne l'a demandé dans son système
const moinsAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Souris présente (ordinateur) : active les effets au survol
const avecSouris = window.matchMedia('(hover: hover) and (pointer: fine)').matches;


// ---------- Menu mobile (bouton "burger") ----------
const boutonMenu = document.getElementById('menu-bouton');
const menu = document.getElementById('menu');

if (boutonMenu && menu) {
  const fermerMenu = () => {
    menu.classList.remove('ouvert');
    boutonMenu.setAttribute('aria-expanded', 'false');
    boutonMenu.setAttribute('aria-label', 'Ouvrir le menu');
  };
  boutonMenu.addEventListener('click', () => {
    const ouvert = menu.classList.toggle('ouvert');
    boutonMenu.setAttribute('aria-expanded', String(ouvert));
    boutonMenu.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  menu.querySelectorAll('a').forEach((lien) => lien.addEventListener('click', fermerMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermerMenu(); });
}


// ---------- Effets liés au défilement ----------
// (en-tête, barre de progression, bouton "haut", parallaxe)
const entete = document.getElementById('entete');
const progression = document.getElementById('progression');
const boutonHaut = document.getElementById('haut');
const fondAccueil = document.querySelector('.accueil__fond');
const fondsParallaxe = document.querySelectorAll('.parallaxe');

let calculPrevu = false;
function auDefilement() {
  const y = window.scrollY;
  const hauteurMax = document.documentElement.scrollHeight - window.innerHeight;

  if (entete) entete.classList.toggle('defile', y > 40);
  if (progression) progression.style.setProperty('--avancement', hauteurMax > 0 ? y / hauteurMax : 0);
  if (boutonHaut) boutonHaut.classList.toggle('visible', y > window.innerHeight * 0.8);

  if (!moinsAnimations) {
    // L'image d'accueil descend plus lentement que la page
    if (fondAccueil && y < window.innerHeight * 1.2) {
      fondAccueil.style.transform = `translateY(${y * 0.35}px)`;
    }
    // Les bandeaux photo glissent doucement à l'intérieur de leur cadre
    fondsParallaxe.forEach((fond) => {
      const cadre = fond.parentElement.getBoundingClientRect();
      if (cadre.bottom < 0 || cadre.top > window.innerHeight) return;
      const centre = cadre.top + cadre.height / 2 - window.innerHeight / 2;
      fond.style.transform = `translateY(${centre * -0.18}px)`;
    });
  }
  calculPrevu = false;
}
window.addEventListener('scroll', () => {
  if (!calculPrevu) { calculPrevu = true; requestAnimationFrame(auDefilement); }
}, { passive: true });
window.addEventListener('resize', auDefilement);
auDefilement();


// ---------- Apparitions au défilement ----------
const elements = document.querySelectorAll('.apparition');

if ('IntersectionObserver' in window && !moinsAnimations) {
  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;
      const el = entree.target;
      el.classList.add('visible');
      // Une fois apparue, la carte de soin peut réagir vite à la souris
      if (el.classList.contains('carte')) setTimeout(() => el.classList.add('inclinable'), 1400);
      observateur.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  elements.forEach((el) => observateur.observe(el));
} else {
  elements.forEach((el) => el.classList.add('visible', 'inclinable'));
}


// ---------- Lien du menu de la section affichée ----------
const liensMenu = document.querySelectorAll('.menu a[href^="#"]');
if ('IntersectionObserver' in window && liensMenu.length) {
  const suivi = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;
      liensMenu.forEach((lien) => lien.classList.toggle('actif', lien.getAttribute('href') === '#' + entree.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => suivi.observe(s));
}


// ---------- Compteur "20 ans" qui défile ----------
document.querySelectorAll('.compteur').forEach((compteur) => {
  if (moinsAnimations) return;
  const cible = parseInt(compteur.dataset.cible, 10);
  const depart = 2200;   // démarre quand la ligne apparaît (en millisecondes)
  const duree = 1600;
  compteur.textContent = '0';
  setTimeout(() => {
    const debut = performance.now();
    const etape = (maintenant) => {
      const t = Math.min((maintenant - debut) / duree, 1);
      const adouci = 1 - Math.pow(1 - t, 3);
      compteur.textContent = Math.round(cible * adouci);
      if (t < 1) requestAnimationFrame(etape);
    };
    requestAnimationFrame(etape);
  }, depart);
});


// ---------- Particules de lumière sur l'accueil ----------
// Petites lueurs dorées et lavande qui montent doucement,
// comme des présences lumineuses.
const toile = document.getElementById('particules');

if (toile && !moinsAnimations) {
  const ctx = toile.getContext('2d');
  const couleurs = ['255,255,255', '230,211,163', '201,164,92', '155,135,201'];
  let largeur, hauteur, particules = [], visible = true;

  function dimensionner() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    largeur = toile.offsetWidth;
    hauteur = toile.offsetHeight;
    toile.width = largeur * ratio;
    toile.height = hauteur * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const nombre = Math.round(Math.min(70, largeur / 14));
    particules = Array.from({ length: nombre }, () => creerParticule(true));
  }

  function creerParticule(partout) {
    return {
      x: Math.random() * largeur,
      y: partout ? Math.random() * hauteur : hauteur + 10,
      r: Math.random() * 2.6 + 0.8,
      vitesse: Math.random() * 0.35 + 0.12,
      oscillation: Math.random() * Math.PI * 2,
      amplitude: Math.random() * 0.6 + 0.2,
      couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
      eclat: Math.random() * Math.PI * 2,
    };
  }

  function dessiner() {
    if (!visible) return;
    ctx.clearRect(0, 0, largeur, hauteur);
    particules.forEach((p, i) => {
      p.y -= p.vitesse;
      p.oscillation += 0.012;
      p.x += Math.sin(p.oscillation) * p.amplitude;
      p.eclat += 0.03;
      if (p.y < -10) particules[i] = creerParticule(false);

      const alpha = 0.35 + Math.sin(p.eclat) * 0.3;
      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      halo.addColorStop(0, `rgba(${p.couleur},${alpha + 0.3})`);
      halo.addColorStop(1, `rgba(${p.couleur},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(dessiner);
  }

  // Met l'animation en pause quand l'accueil n'est plus à l'écran
  new IntersectionObserver(([e]) => {
    const etaitVisible = visible;
    visible = e.isIntersecting;
    if (visible && !etaitVisible) requestAnimationFrame(dessiner);
  }).observe(toile);

  dimensionner();
  window.addEventListener('resize', dimensionner);
  requestAnimationFrame(dessiner);
}


// ---------- Cartes de soins qui s'inclinent sous la souris ----------
if (avecSouris && !moinsAnimations) {
  document.querySelectorAll('.carte').forEach((carte) => {
    carte.addEventListener('mousemove', (e) => {
      const zone = carte.getBoundingClientRect();
      const x = (e.clientX - zone.left) / zone.width;   // 0 à 1
      const y = (e.clientY - zone.top) / zone.height;
      carte.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
      carte.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      carte.style.setProperty('--mx', `${x * 100}%`);
      carte.style.setProperty('--my', `${y * 100}%`);
    });
    carte.addEventListener('mouseleave', () => {
      carte.style.setProperty('--rx', '0deg');
      carte.style.setProperty('--ry', '0deg');
    });
  });
}


// ---------- Traînée d'étincelles dorées derrière la souris ----------
if (avecSouris && !moinsAnimations) {
  let derniere = 0;
  document.addEventListener('mousemove', (e) => {
    const maintenant = performance.now();
    if (maintenant - derniere < 45) return;   // limite le nombre d'étincelles
    derniere = maintenant;
    const etincelle = document.createElement('span');
    etincelle.className = 'etincelle';
    etincelle.style.left = e.clientX + 'px';
    etincelle.style.top = e.clientY + 'px';
    etincelle.style.setProperty('--dx', (Math.random() * 30 - 15) + 'px');
    etincelle.style.setProperty('--dy', (Math.random() * 25 + 10) + 'px');
    document.body.appendChild(etincelle);
    etincelle.addEventListener('animationend', () => etincelle.remove());
  });
}


// ---------- Année automatique dans le pied de page ----------
const annee = document.getElementById('annee');
if (annee) annee.textContent = new Date().getFullYear();
