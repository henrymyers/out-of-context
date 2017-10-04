<template>
  <div class="filters">
    <select v-model="selectedAuthor">
      <option value="">All authors</option>
      <option v-for="author in authors">{{ author }}</option>
    </select>
  </div>
</template>

<script>
  let _ = require('lodash')

  export default {
    name: 'filters',
    props: ['quotes'],
    data () {
      return {
        selectedAuthor: null
      }
    },
    computed: {
      authors: function () {
        console.log(_.uniq(_.map(this.quotes, 'author')))
        return _.uniq(_.map(this.quotes, 'author'))
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
    /*width: 100%;*/
    /*background-image: url('../assets/default-bg.jpg');*/
    /*background-attachment: fixed;*/
    /*background-size: cover;*/
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
  }

  table {
    background-color: rgba(255,255,255,0.5);
  }
</style>
