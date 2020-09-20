<template>
  <div>
    <nav class="hero is-primary">
      <div class="hero-body">
        <h2 class="title is-2">GraphQL Demo</h2>
        <router-link :to="{ name: 'home' }">Home</router-link> ||
        <router-link :to="{ name: 'users' }">Users</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
