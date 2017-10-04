<template>
  <div class="app">
    <!--loader-->
    <div class="background" v-if="displayedBackground" v-bind:style="{backgroundImage: `url(${displayedBackground})`}"></div>
    <slideshow
      :quotes="displayedQuotes"
      :backgrounds="backgrounds"
      v-show="!showFilters"
      v-on:toggle-filters="showFilters = !showFilters"
      v-on:background-changed="setDisplayedBackground"></slideshow>
    <filters v-show="showFilters" :quotes="allQuotes"></filters>
  </div>
</template>

<script>
  import Slideshow from './components/Slideshow.vue'
  import Filters from './components/Filters.vue'

  let getJSON = require('get-json')
  let _ = require('lodash')

  function getRandomizedArray (arr) {
    if (!arr.length) {
      return []
    }
    let randomIndex = Math.floor(Math.random() * arr.length)
    return arr.splice(randomIndex, 1).concat(getRandomizedArray(arr))
  }

  export default {
    components: {Slideshow, Filters},
    name: 'app',
    data () {
      return {
        loading: true,
        showFilters: false,
        errors: [],
        backgrounds: [],
        allQuotes: [],
        displayedBackground: null,
        displayedQuotes: []
      }
    },
    methods: {
      setDisplayedQuotes: function (quotes) {
        this.displayedQuotes = quotes || this.allQuotes
      },
      setDisplayedBackground: function (background) {
        this.displayedBackground = background
      }
    },
    created () {
      let quotesApi = 'https://spreadsheets.google.com/feeds/list/1-wxLMgOX_jNayPD7u_w07gkuLnVZ1TJxvg9Je9yQj98/1/public/values?alt=json'
      let backgroundsApi = 'https://spreadsheets.google.com/feeds/list/1IlMhfGYrm9qWMeLEZ5hGnicD3ugaoJTM3u_zfNJEybI/1/public/values?alt=json'

      getJSON(backgroundsApi, (error, response) => {
        if (error) this.errors.push(error)

        let backgrounds = (response && response.feed && response.feed.entry) || []
        this.backgrounds = getRandomizedArray(_.map(backgrounds, 'gsx$imageurl.$t'))

        getJSON(quotesApi, (error, response) => {
          if (error) this.errors.push(error)

          let quotes = (response && response.feed && response.feed.entry) || []
          this.allQuotes = _.map(quotes, (quote) => {
            return {
              text: quote.gsx$quote && quote.gsx$quote.$t,
              author: quote.gsx$author && quote.gsx$author.$t,
              context: quote.gsx$contextoptional && quote.gsx$contextoptional.$t,
              timestamp: new Date(quote.gsx$timestamp && quote.gsx$timestamp.$t),
              exclude: !!(quote.gsx$excludefromslideshow && quote.gsx$excludefromslideshow.$t)
            }
          })
          this.setDisplayedQuotes(getRandomizedArray(this.allQuotes).slice(0, 20))
        })
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
