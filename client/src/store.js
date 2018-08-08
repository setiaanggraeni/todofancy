import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import swal from 'sweetalert'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setTasks (state, payload) { // buat function setTasks
      state.tasks = payload // state.tasks itu tasks nya ambil datr data yg d tasks
    }
  },
  actions: {
    login (context, payload) {
      axios.post('http://localhost:3000/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(userLogin => {
          localStorage.setItem('token', userLogin.data.token)
          localStorage.setItem('name', userLogin.data.name)
          router.push('/home')
        })
        .catch(err => {
          console.log(err)
          swal('Wrong email/password', 'You clicked the button!', 'success')
        })
    },
    register (context, payload) {
      axios.post('http://localhost:3000/users/register', {
        name: payload.name,
        email: payload.email,
        password: payload.password
      })
        .then(newUser => {
          swal('Thank you for registering!', 'You clicked the button!', 'success')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          swal('Email already exist!', 'You clicked the button!', 'success')
        })
    },
    getAllTodo (context, payload) {
      let token = localStorage.getItem('token')
      axios.get('http://localhost:3000/tasks', {
        headers: {
          token: token
        }
      })
        .then(tasks => {
          let theTasks = tasks.data.theTasks
          context.commit('setTasks', theTasks) // setTasks dapat dari nama function yang di mutations
        })
        .catch(err => {
          swal(err.message)
        })
    },
    deleteTask (context, payload) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/tasks/delete/${payload}`, {
        headers: {
          token: token
        }
      })
        .then(delTask => {
          swal('Delete Successfully!', 'You clicked the button!', 'success')
          context.dispatch('getAllTodo')
        })
        .catch(err => {
          swal(err.message)
        })
    },
    editTask (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/tasks/edit/${payload.id}`, {
        task: payload.task,
        dueDate: payload.dueDate,
        status: payload.status
      }, {
        headers: {
          token: token
        }
      })
        .then(editedTask => {
          swal('Edit Successfully!', 'You clicked the button!', 'success')
          context.dispatch('getAllTodo')
        })
        .catch(err => {
          swal(err.message, 'Input required!')
        })
    },
    addTodo (context, payload) {
      let token = localStorage.getItem('token')
      axios.post('http://localhost:3000/tasks/create', {
        task: payload.task,
        dueDate: payload.dueDate
      }, {
        headers: {
          token: token
        }
      })
        .then(newTodo => {
          swal('Successfully add new Todo !', 'You clicked the button!', 'success')
          context.dispatch('getAllTodo')
        })
        .catch(err => {
          swal(err.message, 'Input required!')
        })
    },
    logout () {
      localStorage.clear()
      router.push('/')
    },
    loginFb () {
    //   function statusChangeCallback (response) {
    //     console.log('statusChangeCallback')
    //     console.log(response)
    //     if (response.status === 'connected') {
    //       testAPI()
    //     } else {
    //       // document.getElementById('status').innerHTML = 'Please log ' +
    //       //   'into this app.'
    //     }
    //   }

    //   function checkLoginState () {
    //     FB.getLoginStatus(function (response) {
    //       statusChangeCallback(response)
    //     })
    //   }

    //   window.fbAsyncInit = function () {
    //     FB.init ({
    //       appId: '{your-app-id}',
    //       cookie: true,
    //       xfbml: true,
    //       version: 'v2.8'
    //     })

    //     FB.getLoginStatus (function (response) {
    //       statusChangeCallback (response)
    //     })

    //   };

    //   (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0]
    //     if (d.getElementById(id)) return
    //     js = d.createElement(s); js.id = id
    //     js.src = "https://connect.facebook.net/en_US/sdk.js"
    //     fjs.parentNode.insertBefore(js, fjs)
    //   }(document, 'script', 'facebook-jssdk'))

    //   function testAPI () {
    //     console.log('Welcome!  Fetching your information.... ')
    //     FB.api('/me', function (response) {
    //       console.log('Successful login for: ' + response.name)
    //     })
    //   }
    }
  }
})
