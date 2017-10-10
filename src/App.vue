<template>
  <div class="app">

    <div v-if="loading" class="loader"></div>

    <background :backgrounds="backgrounds" :quote-index="quoteIndex"></background>

    <slideshow :quote="quote"></slideshow>

    <navigation
      :quotes="displayedQuotes"
      :quote-index="quoteIndex"
      v-show="!showFilters"
      v-on:index-changed="setQuoteIndex"
      v-on:show-filters="showFilters = true"></navigation>

    <filters
      :quotes="allQuotes"
      v-show="showFilters"
      v-on:hide-filters="showFilters = false"
      v-on:filter-changed="setDisplayedQuotes"></filters>
  </div>
</template>

<script>
  import Background from './components/Background.vue'
  import Slideshow from './components/Slideshow.vue'
  import Navigation from './components/Navigation.vue'
  import Filters from './components/Filters.vue'
  import getRandomizedArray from './utils/getRandomizedArray'

  let getJSON = require('get-json')
  let _ = require('lodash')

  export default {
    components: {Background, Slideshow, Navigation, Filters},
    name: 'app',
    data () {
      return {
        loading: true,
        showFilters: false,
        errors: [],
        backgrounds: [],
        allQuotes: [],
        displayedQuotes: [],
        quoteIndex: null
      }
    },
    computed: {
      quote: function () {
        return this.displayedQuotes[this.quoteIndex]
      }
    },
    methods: {
      setDisplayedQuotes: function (quotes) {
        this.displayedQuotes = quotes || this.allQuotes
        this.quoteIndex = 0
      },
      setQuoteIndex: function (index) {
        this.quoteIndex = index
      }
    },
    created () {
      let quotesApi = 'https://spreadsheets.google.com/feeds/list/1-wxLMgOX_jNayPD7u_w07gkuLnVZ1TJxvg9Je9yQj98/1/public/values?alt=json'
      let backgroundsApi = 'https://spreadsheets.google.com/feeds/list/1IlMhfGYrm9qWMeLEZ5hGnicD3ugaoJTM3u_zfNJEybI/1/public/values?alt=json'

      getJSON(backgroundsApi, (error, response) => {
        if (error) this.errors.push(error)
        let backgrounds = (response && response.feed && response.feed.entry) || []
        this.backgrounds = getRandomizedArray(_.map(backgrounds, 'gsx$imageurl.$t'))
      })

      getJSON(quotesApi, (error, response) => {
        if (error) this.errors.push(error)

        let quotes = (response && response.feed && response.feed.entry) || []
        quotes = _.map(quotes, (quote) => {
          return {
            text: quote.gsx$quote && quote.gsx$quote.$t,
            author: quote.gsx$author && quote.gsx$author.$t,
            context: quote.gsx$contextoptional && quote.gsx$contextoptional.$t,
            timestamp: new Date(quote.gsx$timestamp && quote.gsx$timestamp.$t),
            exclude: !!(quote.gsx$excludefromslideshow && quote.gsx$excludefromslideshow.$t)
          }
        })
        this.allQuotes = getRandomizedArray(quotes)
        this.setDisplayedQuotes(this.allQuotes)
        this.loading = false
      })
    }
  }
</script>

<style lang="scss">
  @import 'sass/normalize';
  @import 'sass/skeleton';
  @import 'sass/loader';

  $colorPrimary: white;

  * {
    box-sizing: border-box;
  }

  html, body, .app {
    height: 100%;
    width: 100%;
    background-color: #3e506d;
  }

  .app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  select, label, button {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  label {
    color: $colorPrimary;
  }

  button {
    &, &:hover, &:disabled {
      color: $colorPrimary;
      border-color: $colorPrimary;
    }
    &:hover:not([disabled]) {
      background-color: rgba($colorPrimary, 0.2);
    }
    &:disabled {
      opacity: 0.5;
    }

  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
</style>
