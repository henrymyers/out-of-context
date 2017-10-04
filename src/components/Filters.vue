<template>
  <div class="filters">

    <span>
      <span>Display quotes from </span>
      <select v-model="selectedAuthor" title="Selected author">
        <option value="">Everyone</option>
        <option v-for="author in authors">{{ author }}</option>
      </select>
    </span>

    <span>
      <span>sorted by </span>
      <select v-model="sortMethod" title="Sorting method">
        <option value="" selected>Random</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </span>

  </div>
</template>

<script>
  let _ = require('lodash')

  export default {
    name: 'filters',
    props: ['quotes'],
    data () {
      return {
        selectedAuthor: '',
        sortMethod: ''
      }
    },
    computed: {
      authors: function () {
        let authors = _.map(this.quotes, 'author')
        return _.uniq(authors).sort()
      }
    },
    watch: {
      quotes: function (newQuotes) {
        if (newQuotes && newQuotes.length) {}
      }
    },
    methods: {},
    created () {
      console.log('created filter component')
    }
  }
</script>

<style lang="scss">
  .filters {
    background-color: rgba(255,255,255,0.9);
    padding: 2rem;
    border-radius: 1rem;

    select {
      margin: 0;
    }
  }
</style>
