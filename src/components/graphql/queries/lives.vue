<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :variables="{ date_gte: date }"
  :query="require('../../../gql/lives.gql')"
  @result="result => $emit('done', result.data.lives)"
  @loading="isLoading => $emit('loading', isLoading)"
)
  slot(
    :data="result"
    :error="gqlError"
    :loading="isLoading"
  )

</template>
<script>
import { date } from 'quasar'

export default {
  name: 'lives',

  data () {
    return {
      date: ''
    }
  },

  created () {
    this.date = this.nowDate()
  },

  methods: {
    nowDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    }
  }
}
</script>
