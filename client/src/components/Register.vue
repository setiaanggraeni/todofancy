<template>
  <form id="formRegister">
    <div id="inputan">
    <p id="textp">Name</p>
    <input type="text" v-model="name" class="form-control" id="theinput" placeholder="Name">
    <p id="textp">Email</p>
    <input type="email" v-model="email" class="form-control" id="theinput" placeholder="email">
    <p id="textp">Password</p>
    <input type="password" v-model="password" class="form-control" id="theinput" placeholder="Password"> <br>
    <button type="submit" @click="register({name: name, email: email, password: password})" class="btn btn-primary">Register</button>
    </div>
    <small id="register" class="form-text text-muted">Already have account? <a href="#" @click="login">Login</a> manual or login with<img src="../assets/facebook.png" id="fbicon"/></small>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    login () {
      this.$router.replace('/')
    }
  }
}
</script>

<style>
#formRegister{
  width: 50%;
  padding: 10px;
  box-shadow: 3px 3px 3px 3px #888888;
  display: inline-block;
  color: black;
  background: linear-gradient(#C6FFDD, #FBD786, #f7797d);
  height: 400px;
  border-radius: 5px;
}
#theinput{
  width: 80%;
  margin-left: 10%;
}

#textp{
text-align:left;
margin-left:10%;
margin-bottom:3px;
}

#inputan{
  margin-top: 30px;
}
</style>
