<script setup>
import axios from 'axios'
import { reactive, onBeforeMount, computed } from 'vue'

const conferences = reactive({
  list: [],
  page: 0,
  pageSize: 16
})

const pagingConferences = computed(() => {
  const { page, pageSize } = conferences
  return conferences.list.slice(page * pageSize, (page + 1) * pageSize)
})

const changePage = (e) => {
  if (e.target.name === 'pre' && conferences.page > 0) {
    conferences.page--
  } else if (
    e.target.name === 'next' &&
    conferences.page < Math.ceil(conferences.list.length / conferences.pageSize) - 1
  )
    conferences.page++
}

onBeforeMount(async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/conferences')
    conferences.list = res.data.data
  } catch (error) {
    console.log('🚀 onBeforeMount:', error)
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
      <tr v-for="conf in pagingConferences" :key="conf.id">
        <td>
          <a :href="conf.href" target="_blank">{{ conf.name }}</a>
        </td>
        <td>{{ conf.location }}</td>
        <td>{{ conf.date }}</td>
      </tr>
    </table>
    <p v-if="conferences.list.length == 0">No data</p>
    <div v-if="conferences.list.length > 0" class="pagination">
      <a href="#" name="pre" @click="changePage">&laquo;</a>
      <a href="#" class="active">{{ conferences.page + 1 }}</a>
      <a href="#" name="next" @click="changePage">&raquo;</a>
    </div>
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

.pagination {
  display: inline-block;
  margin-top: 20px;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: 1px solid #4caf50;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
