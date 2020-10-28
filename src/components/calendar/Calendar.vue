<script>
import { date } from 'quasar'

export default {
  name: 'Calendar',

  props: {
    date: {
      type: String,
      require: true
    }
  },

  data () {
    return {
      dateLocal: ''
    }
  },

  watch: {
    date: {
      immediate: true,
      handler (val) {
        this.dateLocal = this.formatDate(val)
        this.parseDate(this.dateLocal)
      }
    }
  },

  methods: {
    resultLives (result) {
      this.lives = result.filterLives
    },

    formatDate (value) {
      if (value) {
        return date.formatDate(`${value} 00:00`, 'DD/MM/YYYY')
      } else {
        return this.nowDate('DD/MM/YYYY')
      }
    },

    parseDate (value) {
      const [day, month, year] = value.split('/')
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      this.$emit('input', date.formatDate(`${formattedDate} 00:00`, 'YYYY-MM-DD'))
    },

    nowDate (format) {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, format)
    },

    optionsFn (value) {
      return value >= this.nowDate('YYYY/MM/DD')
    }
  }
}
</script>
<template lang="pug">
q-input(
  filled
  mask="##/##/####"
  label="Data"
  v-model="dateLocal"
)
  template(v-slot:append)
    q-icon.cursor-pointer(:name="require('@quasar/extras/mdi-v5').mdiCalendar")
      q-popup-proxy(transition-show="scale" transition-hide="scale")
        q-date(
          basic
          v-model="dateLocal"
          mask="DD/MM/YYYY"
          :options="optionsFn"
          @input="parseDate"
        )
</template>
