<template>
  <div class="card">
    <div class="card-header-title">
      <p class="title is-4">You are currently logged in as:</p>
    </div>
    <div class="card-content content">
      <p>username: {{ user.username }}</p>
      <p>email: {{ user.email }}</p>
      <p>groups:</p>
      <ul>
        <li v-for="role in user.groups" :key="role">
          {{ role }}
        </li>
      </ul>
      <div class="card-footer">
        <div class="card-footer-item">
          <button class="button is-primary" v-on:click="logout">
            Log out!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserCard',
  computed: mapState(['user']),
  methods: {
    logout: function() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({name: 'login'})
      })
    },
  },
}
</script>
