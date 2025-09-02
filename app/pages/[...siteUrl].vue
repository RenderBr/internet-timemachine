<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const siteUrl = String(route.params.siteUrl || '');
const year = String(route.query.year || '');

const html = ref<string>('Loading...');
const iframeKey = ref<number>(0);

onMounted(async () => {
  if (!siteUrl) {
    html.value = 'Missing site URL';
    return;
  }

  const params = new URLSearchParams();
  if (year) params.set('year', year);

  try {
    const res = await fetch(`/api/${encodeURIComponent(siteUrl)}?${params.toString()}`);
    if (!res.ok) {
      html.value = `Error fetching site: ${res.status}`;
      return;
    }
    html.value = await res.text();
    // bump key so iframe reloads when content changes
    iframeKey.value++;
  } catch (err: any) {
    html.value = `Fetch failed: ${err?.message ?? String(err)}`;
  }
});
</script>

<template>
  <div>
    <div v-if="html === 'Loading...'">Loading...</div>
    <div v-else-if="html && html.trim().startsWith('<')">
      <!-- Use iframe to ensure head/styles/scripts from returned HTML apply -->
      <iframe
        :key="iframeKey"
        :srcdoc="html"
        sandbox="allow-scripts allow-same-origin"
        style="width:100%;height:100vh;border:0"
      ></iframe>
    </div>
    <div v-else v-html="html"></div>
  </div>
</template>
