<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :query="require('../../../gql/filterLives.gql')"
  :variables="{ _search: _search, date_gte: `${date}T00:00:00.000Z`, date_lte: `${date}T23:59:59.999Z`, category_some: { value_contains: category_some }}"
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
export default {
  name: 'liveSearch',

  props: {
    _search: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    category_some: {
      type: String,
      required: true
    }
  }
}
</script>
