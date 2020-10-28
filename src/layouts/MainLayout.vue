<script>

import UserDropdown from '../components/UserDropdown.vue'

export default {
  name: 'MainLayout',

  components: {
    UserDropdown
  },

  data () {
    return {
    }
  }
}
</script>

<template lang="pug">
  q-layout(view='hHh lpR fff')
    q-header(
      class="bg-white text-grey-9"
    )
      q-toolbar(
        class="justify-center q-pa-md"
        style="min-height:80px"
      )
        div(class="col-12 col-md-10")
          q-toolbar-title
            q-btn(
              flat
              no-caps
              rounded
              class="text-weight-bold text-body1 bg-primary text-white"
              to="/"
            )
              q-icon(
                size="15"
                class="q-mr-xs"
                :name="require('@quasar/extras/mdi-v5').mdiCircle"
              )
              | Tem Lives

    q-page-container
      q-page(class="bg-grey-2")
        router-view

    q-footer(
      bordered
      class="bg-primary"
    )
      .row.justify-center
        .col-10
          .row.justify-center.q-py-xl.text-white.q-col-gutter-lg
            .col-6.col-md-2(
              v-for="n in 4"
              :key="`xs-${n}`"
            )
              div(class="text-subtitle1 text-weight-bold q-mb-sm")
                | Quem somos
              div
                | All jobs
              div
                | Post your job

</template>
