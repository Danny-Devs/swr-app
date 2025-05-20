<script setup lang="ts">
// Import the SWRV composable for data fetching and caching
import useSWRV from 'swrv'
import { watchEffect } from 'vue'
import fetcher from './fetcher'
import TheCount from './components/TheCount.vue'

import { ref } from 'vue'

const showCount = ref(false)

// Use SWRV to fetch articles from the backend
// The key '/articles' matches the Vite proxy config (or use full URL if not proxying)
// data, error, and isValidating are Vue refs
const { data, error } = useSWRV('/articles', fetcher)

// Debug logging: log data and error whenever they change
watchEffect(() => {
  console.log('data:', data.value, 'error:', error.value)
  setTimeout(() => {
    showCount.value = true
  }, 3000)
})
</script>

<template>
  <div>
    <!-- Show loading state while fetching data -->
    <p v-if="!data">Loading...</p>
    <!-- Show error message if fetch fails -->
    <p v-else-if="error">Error: {{ error.message }}</p>

    <!-- Render the list of articles once data is loaded -->
    <ul v-else>
      <!-- Guard against undefined data; fallback to empty array -->
      <li v-for="article in data || []" :key="article.id">
        <!-- Link to the article (opens in new tab) -->
        <a :href="article.link" target="_blank">{{ article.title }}</a>
      </li>
    </ul>
    <TheCount v-if="showCount" />
  </div>
</template>

<style scoped>

</style>
