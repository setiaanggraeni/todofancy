Vue.component('logout', {
  template: `
    <div>
      <button @click="logout()" style="border-radius:7px;background-color:red;margin-right:20px;color:white">Logout</button>
    </div>
  `,
  methods: {
    logout(){
      localStorage.clear()
      window.location="index.html"
    }
  }
})