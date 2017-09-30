<template>
  <router-view :quotes="displayedQuotes"></router-view>
</template>

<script>
  let getJSON = require('get-json')
  let _ = require('lodash')

  function getRandomizedArray (arr) {
    if (!arr.length) {
      return []
    }
    var randomIndex = Math.floor(Math.random() * arr.length)
    return arr.splice(randomIndex, 1).concat(getRandomizedArray(arr))
  }

  export default {
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
      reloadData: function () {
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
            this.allQuotes = _.map(quotes, (quote, index) => {
              return {
                text: quote.gsx$quote && quote.gsx$quote.$t,
                author: quote.gsx$author && quote.gsx$author.$t,
                context: quote.gsx$context && quote.gsx$context.$t,
                exclude: !!(quote.gsx$excludefromslideshow && quote.gsx$excludefromslideshow.$t),
                background: backgrounds[index % backgrounds.length] || defaultBackground
              }
            })
            this.setDisplayedQuotes(this.allQuotes.slice(0, 3))
          })
        })
      },
      setDisplayedQuotes: function (quotes = []) {
        this.displayedQuotes = quotes
      }
    },
    created () {
      this.reloadData()
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
