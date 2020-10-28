<template lang="pug">
apollo-query(
  v-slot="{ result, gqlError, isLoading }"
  :query="require('../../../gql/live.gql')"
  :variables="{slug: slug}"
  @result="result => $emit('done', result.data.live)"
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
  name: 'lives',

  props: {
    slug: {
      type: String,
      required: true
    }
  }
}
</script>
