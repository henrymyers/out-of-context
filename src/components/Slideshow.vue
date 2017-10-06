<template>
  <div class="quote" v-if="quote">
    <h3 class="quote-text">{{quote.text}}</h3>
    <h3 class="quote-author">{{quote.author}}</h3>
    <!--<h5 class="quote-context" v-if="quote.context" v-bind:title="quote.context">?</h5>-->
  </div>
</template>

<script>

export default {
  name: 'slideshow',
  props: ['quote']
}
</script>

<style lang="scss">
  .quote {
    position: relative;
    max-width: 80%;
    padding: 0 2em;
    color: white;
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
</style>
