<template>
  <h1>Login</h1>
  <form @submit.prevent="handleSubmit">
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <label>Password:</label>
    <input type="password" required v-model="password" />
    <div class="error" v-if="passwordError">{{ passwordError }}</div>
    <div class="error" v-if="credentialsError">{{ credentialsError }}</div>
    <button type="submit">Login</button>
    <p>Don't have an account? <a href="/signup">Sign Up.</a></p>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordError: '',
      credentialsError: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.passwordError = ''
      this.credentialsError = ''
      if (this.password.length < 4 || this.password.length > 20) {
        this.passwordError = 'Password must be between 4 and 20 characters.'
        return
      }
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
          email: this.email,
          password: this.password
        })
        const token = response.data.token
        localStorage.setItem('token', token)
        alert('Logged in successfully.')

        this.$router.push({ path: '/' }).then(() => {
          this.$router.go(0)
        })
      } catch (err) {
        if (err.response.status === 401) {
          this.credentialsError =
            "The email or password you entered doesn't match our records. Please try again."
        } else {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style scoped>
h1 {
  padding: 20px 0;
  text-align: center;
  font-weight: bold;
}
form {
  background: white;
  text-align: left;
  border-radius: 10px;
}
label {
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  width: 40vw;
  display: block;
  padding: 10px 6px;
  border: none;
  border-bottom: 1px solid #7e7e7e8b;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
button:hover {
  cursor: pointer;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
p {
  margin-top: 10px;
}
</style>
