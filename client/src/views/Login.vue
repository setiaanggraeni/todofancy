<template>
  <div class="login">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'login',
  components: {
    Login
  },
  mounted () {
    localStorage.clear()
  }
}
</script>

<style>
body{
  background: linear-gradient(#C6FFDD, #FBD786, #f7797d);
  height: 100vh;
  font-family: 'Comic Sans MS', Arial !important;
}
</style>

