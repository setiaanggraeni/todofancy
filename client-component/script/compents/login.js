Vue.component('login', {
  template: `
  <div id="loginForm" style="width:60%; margin-left:20%">
    <form>
      <label>Email address</label>
      <input type="email" v-model="email" class="form-control" placeholder="Enter email">
      <label>Password</label>
      <input type="password" v-model="password" class="form-control" placeholder="Password"><br>
      <button type="submit" class="btn btn-primary" @click.prevent="login()">Login</button>
      <small id="register" class="form-text text-muted">No have any account? Manual <a href="#" @click="register">register</a></small>
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
    // ,
    // loginFb () {
    //   function statusChangeCallback(response) {
    //     if (response.status === 'connected') {
    //         axios.post('http://localhost:3000/users/login', {
    //           fbToken: response.authResponse.accessToken
    //         })
    //         .then(function(response) {
    //           localStorage.setItem("token", response.data.token);
    //           localStorage.setItem("name", response.data.name);
    //           window.location= "home.html" 
    //         })
    //         .catch(function(error) {
    //           alert(error)
    //         })
    //     } else {
    //       document.getElementById('status').innerHTML = 'Please log ' +
    //         'into this app.';
    //     }
    //   }
      
    //   function checkLoginState() {
    //     FB.getLoginStatus(function(response) {
    //       statusChangeCallback(response);
    //     });
    //   }
      
    //   window.fbAsyncInit = function() {
    //     FB.init({
    //       appId      : '697793893905192',
    //       cookie     : true,
    //       xfbml      : true,
    //       version    : 'v2.8'
    //     });
      
    //     FB.getLoginStatus(function(response) {
    //       // statusChangeCallback(response);
    //     });
      
    //   };
    //   (function(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s); js.id = id;
    //     js.src = "https://connect.facebook.net/en_US/sdk.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    //   }(document, 'script', 'facebook-jssdk'))     
    // },
    register () {
      window.location="register.html"
    }
  }
})
