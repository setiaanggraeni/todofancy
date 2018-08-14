<template>
  <div id="formLogin">
    <form>
      <label id="loginText"><h2>Setia's Todo</h2></label>
      <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
      <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
      <button type="submit" id="btnLogin" @click="login({email: email, password: password})" class="btn btn-primary">Login</button><br><br>
      <small id="register" class="form-text text-muted">No have any account? Manual <a href="#" @click="register">register</a> or login with<img src="../assets/facebook.png" id="fbicon" @click="loginFb"/></small>
    </form>
  </div>
</template>

<script>

import {provider, auth} from '@/firebase.js'
import {mapActions} from 'vuex'
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    register () {
      this.$router.replace('/register')
    },
    loginFb () {
      auth.signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        // 
        axios({
          method: 'POST',
          url: 'http://localhost:3000/users/loginFb',
          data: {
            fbToken: token
          }
        })
          .then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('name', response.data.name)
            router.push('/home')
          })
          .catch(err => {
            console.log('error -->', err.message)
          })
      }).catch(function (error) {
        console.log('error -->', error.message)
        // var errorCode = error.code
        // var errorMessage = error.message
        // var email = error.email
        // var credential = error.credential
      })
    }
  }
}
</script>

<style>
#formLogin{
  width: 50%;
  padding: 10px;
  box-shadow: 3px 3px 3px 3px #888888;
  display: inline-block;
  color: black;
  background: linear-gradient(#C6FFDD, #FBD786, #f7797d);
  height: 400px;
  border-radius: 5px;
}

#email{
  width: 70%;
  margin-left: 15%;
  margin-bottom: 5px;
}
#password{
  width: 70%;
  margin-left: 15%;
  margin-bottom: 5px;
}
#loginText{
  color: black;
  margin-top: 8%;

}
#fbicon{
  width: 120px;
}

#btnLogin{
  background-color: #C6FFDD;
  border: 1px solid pink;
  width: 100px;
  color: black
}
</style>
