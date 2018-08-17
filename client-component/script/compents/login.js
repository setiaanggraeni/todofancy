Vue.component('login', {
  template: `
  <div id="loginForm" style="width:60%; margin-left:20%">
    <form>
      <label>Email address</label>
      <input type="email" v-model="email" class="form-control" placeholder="Enter email">
      <label>Password</label>
      <input type="password" v-model="password" class="form-control" placeholder="Password"><br>
      <button type="submit" class="btn btn-primary" @click.prevent="login()">Login</button>
      <small id="register" class="form-text text-muted">No have any account? Manual <a href="#" @click="register">register</a> or login with<img src="./facebook.png" width="80px;" id="fbicon" @click="loginFb"/></small>
    </form>
  </div>
  `,
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password
      })
      .then(userLogin => {
        localStorage.setItem('token', userLogin.data.token)
        localStorage.setItem('name', userLogin.data.name)
        window.location="home.html"
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    loginFb () {

    },
    register () {
      window.location="register.html"
    }
  }
})
