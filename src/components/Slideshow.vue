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
      if (newQuotes && newQuotes.length) {
        this.index = 0
        this.renderQuote()
      }
    }
  },
  methods: {
    nextSlide: function () {
      this.index = (this.index + 1) % this.quotes.length
      this.renderQuote()
    },
    previousSlide: function () {
      this.index = (this.index || this.quotes.length) - 1
      this.renderQuote()
    },
    renderQuote: function () {
      this.quote = this.quotes[this.index]
    }
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
