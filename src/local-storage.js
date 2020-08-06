const SIGNED_IN_KEY = 'isUserSignedIn'
const GITHUB_ACCESS_TOKEN_KEY = 'githubAccessToken'

function updateGithubAccessToken(token) {
  localStorage.setItem(GITHUB_ACCESS_TOKEN_KEY, token)
}

function getGithubAccessToken() {
  return localStorage.getItem(GITHUB_ACCESS_TOKEN_KEY)
}

function updateUserAuthState(user) {
  if (user) {
    localStorage.setItem(SIGNED_IN_KEY, true)
  } else {
    localStorage.removeItem(SIGNED_IN_KEY)
  }
}

function isUserSignedIn() {
  return !!localStorage.getItem(SIGNED_IN_KEY)
}

export default {
  getGithubAccessToken,
  updateGithubAccessToken,

  isUserSignedIn,
  updateUserAuthState,
}
