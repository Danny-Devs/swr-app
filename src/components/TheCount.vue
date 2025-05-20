<script lang="ts" setup>
import useSWRV from 'swrv'
import fetcher from '../fetcher'

const { data: articles, error } = useSWRV('/articles', fetcher)
</script>

<template>
  <div>
    <!-- Show loading state while fetching data -->
    <p v-if="!articles">Loading...</p>
    <!-- Show error message if fetch fails -->
    <p v-else-if="error">Error: {{ error.message }}</p>

    <span v-else>Article Count: {{ articles === undefined ? 0 : articles.length }}</span>
  </div>
</template>
