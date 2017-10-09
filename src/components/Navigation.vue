<template>
  <div class="navigation footer">
    <button :disabled="quotes.length < 2" v-on:click="previous">&#x2190;</button>
    <button v-on:click="$emit('show-filters')">Filter</button>
    <button :disabled="quotes.length < 2" v-on:click="next">&#x2192;</button>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    props: ['quotes', 'quoteIndex'],
    methods: {
      next: function () {
        this.$emit('index-changed', (this.quoteIndex + 1) % this.quotes.length)
      },
      previous: function () {
        this.$emit('index-changed', (this.quoteIndex || this.quotes.length) - 1)
      },
      onKeyUp: function (event) {
        let key = event.which || event.keyCode
        switch (key) {
          case 37:
            this.previous()
            break
          case 39:
            this.next()
            break
        }
      }
    },
    created () {
      window.addEventListener('keyup', this.onKeyUp)
    },
    beforeDestroy () {
      window.removeEventListener('keyup', this.onKeyUp)
    }
  }
</script>

<style lang="scss"></style>
