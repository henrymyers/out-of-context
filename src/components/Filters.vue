<template>
  <div class="filters">
    <div>
      <select v-model="selectedAuthor">
        <option value="">All authors</option>
        <option v-for="author in authors">{{ author }}</option>
      </select>
    </div>
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.2);
  }

  table {
    background-color: rgba(255,255,255,0.5);
  }
</style>
