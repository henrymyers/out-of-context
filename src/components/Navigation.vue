<template>
  <div class="navigation footer">
    <button v-on:click="previous" :disabled="quotes.length < 2">&#x2190;</button>
    <button v-on:click="showFilters">Filter</button>
    <button v-on:click="cancelAutoplay" v-if="autoplay">Pause</button>
    <button v-on:click="startAutoplay" v-if="!autoplay" :disabled="quotes.length < 2">Play</button>
    <button v-on:click="next" :disabled="quotes.length < 2">&#x2192;</button>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    props: ['quotes', 'quoteIndex'],
    data () {
      return {
        autoplay: null
      }
    },
    methods: {
      startAutoplay: function () {
        if (!this.autoplay) {
          this.autoplay = setInterval(this.next, 7000, false)
        }
      },
      cancelAutoplay: function () {
        if (this.autoplay) {
          clearInterval(this.autoplay)
          this.autoplay = null
        }
      },
      next: function (manuallyTriggered = true) {
        if (manuallyTriggered) this.cancelAutoplay()
        this.$emit('index-changed', (this.quoteIndex + 1) % this.quotes.length)
      },
      previous: function () {
        this.cancelAutoplay()
        this.$emit('index-changed', (this.quoteIndex || this.quotes.length) - 1)
      },
      showFilters: function () {
        this.cancelAutoplay()
        this.$emit('show-filters')
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
      this.startAutoplay()
    },
    beforeDestroy () {
      window.removeEventListener('keyup', this.onKeyUp)
      this.cancelAutoplay()
    }
  }
</script>

<style lang="scss"></style>
