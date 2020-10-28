<script>
import livesSearch from '../components/graphql/queries/livesSearch.vue'
import calendar from '../components/calendar/Calendar.vue'
import cardLive from '../components/CardLive.vue'

export default {
  name: 'LivesSearch',

  components: {
    calendar,
    livesSearch,
    cardLive
  },

  data () {
    return {
      search: '',
      current: 1,
      date: '',
      category_some: '',
      lives: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Todas'
      ],
      sort: 'A-Z',
      sortOptions: [
        'A-Z',
        'Z-A'
      ]
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler (val) {
        this.date = val.params.date
        this.category_some = val.params.category
      }
    }
  },

  methods: {
    resultLives (result) {
      this.lives = result
    }
  }
}
</script>

<template lang="pug">
div(class="row justify-center q-py-xl")
  div(class="col-10 col-md-8")
    h1(class="text-primary q-mb-md")
      | Buscar Lives

    div(class="row justify-md-start items-center q-col-gutter-sm q-pt-sm")
      div(class="col-12")
        q-input(
          filled
          placeholder="Buscar por nome ou descrição"
          v-model="search"
        )
          template(v-slot:append)
            q-icon.cursor-pointer(:name="require('@quasar/extras/mdi-v5').mdiMagnify")

      div(class="col-12 col-md-4")
        q-select(
          filled
          v-model="category_some"
          :options="options"
          label="Categoria"
        )

      div(class="col-12 col-md-4")
        calendar(
          :date="date"
          @input="(value) => date = value"
        )

      div(class="col-12 col-md-4")
        q-select(
          filled
          v-model="sort"
          :options="sortOptions"
          label="Ordenar"
        )

    livesSearch(
      class="row justify-start q-pt-xl full-width"
      :_search ="search"
      :date="date"
      :category_some="category_some"
      @done="resultLives"
    )
      div(class="col-12")
        div(
          class="row q-col-gutter-md justify-start"
          v-if="lives"
        )
          div(
            class="col-12 col-md-4"
            v-for="(live, index) in lives" :key="`live-${index}`"
          )
            cardLive(:live="live")

    //- div(class="row justify-center q-mt-xl")
    //-   q-pagination(
    //-     v-model="current"
    //-     :max="5"
    //-     :direction-links="true"
    //-   )

</template>
