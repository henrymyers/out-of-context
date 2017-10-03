<template>
  <div v-if="quote" class="slideshow" v-bind:style="{backgroundImage: `url(${quote.background})`}">
    <div class="quote">
      <h3 class="quote-text">{{quote.text}}</h3>
      <h3 class="quote-author">{{quote.author}}</h3>
    </div>

    <div class=navbar>
      <button v-on:click="previousSlide" class="previous">Previous</button>
      <button v-on:click="nextSlide" class="next">Next</button>
    </div>
  </div>
</template>

<script>
import ImagePreloader from 'image-preloader'

let preloader = new ImagePreloader()

export default {
  name: 'slideshow',
  data () {
    return {
      quote: null,
      index: 0
    }
  },
  props: ['quotes'],
  watch: {
    quotes: function (newQuotes) {
      // Every time the list of quotes changes, select the first one
      if (newQuotes && newQuotes.length) {
        this.selectQuote(0)
        if (newQuotes.length > 1) this.preloadBackground(1) // Preload next quote's background
        if (newQuotes.length > 2) this.preloadBackground(this.quotes.length - 1) // Preload previous quote's background
      }
    }
  },
  methods: {
    nextSlide: function () {
      let nextIndex = (this.index + 1) % this.quotes.length
      let secondNextIndex = (nextIndex + 1) % this.quotes.length
      this.selectQuote(nextIndex)
      this.preloadBackground(secondNextIndex)
    },
    previousSlide: function () {
      let previousIndex = (this.index || this.quotes.length) - 1
      let secondPreviousIndex = (previousIndex || this.quotes.length) - 1
      this.selectQuote(previousIndex)
      this.preloadBackground(secondPreviousIndex)
    },
    selectQuote: function (index) {
      this.index = index
      this.quote = this.quotes[index]
    },
    preloadBackground: function (index) {
      preloader.preload(this.quotes[index].background)
    },
    onKeyUp: function (event) {
      let key = event.which || event.keyCode
      switch (key) {
        case 37:
          this.previousSlide()
          break
        case 39:
          this.nextSlide()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $colorPrimary: white;

  .slideshow {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #3e506d;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: background-image 1s ease-in-out;
  }

  .quote {
    max-width: 80%;
    padding: 0 2em;
    color: $colorPrimary;
    text-shadow: 1px 2px 3px black;
    font-family: Copperplate, "Copperplate Gothic Light", sans-serif;

    &-text {
      font-size: 4vw;
    }
    &-author {
      font-size: 3vw;
      text-align: right;
    }
  }

  .navbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1em;

    button {
      color: $colorPrimary;
      text-shadow: 1px 2px 3px black;
      background-color: rgba(150, 150, 150, 0.1);
      border-color: $colorPrimary;
      margin-bottom: 0;
    }
  }
</style>
