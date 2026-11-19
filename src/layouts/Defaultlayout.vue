<script setup>
</script>
<template>
  <div class="app-shell">
    <ul class="customised-nav-bar">
      <li><router-link to="/">Accueil</router-link></li>
      <li><input type="search" placeholder="Rechercher…"></li>
      <li>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/demande-prestation">proposer sa prestation</router-link>
      </li>
    </ul>

    <main class="page-main">
      <RouterView />
    </main>

    <footer class="site-footer"></footer>
  </div>
</template>

<style scoped> /**
 * maj pour visi de la nav bar au lieu de lien direct visible
 */
.customised-nav-bar {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #dcd8cf;
  margin: 0;
}

.customised-nav-bar li {
  margin: 0;
}

.customised-nav-bar li input[type="search"] {
  border: 1px solid #d3d1c7;
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  min-width: 180px;
  background: #f5f4ef;
}

.customised-nav-bar li a {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: #534ab7;
  color: #ffffff;
  font-weight: 600;
  transition: background 0.2s ease;
}

.customised-nav-bar li a:hover {
  background: #3c3489;
}

.dropdown {
  display: none;
}
</style>