Vue.component('add-todo', {
  template: `
    <form id="registerForm" style="width:60%;margin-left:20%;margin-top:20px;">
      <label>Todo Name</label>
      <input type="text" v-model="todoName" class="form-control" placeholder="Enter Todo">
      <label>Email address</label>
      <input type="date" v-model="dueDate" class="form-control" placeholder="dd/mm/yy"><br>
      <button type="submit" class="btn btn-primary" @click.prevent="addNewTodo()">Submit</button>
    </form>
  `,
  data () {
    return {
      todoName: '',
      dueDate: ''
    }
  },
  methods: {
    addNewTodo () {
      let token = localStorage.getItem('token')
      axios.post('http://localhost:3000/tasks/create', {
        task: this.todoName,
        dueDate: this.dueDate
      }, {
        headers: {
          token: token
        }
      })
      .then(newTodo => {
        alert('Successfully add new todo!')
        this.todoName = ''
        this.dueDate = ''
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }
})
