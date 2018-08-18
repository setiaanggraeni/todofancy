Vue.component('register', {
  template: `
    <form id="registerForm" style="width:60%;margin-left:20%;margin-top:20px;">
      <label>Name</label>
      <input type="text" v-model="name" class="form-control" placeholder="Enter Name">
      <label>Email address</label>
      <input type="email" v-model="email" class="form-control" placeholder="Enter email">
      <label>Password</label>
      <input type="password" v-model="password" class="form-control" placeholder="Password"><br>
      <button type="submit" class="btn btn-primary" @click.prevent="register()">Register</button>
      <small id="register" class="form-text text-muted">Already have account? <a href="#" @click="login">Login</a></small>
    </form>
  `,
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/users/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(newUser => {
        console.log(newUser)
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    loginFb () {
      auth.signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
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
      })
    },
    login () {
      window.location="index.html"
    }
  }
})
