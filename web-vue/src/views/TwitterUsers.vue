<template>
  <div class="section">
    <h3 class="title is-3">Explore Twitter users</h3>
    <div class="card">
      <div class="card-header-title">
        <form @submit.prevent="search">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">description:</label>
            </div>
            <div class="field">
              <div class="field-body">
                <div class="control">
                  <input
                    class="input"
                    v-model="desc"
                    type="text"
                    name="description"
                    required
                  />
                </div>
                <div class="control">
                  <button class="button is-primary" type="submit" name="button">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="card-content">
        <div class="content">
          <div v-if="error" class="notification is-danger is-light">
            <p>There was an error retrieving users!</p>
            <strong>{{ error }}</strong>
          </div>
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr>
                <th class="has-text-centered">screen name</th>
                <th class="has-text-centered">name</th>
                <th>description</th>
                <th>Hashtags</th>
                <th>#Followers</th>
                <th>#Following</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <router-link
                    :to="{
                      name: 'user',
                      params: { screenName: user.screenName },
                    }"
                  >
                    <div class="box has-text-centered">
                      <figure class="image is-48x48">
                        <img :src="largeProfileURL(user)" />
                      </figure>
                      <p>@{{ user.screenName }}</p>
                    </div>
                  </router-link>
                </td>
                <td class="has-text-centered">{{ user.name }}</td>
                <td>{{ user.description }}</td>
                <td>
                  <span v-for="tag in user.top10Hashtags" :key="tag"
                    >{{ tag }}
                  </span>
                </td>
                <td class="has-text-centered">{{ user.followersCount }}</td>
                <td class="has-text-centered">{{ user.friendsCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">prev</p>
        <p class="card-footer-item">next</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TwitterUsers',
  data() {
    return {
      desc: '',
    }
  },
  computed: mapState({
    users: state => state.twitter.users,
    error: state => state.twitter.error,
  }),
  methods: {
    search() {
      this.$store.dispatch('twitter/fetchUsersByDescription', this.desc)
    },
    largeProfileURL(user) {
      return user.profileImageURL.replace('_mini.', '.')
    },
  },
}
</script>

<style scoped>
td span:before {
  content: '#';
}
td span:last-child:after {
  content: '';
}
</style>
