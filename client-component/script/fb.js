function statusChangeCallback(response) {
  if (response.status === 'connected') {
      axios.post('http://localhost:3000/users/loginFb', {
        fbToken: response.authResponse.accessToken
      })
      .then(function(response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        window.location= "home.html" 
      })
      .catch(function(error) {
        alert(error)
      })
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '697793893905192',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    // statusChangeCallback(response);
  });

};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  window.location='index.html'
  FB.logout(function(response){
    statusChangeCallback(response)
  })
}
