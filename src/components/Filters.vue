<template>
  <div class="filters footer">

    <span class="form-control">
      <label>Show quotes from</label>
      <select v-model="selectedAuthor" title="Selected author">
        <option value="">Everyone</option>
        <option v-for="author in authors">{{ author }}</option>
      </select>
    </span>

    <span class="form-control">
      <label>Sorted by</label>
      <select v-model="sortMethod" title="Sorting method">
        <option value="" selected>Random</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </span>

    <div class="buttons">
      <label>{{ previewMessage }}</label>
      <button v-on:click="close">Cancel</button>
      <button v-on:click="applyFilter" class="button-primary">Apply Filter</button>
    </div>
  </div>
</template>

<script>
  import getRandomizedArray from '../utils/getRandomizedArray'

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
      },
      quotesByAuthor: function () {
        return this.selectedAuthor ? _.filter(this.quotes, ['author', this.selectedAuthor]) : this.quotes
      },
      previewMessage: function () {
        return this.quotesByAuthor.length > 1 ? `${this.quotesByAuthor.length} matching quotes` : '1 matching quote'
      }
    },
    watch: {},
    methods: {
      sort: function (quotes) {
        if (this.sortMethod === 'oldest') {
          return _.sortBy(quotes, 'timestamp')
        } else if (this.sortMethod === 'newest') {
          return _.reverse(_.sortBy(quotes, 'timestamp'))
        } else {
          return getRandomizedArray(quotes)
        }
      },
      applyFilter: function () {
        this.$emit('filter-changed', this.sort(this.quotesByAuthor))
        this.close()
      },
      close: function () {
        this.$emit('hide-filters')
      }
    }
  }
</script>

<style lang="scss">
  .buttons {
    text-align: right;
    flex: 1 0 auto;
  }
</style>
