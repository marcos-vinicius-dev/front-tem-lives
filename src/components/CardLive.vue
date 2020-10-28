<script>
import { date } from 'quasar'

export default {
  name: 'Calendar',

  props: {
    live: {
      type: Object,
      require: true
    }
  },

  methods: {
    dateFormated (type) {
      return date.formatDate(this.live.date, type)
    }
  }
}
</script>
<template lang="pug">
q-card(
  flat
  class="q-pa-md-md"
)
  q-img(
    native-context-menu
    :src="live.coverImage.url"
  )
    div(class="row q-col-gutter-sm absolute-top-right all-pointer-events bg-transparent")
      div
        q-btn(
          round
          color="white"
          text-color="grey-9"
          :icon="require('@quasar/extras/mdi-v5').mdiShareVariant"
        )
      div
        q-btn(
          round
          color="white"
          text-color="secondary"
          :icon="require('@quasar/extras/mdi-v5').mdiHeartOutline"
        )

  div(
    class="row full-width q-py-md no-wrap q-px-sm q-col-gutter-lg cursor-pointer"
    @click="$router.push({ name: 'live', params: { slug: live.slug } })"
  )
    div(class="row column items-center")
      div(class="text-bold text-primary text-subtitle1")
        |  {{ dateFormated('MMM') }}

      div(class="text-bold text-h6 text-grey-10")
        |  {{ dateFormated('DD') }}

    div(class="row justify-center")
      div(class="text-h6 text-bold text-capitalize full-width")
        | {{ live.title }}

      div(class="text-subtitle1 text-capitalize full-width ellipsis-2-lines")
        | {{ live.content.text }}

</template>
