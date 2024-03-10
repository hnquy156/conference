<script setup>
import axios from 'axios'
import { reactive, onBeforeMount } from 'vue'

const conferences = reactive({
  list: []
})

onBeforeMount(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/conferences')
    conferences.list = res.data.data
  } catch (error) {
    console.log('🚀  error:', error)
  }
})
</script>

<template>
  <main>
    <h1>Conference</h1>
    <table>
      <tr>
        <th>Name</th>
        <th>Location</th>
        <th>Date</th>
      </tr>
      <tr v-for="conf in conferences.list" :key="conf.id">
        <td>
          <a :href="conf.href" target="_blank">{{ conf.name }}</a>
        </td>
        <td>{{ conf.location }}</td>
        <td>{{ conf.date }}</td>
      </tr>
    </table>
    <p v-if="conferences.list.length == 0">No data</p>
  </main>
</template>

<style scoped>
h1 {
  font-weight: 700;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 24px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #eeeeee;
}
</style>
