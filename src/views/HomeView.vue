<template>
  <section class="home-hero container">
    <div class="hero-inner">
      <div class="hero-label">
        <span class="label-line"></span>
        <span class="label-text">Événements & Culture</span>
      </div>

      <div class="hero-heading">
        <h1 class="hero-title">La manif des<br><em>gens civilisé</em></h1>
        <p class="hero-sub">Sous-entendu, pas pour tous.</p>
      </div>

      <div class="hero-bottom">
        <p class="hero-desc">
          Un site qui présente, de manière générale, les événements organisés —
          dates, lieux, descriptions.
        </p>
        <RouterLink to="/event" class="hero-btn">
          Accéder aux événements
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </RouterLink>
      </div>
    </div>

    <div class="hero-deco" aria-hidden="true">
      <div class="deco-ring deco-ring--1"></div>
      <div class="deco-ring deco-ring--2"></div>
      <div class="deco-dot"></div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

/* ── Layout principal ── */
.hero-inner {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 680px;
  position: relative;
  z-index: 1;
}

/* ── Label chapeau ── */
.hero-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.label-line {
  display: block;
  width: 2.5rem;
  height: 2px;
  background: #534ab7;
  border-radius: 99px;
  flex-shrink: 0;
}

.label-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #534ab7;
}

/* ── Titre ── */
.hero-heading {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-title {
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #0d0d0d;
  margin: 0;
}

.hero-title em {
  font-style: normal;
  color: #534ab7;
}

.hero-sub {
  font-size: 1rem;
  color: #888;
  font-weight: 400;
  letter-spacing: 0.01em;
  margin: 0;
  padding-left: 0.1rem;
}

/* ── Bas de hero ── */
.hero-bottom {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.hero-desc {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #444;
  max-width: 52ch;
  margin: 0;
  border-left: 2px solid #e8e7f8;
  padding-left: 1rem;
}

/* ── Bouton (couleur et forme intactes) ── */
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  background: #534ab7;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  width: fit-content;
  transition: background 0.2s ease, gap 0.2s ease;
}

.hero-btn:hover {
  background: #3c3489;
  gap: 0.75rem;
}

/* ── Déco géométrique ── */
.hero-deco {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  width: 420px;
  height: 420px;
  pointer-events: none;
}

.deco-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid #534ab7;
}

.deco-ring--1 {
  width: 320px;
  height: 320px;
  top: 50px;
  left: 50px;
  opacity: 0.12;
}

.deco-ring--2 {
  width: 200px;
  height: 200px;
  top: 110px;
  left: 110px;
  opacity: 0.08;
  border-width: 2px;
}

.deco-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #534ab7;
  opacity: 0.25;
  top: 196px;
  left: 196px;
}
</style>