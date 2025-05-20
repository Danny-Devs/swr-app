<script setup lang="ts">
// Import the SWRV composable for data fetching and caching
import useSWRV from 'swrv'

// Define a fetcher function that fetches JSON data from a given URL
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Use SWRV to fetch articles from the backend
// The key '/articles' matches the Vite proxy config (or use full URL if not proxying)
// data, error, and isValidating are Vue refs
const { data, error, isValidating } = useSWRV('/articles', fetcher)
</script>

<template>
  <div>
    <!-- Show loading state while fetching data -->
    <p v-if="isValidating">Loading...</p>
    <!-- Show error message if fetch fails -->
    <p v-else-if="error">Error: {{ error.message }}</p>

    <!-- Render the list of articles once data is loaded -->
    <ul v-else>
      <!-- Guard against undefined data; fallback to empty array -->
      <li v-for="article in data?.value || []" :key="article.id">
        <!-- Link to the article (opens in new tab) -->
        <a :href="article.link" target="_blank">{{ article.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
