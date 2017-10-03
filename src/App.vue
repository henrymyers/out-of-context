<template>
  <slideshow :quotes="displayedQuotes"></slideshow>
</template>

<script>
  import Slideshow from './components/Slideshow.vue'

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
    components: {Slideshow},
    name: 'app',
    data () {
      return {
        loading: true,
        errors: [],
        allQuotes: [],
        displayedQuotes: []
      }
    },
    methods: {
      setDisplayedQuotes: function (quotes) {
        this.displayedQuotes = quotes || this.allQuotes
      }
    },
    created () {
      let quotesApi = 'https://spreadsheets.google.com/feeds/list/1-wxLMgOX_jNayPD7u_w07gkuLnVZ1TJxvg9Je9yQj98/1/public/values?alt=json'
      let backgroundsApi = 'https://spreadsheets.google.com/feeds/list/1IlMhfGYrm9qWMeLEZ5hGnicD3ugaoJTM3u_zfNJEybI/1/public/values?alt=json'
      let defaultBackground = './assets/default-bg.jpg'

      getJSON(backgroundsApi, (error, response) => {
        if (error) this.errors.push(error)

        let backgrounds = (response && response.feed && response.feed.entry) || []
        backgrounds = _.map(backgrounds, 'gsx$imageurl.$t')
        backgrounds = getRandomizedArray(backgrounds)

        getJSON(quotesApi, (error, response) => {
          if (error) this.errors.push(error)

          let quotes = (response && response.feed && response.feed.entry) || []
          console.log('>>>> quotes = ', quotes)
          this.allQuotes = _.map(quotes, (quote, index) => {
            return {
              text: quote.gsx$quote && quote.gsx$quote.$t,
              author: quote.gsx$author && quote.gsx$author.$t,
              context: quote.gsx$contextoptional && quote.gsx$contextoptional.$t,
              exclude: !!(quote.gsx$excludefromslideshow && quote.gsx$excludefromslideshow.$t),
              background: backgrounds[index % backgrounds.length] || defaultBackground
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

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
}
</style>
