<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <div v-if="isAuthenticated">
            <li>
              <p>Welcome, {{ email }}</p>
            </li>
            <li><button @click="logout">Logout</button></li>
          </div>
          <div v-else>
            <li><RouterLink to="/signup">Sign Up</RouterLink></li>
            <li><RouterLink to="/login">Login</RouterLink></li>
          </div>
        </ul>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import jwt_decode from 'vue-jwt-decode'

export default {
  data() {
    return {
      isAuthenticated: false,
      email: ''
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.isAuthenticated = true
      this.username = this.getEmailFromToken(token)
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.isAuthenticated = false
      this.$router.push('/login')
    },
    getEmailFromToken(token) {
      const decodedToken = jwt_decode.decode(token)
      this.email = decodedToken.email
      return decodedToken.email
    }
  }
}
</script>

<style scoped>
header {
  max-height: 64px;
  font-size: 20px;
}
ul {
  margin: 10px 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
li {
  display: inline-block;
  list-style: none;
  margin: 0 10px;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  font-size: 0.7em;
  color: white;
  border-radius: 20px;
}
button:hover {
  cursor: pointer;
}
</style>
