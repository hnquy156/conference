<template>
  <h1>Sign Up</h1>
  <form method="post" @submit.prevent="handleSubmit">
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <div class="error" v-if="emailError">{{ emailError }}</div>
    <label>Password:</label>
    <input type="password" required v-model="password" />
    <div class="error" v-if="passwordError">{{ passwordError }}</div>
    <button type="submit">Sign Up</button>
    <p>Already have an account? <a href="/login">Login.</a></p>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      formdata: { email: this.email, password: this.password }
    }
  },
  methods: {
    async handleSubmit() {
      this.emailError = ''
      this.passwordError = ''
      if (this.password.length < 4 || this.password.length > 20) {
        this.passwordError = 'Password must be between 4 and 20 characters.'
        return
      }
      try {
        await axios.post('http://localhost:5000/api/users/signup', {
          email: this.email,
          password: this.password
        })
        alert('Account created successfully.')
        this.$router.push({ path: '/login' })
      } catch (err) {
        if (err.response.status === 401) {
          this.emailError = 'User with this email already exists.'
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
