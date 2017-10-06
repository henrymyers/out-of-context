<template>
  <div v-if="background" class="background" v-bind:style="{backgroundImage: `url(${background})`}"></div>
</template>

<script>
import ImagePreloader from 'image-preloader'

let preloader = new ImagePreloader()
let defaultBackground = require('../assets/default-bg.jpg')

export default {
  name: 'background',
  data () {
    return {
      background: null
    }
  },
  props: ['backgrounds', 'quoteIndex'],
  watch: {
    quoteIndex: function (quoteIndex) {
      let index = quoteIndex % this.backgrounds.length
      let previousIndex = (index || this.backgrounds.length) - 1
      let nextIndex = (index + 1) % this.backgrounds.length

      preloader.preload(this.getBackgroundFromIndex(previousIndex), this.getBackgroundFromIndex(nextIndex))

      this.background = this.getBackgroundFromIndex(index)
    }
  },
  methods: {
    getBackgroundFromIndex: function (index) {
      return this.backgrounds[index] || defaultBackground
    }
  }
}
</script>

<style lang="scss">
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: background-image 1s ease-in-out;
  }
</style>
