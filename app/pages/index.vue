<template>
  <main class="page">
    <header class="hero">
      <small class="kicker">welcome to</small>
      <h1 class="title">the internet time machine</h1>
      <p class="subtitle">Explore the past, present, and future of the internet.</p>
    </header>

    <section class="card">
      <form class="search-form" @submit.prevent="onSubmit">
        <div class="field">
          <label for="url">URL</label>
          <input
            id="url"
            name="url"
            type="url"
            v-model="form.url"
            placeholder="https://example.com"
            required
            inputmode="url"
            autocomplete="url"
          />
        </div>

        <div class="field">
          <label for="year">Year</label>
          <input
            id="year"
            name="year"
            type="number"
            v-model.number="form.year"
            min="1990"
            max="2100"
            placeholder="YYYY"
            required
            aria-describedby="year-help"
          />
          <small id="year-help" class="hint">Pick a year between 1990 and 2100</small>
        </div>

        <div class="actions">
          <button class="primary" type="submit">Go</button>
          <button class="ghost" type="button" @click="reset">Reset</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({ url: '', year: 2025 })

function onSubmit() {
  // simple validation and stub navigation; replace with router or API call later
  if (!form.url) return
  const payload = { ...form }
  // For now just log — in-app navigation or server call can be added
  // eslint-disable-next-line no-console
  console.log('search', payload)
  // show a small confirmation using alert for now
  // Redirect to /site/url?year=year
  window.location.href = `/site/${form.url}?year=${form.year}`
}

function reset() {
  form.url = ''
  form.year = 2025
}
</script>

<style lang="css">
:root{
  --bg: #0f172a;
  --card: #0b1220;
  --muted: #9aa4b2;
  --accent: #7c3aed;
  --glass: rgba(255,255,255,0.03);
}

.page{
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 3rem 1rem;
  background: radial-gradient(1000px 600px at 10% 10%, rgba(124,58,237,0.12), transparent 10%), linear-gradient(180deg, #071024 0%, #071022 100%);
  color: #e6eef8;
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

.hero{
  text-align: center;
  margin-bottom: 1.25rem;
}

.kicker{
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.14em;
}

.title{
  font-size: 2.25rem;
  margin: 0.25rem 0;
  line-height: 1.05;
}

.subtitle{
  margin: 0.25rem 0 0.75rem 0;
  color: var(--muted);
}

.card{
  width: 100%;
  max-width: 720px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 6px 30px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.03);
}

.search-form{
  display: grid;
  gap: 0.75rem;
}

.field{
  display: flex;
  flex-direction: column;
}

label{
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
  color: var(--muted);
}

input[type="url"], input[type="number"]{
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.06);
  background: var(--glass);
  color: inherit;
  outline: none;
}

input:focus{
  box-shadow: 0 0 0 4px rgba(124,58,237,0.08);
  border-color: rgba(124,58,237,0.6);
}

.hint{
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 0.25rem;
}

.actions{
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.25rem;
}

.primary{
  background: linear-gradient(90deg,var(--accent),#5b21b6);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.ghost{
  background: transparent;
  color: var(--muted);
  border: 1px solid rgba(255,255,255,0.04);
  padding: 0.55rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
}

@media (min-width: 640px){
  .search-form{ grid-template-columns: 1fr 160px; align-items: end; gap: 0.75rem }
  .actions{ grid-column: 2 / 3; justify-self: end; margin-top: 0 }
  .field:nth-child(2){ grid-column: 2 / 3 }
}

</style>
