<script>
import { date } from 'quasar'

export default {
  name: 'CalendarReadonly',

  props: {
    date: {
      type: String,
      require: true
    }
  },

  data () {
    return {
      dateLocal: '',
      hour: ''
    }
  },

  watch: {
    date: {
      immediate: true,
      handler (val) {
        this.formatDate(val)
      }
    }
  },

  methods: {
    resultLives (result) {
      this.lives = result.filterLives
    },

    formatDate (value) {
      if (value) {
        this.hour = date.formatDate(value, 'HH:mm')
        this.dateLocal = date.formatDate(value, 'DD/MM/YYYY')
      } else {
        this.hour = this.nowDate('HH:mm')
        this.dateLocal = this.nowDate('DD/MM/YYYY')
      }
    },

    nowDate (format) {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, format)
    }
  }
}
</script>
<template lang="pug">
q-date(
  readonly
  v-model="dateLocal"
  mask="DD/MM/YYYY"
)
  q-card(
    class="bg-primary text-h5 text-white full-width q-pa-md"
    style="margin-top: -40px;"
  )
    div(class="q-date__header-subtitle q-date__header-link cursor-pointer")
      | Horário de Brasília
    div(class="q-date__header-title")
      | {{ hour }}

</template>
