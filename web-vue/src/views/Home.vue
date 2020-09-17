<template>
  <div class="section">
    <div>
      <h3 class="title is-3">Welcome</h3>
    </div>
    <div class="section">
      <p class="content">
        Just a simple demo application that allows to authenticate against AWS
        Cognito and uses the returned JWT token to authenticate the user against
        a graphQL endpoint.
      </p>
    </div>
    <div v-if="loggedIn">
      <UserCard />
    </div>
    <div v-else>
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserCard from '@/components/UserCard'

export default {
  components: {
    UserCard,
  },
  computed: mapState(['loggedIn']),
}
</script>
