import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { ref, reactive, watch } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'

const emailClaims = 'email'
const rolesClaims = 'role'
const userIdClaim = 'user_id'
const sessionId = 'session_id'
const ouathProvider = 'oauth_provider'
const adminRole = 'ADMIN'
export const useUserStore = defineStore('user', () => {
  const authToken = useStorage('authToken', null)
  const jwtObject = ref(useJwt(authToken.value))
  const user = reactive({
    id: null,
    email: null,
    sessionId: null,
    oauthProvider: null,
    roles: []
  })
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)
  watch(
    authToken,
    (value) => {
      if (value) {
        jwtObject.value = useJwt(value)
      }
      if (jwtObject.value?.payload) {
        user.id = jwtObject.value.payload[userIdClaim]
        user.email = jwtObject.value.payload[emailClaims]
        user.roles = jwtObject.value.payload[rolesClaims]
        user.sessionId = jwtObject.value.payload[sessionId]
        user.oauthProvider = jwtObject.value.payload[ouathProvider]
        isAuthenticated.value = jwtObject.value.payload.exp > Date.now() / 1000
        isAdmin.value = user.roles?.includes(adminRole) || user.roles === adminRole
        if (!isAuthenticated.value && authToken.value) {
          authToken.value = null
        }
      }
    },
    { immediate: true }
  )
  function logout() {
    authToken.value = null
  }
  return { user, isAuthenticated, isAdmin, authToken, logout }
})
