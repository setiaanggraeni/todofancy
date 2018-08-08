<template>
  <div class="register">
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue'

export default {
  name: 'register',
  components: {
    Register
  },
  mounted () {
    localStorage.clear()
  }
}
</script>

<style>
</style>

