<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-height: 64px;
  font-size: 20px;
}
</style>
