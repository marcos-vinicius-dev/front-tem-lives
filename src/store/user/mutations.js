export function isAuthenticated (state, data) {
  state.isAuthenticated = data
}

export function token (state, data) {
  state.token = data
}
