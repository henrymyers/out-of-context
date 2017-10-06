<template>
  <div class=navigation>
    <button :disabled="quotes.length < 2" v-on:click="previous">Previous</button>
    <button v-on:click="$emit('show-filters')">Filter</button>
    <button :disabled="quotes.length < 2" v-on:click="next">Next</button>
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

<style lang="scss">
  .navigation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1em;

    button {
      color: white;
      text-shadow: 1px 2px 3px black;
      background-color: rgba(150, 150, 150, 0.1);
      border-color: white;
    }

    button:disabled {
      opacity: 0.5;
    }
  }
</style>
