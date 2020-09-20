<template>
  <div class="card">
    <div class="card-content">
      <h4 class="title is-6 has-text-centered">
        {{ tweet.createdAt.formatted }}
      </h4>
      <p>{{ tweet.text }}</p>
    </div>
    <div class="card-footer">
      <span class="card-footer-item">likes: {{ tweet.favoriteCount }}</span>
      <span class="card-footer-item">retweets: {{ tweet.retweetCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TweetCard',
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
