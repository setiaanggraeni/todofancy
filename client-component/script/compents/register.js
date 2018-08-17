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
      <small id="register" class="form-text text-muted">Already have account? <a href="#" @click="login">Login</a> manual or login with<img src="./facebook.png" width="80px;" id="fbicon"/></small>
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

    },
    login () {
      window.location="index.html"
    }
  }
})
