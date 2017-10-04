<template>
  <div class="quote-list">
    <table class="u-full-width">
      <thead>
        <tr>
          <th>Quote</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quote in allQuotes">
          <td>{{ quote.text }}</td>
          <td>{{ quote.author }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {}
    },
    props: ['allQuotes'],
    methods: {},
    created () {
      console.log('created list component')
    }
  }
</script>

<style lang="scss">
  .quote-list {
    width: 100%;
    background-image: url('../assets/default-bg.jpg');
    background-attachment: fixed;
    background-size: cover;
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
  }

  table {
    background-color: rgba(255,255,255,0.5);
  }
</style>
