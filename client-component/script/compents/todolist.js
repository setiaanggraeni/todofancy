Vue.component('todo-list', {
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Todo</th>
          <th scope="col">Create</th>
          <th scope="col">Duedate</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos">
          <td>{{todo.task}}</td>
          <td>{{todo.createdAt.slice(0,10)}}</td>
          <td>{{todo.dueDate.slice(0,10)}}</td>
          <td>{{todo.status}}</td>
          <td><a href="#" style="color:black"><i class="far fa-edit" data-toggle="modal" data-target="#exampleModal"></i></a> || <a href="#" style="color:black"><i class="far fa-trash-alt" @click="deleteTask(task._id)"></i></a></td>
        </tr>
      </tbody>
    </table>
  `,
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    this.getAllTodo()
  },
  methods: {
    getAllTodo () {
      let token = localStorage.getItem('token')
      axios.get('http://localhost:3000/tasks', {
        headers: {
          token: token
        }
      })
      .then(tasks => {
        this.todos = tasks.data.theTasks
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    deleteTask(id){
      axios.delete(`http://localhost:3000/tasks/delete/${id}`, {
        headers: {
          token: token
        }
      })
        .then(delTask => {
          alert('Delete Successfully!')
        })
        .catch(err => {
          swal(err.message)
        })
    }
  }
})