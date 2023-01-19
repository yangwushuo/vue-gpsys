<template>
  <div class="card">
    <slot name="content">

    </slot>
  </div>
</template>

<script>
export default {
  name: 'BSCard'
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  margin: 1rem 0;
  background: white;
  border-radius: 2rem;
  margin-bottom: 1rem;
  margin: 1rem 0;
}
</style>