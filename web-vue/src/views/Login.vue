<template>
  <div class="section">
    <div v-if="error" class="notification is-danger is-light">
      <p>There was an error logging in!</p>
      <strong>{{ error.message }}</strong>
    </div>
    <form  @submit.prevent="login">
      <div class="field is-grouped-centered">
        <label class="label" for="username">Username:</label>
        <div class="control">
          <input class="input" v-model="username" type="text" name="username" value required/>
        </div>
        <label class="label" for="password">Password:</label>
        <div class="control">
          <input class="input" v-model="password" type="password" name="password" required/>
        </div>
      </div>

      <div class="field is-pulled-right">
        <div class="control">
          <button class="button is-primary" type="submit" name="button">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'LoginCard',
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      }).then(() => {
        this.$router.push({name: 'home'})
      }).catch((error) => {
        this.error = error
      })
    },
  },
}
</script>

<style scoped></style>
