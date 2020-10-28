<script>
import live from '../components/graphql/queries/live.vue'
import CalendarReadonly from '../components/calendar/CalendarReadonly.vue'
import { ShareNetwork } from 'vue-social-sharing'

export default {
  name: 'PageLive',

  components: {
    live,
    CalendarReadonly,
    ShareNetwork
  },

  data () {
    return {
      title: '',
      description: '',
      keywords: '',
      date: '',
      slug: null,
      live: null
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler (val) {
        this.slug = val.params.slug
      }
    }
  },

  meta () {
    return {
      title: this.title,
      meta: {
        description: { name: 'description', content: this.description },
        keywords: { name: 'keywords', content: this.keywords }
      }
    }
  },

  methods: {
    setAnotherTitle (seo) {
      if (seo) {
        this.title = seo.title
        this.description = seo.description
        this.keywords = seo.keywords
      }
    },

    resultLive (result) {
      this.live = result
      this.date = this.live.date
      this.setAnotherTitle(this.live.seo)
    }
  }
}
</script>

<template lang="pug">
  live(
    class="full-width bg-grey-2"
    :slug="slug"
    @done="resultLive"
  )
    div(v-if="live")
      div(class="row justify-center q-col-gutter-md")
        div(class="col-12 col-md-10 text-h5 text-weight-bold text-secondary")
          q-img(
            native-context-menu
            style="width: 100%"
            height="600px"
            class="rounded-borders"
            :src="live.coverImage.url"
          )

            div(class="absolute-top-left bg-transparent")
              q-btn(
                unelevated
                class="text-bold"
                text-color="primary"
                style="background: #e8e6f8"
                @click="$router.go(-1)"
              )
                div(class="row q-col-gutter-sm justify-center items-center")
                  q-icon(
                    size="30"
                    :name="require('@quasar/extras/mdi-v5').mdiArrowLeft"
                  )
                  div
                    | Voltar

            div(class="absolute-top-right full-height bg-transparent mobile-hide q-mr-md")
              div(class="row items-center justify-center full-height text-body1 text-grey-7")
                CalendarReadonly(:date="date")

      div(
        class="row items-center justify-center full-height text-body1 text-grey-7 desktop-hide"
        style="margin-top: -250px;"
      )
        CalendarReadonly(
          style="z-index: 1"
          :date="date"
        )

      div(class="row justify-center items-start q-col-gutter-xl q-py-xl")
        div(class="col-10 col-md-6")
          div(class="text-h1 text-capitalize text-bold q-mb-md text-grey-10")
            h1
              | {{ live.title }}

          div(
            class="text-body1 text-grey-7 q-mb-md q-mt-xl"
            v-html="live.content.html"
          )

          div(class="text-h5 text-bold q-mb-md q-mt-xl text-grey-10")
            | Tags

          div(class="row q-col-gutter-sm text-body1 text-grey-7 q-mb-sm")
            div(
              v-for="tag in live.tags"
              :key="tag.index"
            )
              q-chip(
                class="text-subtitle2 text-uppercase text-bold text-white"
                color="secondary"
              )
                | {{ tag }}

        div(class="col-10 col-md-2")
          div(class="text-h5 text-bold q-mb-md text-grey-10")
            | Compartilhe

          div(class="row q-col-gutter-sm text-body1 text-grey-7 q-mb-md")
            div
              ShareNetwork(
                class="full-width full-height"
                network="facebook"
                url="https://news.vuejs.org/issues/180"
                :title="live.title"
              )
                q-btn(
                  round
                  color="primary"
                  class="justify-center"
                )
                  q-icon(
                    size="28px"
                    :name="require('@quasar/extras/mdi-v5').mdiFacebook"
                  )
            div
              ShareNetwork(
                class="full-width full-height"
                network="twitter"
                url="https://news.vuejs.org/issues/180"
                :title="live.title"
              )
                q-btn(
                  round
                  color="secondary"
                  class="justify-center"
                )
                  q-icon(
                    size="28px"
                    :name="require('@quasar/extras/mdi-v5').mdiTwitter"
                  )

            div
              ShareNetwork(
                class="full-width full-height"
                network="whatsApp"
                url="https://news.vuejs.org/issues/180"
                :title="live.title"
              )
                q-btn(
                  round
                  color="green-5"
                  class="justify-center"
                )
                  q-icon(
                    size="28px"
                    :name="require('@quasar/extras/mdi-v5').mdiWhatsapp"
                  )
</template>
