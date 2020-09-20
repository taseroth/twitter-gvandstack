<template>
  <div class="section">
    <div v-if="error" class="notification is-danger is-light">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="user">
      <div class="card">
        <div class="card-header-title">
          <h3 class="title is-3">{{ user.name }}</h3>
        </div>
        <div class="card-content">
          <div class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="largeProfileURL(user)" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>@{{ user.screenName }}</strong>
                </p>
                <p>{{ user.description }}</p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <span class="level-item">
                    <strong>Tweets: </strong> {{ user.tweetCount }}</span
                  >
                  <span class="level-item">
                    <strong>Followers: </strong>{{ user.followersCount }}</span
                  >
                  <span class="level-item"
                    ><strong>Follows:</strong> {{ user.friendsCount }}</span
                  >
                  <span v-if="user.location" class="level-item"
                    ><strong>Location: </strong> {{ user.location }}</span
                  >
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-2">
        <div class="card-header-title">
          <h4 class="title is-4">Tweets</h4>
        </div>
        <div class="card-content">
          <div class="flex">
            <div class="flex-item" v-for="tweet in tweets" :key="tweet.id">
              <TweetCard :tweet="tweet" />
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-2">
        <div class="card-header-title">
          <h4 class="title is-4">Hashtags</h4>
        </div>
        <div class="card-content">
          <Cloud :data="tags" :fontSizeMapper="fontSizeMapper" :padding="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store/store'
import TweetCard from '@/components/TweetCard'
import Cloud from 'vue-d3-cloud'

export default {
  name: 'TwitterUser',
  components: { TweetCard, Cloud },
  props: {
    screenName: {
      type: String,
      required: true,
    },
  },
  methods: {
    largeProfileURL(user) {
      return user.profileImageURL.replace('_mini.', '.')
    },
    fontSizeMapper(word) {
      return Math.log2(word.value) * 5
    },
  },
  computed: mapState({
    user: state => state.twitter.user,
    error: state => state.twitter.error,
    tweets: state => state.twitter.tweets,
    tags: state => state.twitter.tags,
  }),
  created() {
    store.dispatch('twitter/fetchTweetsForUser', this.user.screenName)
    store.dispatch('twitter/fetchTagsForUser', this.user.screenName)
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('twitter/fetchUserByScreenName', routeTo.params.screenName)
      .then(() => {
        next()
      })
  },
}
</script>

<style scoped>
.flex {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;
}
.flex .flex-item {
  flex: 0 0 31%;
  padding-bottom: 1em;
}
</style>
