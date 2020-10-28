import Vue from 'vue'
import { setContext } from 'apollo-link-context'

export function apolloClientBeforeCreate ({ apolloClientConfigObj }/* { apolloClientConfigObj, app, router, store, ssrContext, urlPath, redirect } */) {
  // const AUTH_TOKEN_NAME = 'apollo-token'

  function defaultGetAuth () {
    if (Vue.prototype.$q && Vue.prototype.$q.cookies) {
      // const token = Vue.prototype.$q.cookies.get(AUTH_TOKEN_NAME)
      // return token ? 'Bearer ' + token : ''
      return 'Bearer'
    }
    return ''
  }

  const authLink = setContext((_, { headers }) => {
    const authorization = defaultGetAuth()
    const authorizationHeader = authorization ? { authorization } : {}
    return {
      headers: {
        ...headers,
        ...authorizationHeader
      }
    }
  })

  apolloClientConfigObj.link = authLink.concat(apolloClientConfigObj.link)
}

export function apolloClientAfterCreate (/* { apolloClient, app, router, store, ssrContext, urlPath, redirect } */) {
  // if needed you can modify here the created apollo client
}
