<script>
import Me from '../components/graphql/queries/Me.vue'

export default {
  name: 'UserDropdown',

  data () {
    return {
      me: null
    }
  },

  components: {
    Me
  },

  methods: {
    resultMe (result) {
      this.me = result
    }
  }
}
</script>
<template lang="pug">
Me(
  v-if="$store.state.user.isAuthenticated"
  @done="resultMe"
)
  q-btn-dropdown(
    stretch
    flat
    v-if="me"
  )
    template(v-slot:label)
      q-avatar(
        color="grey-2"
        text-color="grey-9"
      )
        q-icon(
          class="q-pa-xs"
          :name="require('@quasar/extras/mdi-v5').mdiAccountCircleOutline"
        )

    q-list
      q-item(
        clickable
        v-close-popup
        tabindex="0"
        to="/profile"
      )
        q-item-section(avatar)
          q-icon(
            size="40px"
            color="grey-5"
            :name="require('@quasar/extras/mdi-v5').mdiAccountOutline"
          )

        q-item-section
          q-item-label
            | {{ me.name }}
          q-item-label(caption)
            | {{ me.email }}

      q-separator(inset)

      q-item(clickable v-close-popup tabindex='0')
        q-item-section
          q-item-label
            | Minhas Lives
          //- q-item-label(caption)
          //-   | February 22, 2016

</template>
