<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item">
        <img
          src="https://www.howtographql.com/static/howtographql.d1a2e5b4.svg"
          width="112"
          height="28"
        />
      </router-link>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{ name: 'home' }" class="navbar-item"
            >Home</router-link
          >
          <router-link :to="{ name: 'users' }" class="navbar-item"
            >Users</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
