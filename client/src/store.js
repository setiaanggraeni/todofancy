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
    tasks: [],
    deadline: [],
    isDealine: false,
    dataEdit: ''
  },
  mutations: {
    setTasks (state, payload) { // buat function setTasks
      state.tasks = payload // state.tasks itu tasks nya ambil datr data yg d tasks
    },
    modifyDeadline (state, payload) {
      state.deadline.push(payload)
    },
    changeIsDeadline (state, payload) {
      state.isDealine = payload
    }
  },
  actions: {
    sendEmail (context, payload) {
      axios.post('https://server-todofancy.setiaanggraeni.co/users/sendmail', {
        email: payload.userId.email,
        yourDeadline: this.state.deadline
      })
        .then(emailSent => {
          console.log('email sent')
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, payload) {
      axios.post('https://server-todofancy.setiaanggraeni.co/users/login', {
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
      axios.post('https://server-todofancy.setiaanggraeni.co/users/register', {
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
      axios.get('https://server-todofancy.setiaanggraeni.co/tasks', {
        headers: {
          token: token
        }
      })
        .then(tasks => {
          context.commit('setTasks', tasks.data.allTasks) // setTasks dapat dari nama function yang di mutations
        })
        .catch(err => {
          swal(err.message)
        })
    },
    deleteTask (context, payload) {
      let token = localStorage.getItem('token')
      axios.delete(`https://server-todofancy.setiaanggraeni.co/tasks/delete/${payload}`, {
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
      axios.put(`https://server-todofancy.setiaanggraeni.co/tasks/edit/${payload.id}`, {
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
      axios.post('https://server-todofancy.setiaanggraeni.co/tasks/create', {
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
    forEdit (context, payload) {
      this.state.dataEdit = payload
    }
  }
})
