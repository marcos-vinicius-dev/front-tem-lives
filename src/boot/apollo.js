import Vue from 'vue'
import VueApollo from 'vue-apollo'
import createApolloClient from '../graphql/create-apollo-client'
import {
  apolloProviderBeforeCreate,
  apolloProviderAfterCreate
} from 'src/apollo/apollo-provider-hooks'

// Install vue-apollo plugin
Vue.use(VueApollo)

export default ({ app, router, store, urlPath, redirect }) => {
  const AUTH_TOKEN_NAME = 'apollo-token'

  // create an 'apollo client' instance
  const apolloClient = createApolloClient({
    app,
    router,
    store,
    urlPath,
    redirect
  })

  const apolloProviderConfigObj = { defaultClient: apolloClient }

  // run hook before creating apollo provider instance
  apolloProviderBeforeCreate({
    apolloProviderConfigObj,
    app,
    router,
    store,
    urlPath,
    redirect
  })

  // create an 'apollo provider' instance
  const apolloProvider = new VueApollo(apolloProviderConfigObj)

  // run hook after creating apollo provider instance
  apolloProviderAfterCreate({
    apolloProvider,
    app,
    router,
    store,
    urlPath,
    redirect
  })

  // attach created 'apollo provider' instance to the app
  app.apolloProvider = apolloProvider

  Vue.prototype.$apolloHelpers = {
    onLogin: async (token, apolloClient = apolloProvider.defaultClient, skipResetStore = false) => {
      if (token) {
        Vue.prototype.$q.cookies.set(AUTH_TOKEN_NAME, token, { path: '/' })
        store.commit('user/isAuthenticated', true)
      }

      if (!skipResetStore) {
        try {
          await apolloClient.resetStore()
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('%cError on cache reset (setToken)', 'color: orange;', e.message)
        }
      }
    },
    onLogout: async (apolloClient = apolloProvider.defaultClient, skipResetStore = false) => {
      Vue.prototype.$q.cookies.remove(AUTH_TOKEN_NAME)
      store.commit('user/isAuthenticated', false)

      if (!skipResetStore) {
        try {
          await apolloClient.resetStore()
          return Promise.resolve()
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
          return Promise.reject()
        }
      }
    },
    getToken: (tokenName = AUTH_TOKEN_NAME) => {
      return Vue.prototype.$q.cookies.get(tokenName)
    }
  }
}
