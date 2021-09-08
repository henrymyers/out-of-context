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
  import { getGoogleJsonSheet } from './utils/getGoogleJsonSheet'

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
      const quotesSheetId = '1-wxLMgOX_jNayPD7u_w07gkuLnVZ1TJxvg9Je9yQj98'
      const backgroundSheetId = '1IlMhfGYrm9qWMeLEZ5hGnicD3ugaoJTM3u_zfNJEybI'

      const feedBackgrounds = () => {
        getGoogleJsonSheet(backgroundSheetId)
          .then(sheet => {
            const backgroundsTemp = (sheet && sheet.table && sheet.table.rows) || []
            this.backgrounds = getRandomizedArray(_.map(backgroundsTemp, cell => cell && cell.c[0] && cell.c[0].v))
          })
          .catch(error => {
            if (error) this.errors.push(error)
          })
      }

      const feedQuotes = () => {
        getGoogleJsonSheet(quotesSheetId)
          .then(sheet => {
            let quotes = (sheet && sheet.table && sheet.table.rows) || []
            quotes = _.map(quotes, (quote) => {
              // It would be better to dynamically find the idexes from the table cols...
              return {
                timestamp: quote && quote.c[0] && quote.c[0].v && new Date(quote.c[0].f),
                author: quote && quote.c[1] && quote.c[1].v,
                text: quote && quote.c[2] && quote.c[2].v,
                context: quote && quote.c[3] && quote.c[3].v,
                exclude: !!(quote && quote.c[5] && quote.c[5].v)
              }
            })

            this.allQuotes = getRandomizedArray(quotes)
            this.setDisplayedQuotes(this.allQuotes)
            this.loading = false
          })
          .catch(error => {
            if (error) this.errors.push(error)
          })
      }

      feedBackgrounds()
      feedQuotes()
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
