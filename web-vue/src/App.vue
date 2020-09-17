<template>
  <section id="app">
    <NavBar />
    <router-view />
  </section>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'app',
  components: {
    NavBar,
  },
}
</script>
