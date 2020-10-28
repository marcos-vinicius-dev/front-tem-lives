<script>
import calendar from '../components/calendar/Calendar.vue'
import cardLive from '../components/CardLive.vue'
import categories from '../components/graphql/queries/categories.vue'
import lives from '../components/graphql/queries/lives.vue'

export default {
  name: 'PageIndex',

  components: {
    calendar,
    cardLive,
    categories,
    lives
  },

  data () {
    return {
      lives: '',
      name: '',
      email: '',
      date: '',
      category: '',
      categories: null,
      slide: 1
    }
  },

  methods: {
    resultCategories (value) {
      this.categories = value.categories
    },
    resultLives (value) {
      this.lives = value
    }
  }
}
</script>
<template lang="pug">
div(class="bg-grey-2")
  div(class="row justify-center q-col-gutter-md")
    div(class="col-12 col-md-10 text-h5 text-weight-bold text-secondary")
      q-carousel(
        animated
        arrows
        infinite
        navigation
        height="600px"
        class="rounded-borders"
        v-model="slide"
      )
        q-carousel-slide(
          img-src="../statics/banner1.png"
          :name="1"
        )

  div(
    class="row justify-center justify-md-end"
    :style="$q.screen.lt.md ? 'margin-top: -120px' : 'margin-top: -60px'"
  )
    div(class="col-10 col-md-8")
      q-card(
        class="q-pa-lg"
        style="box-shadow: 0px 4px 15px rgba(198, 198, 198, 0.35)"
      )
        div(class="row justify-center items-center q-col-gutter-sm")
          div(class="col-12 col-md-3")
            categories(
              class="full-width"
              @done="resultCategories"
            )
              q-select(
                filled
                label="Categoria"
                v-model="category"
                :options="categories"
              )

          div(class="col-12 col-md-3")
            calendar(
              :date="date"
              @input="(value) => date = value"
            )

          div(class="col-12 col-md-3")
            q-btn(
              no-caps
              unelevated
              class="full-height full-width text-subtitle1 text-bold"
              color="primary"
              label="Buscar live"
              style="max-height: 56px; height: 100px !important;"
              @click="$router.push({ name: 'livesSearch', params: { date: date, category: category.value }})"
            )

  div
    div(class="row justify-center q-mt-xl q-col-gutter-md")
      div(class="col-10 col-md-8 text-weight-bold text-secondary q-mb-sm")
        h1
         | Próximos eventos

      // apollo-query(
      //   v-slot="{ result, gqlError, isLoading }"
      //   :query="require('../gql/me.gql')"
      //   @result="result => $emit('done', result)"
      //   @loading="isLoading => $emit('loading', isLoading)"
      // )
      //   slot(
      //     :data="result"
      //     :error="gqlError"
      //     :loading="isLoading"
      //   )
      //     | {{result.data.me}}

      div(class="col-10 col-md-8")
        lives(
          class="full-width"
          @done="resultLives"
        )
          div(
            class="row q-col-gutter-md justify-start"
            v-="lives"
          )
            div(
              class="col-12 col-md-4"
              v-for="(live, index) in lives" :key="`live-${index}`"
            )
              cardLive(
                :live="live"
              )

      div(class="col-10 col-md-8 text-h5 text-weight-bold text-secondary q-mb-sm q-my-xl")
        div(class="row justify-center")
          //- q-btn(
          //-   no-caps
          //-   unelevated
          //-   class="text-weight-medium full-height text-subtitle1"
          //-   label="Ver todas lives"
          //-   style="background: #e8e6f8"
          //-   text-color="primary"
          //-   @click="$router.push({ name: 'livesSearch', params: { date: date, category: category.value }})"
          //- )

</template>
