Vue.component('todo-list', {
  template: `
    <table class="table" style="width:80%;margin-left:10%;margin-top:20px;">
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
          <td><a href="#" style="color:black"><i class="far fa-edit" data-toggle="modal" data-target="#exampleModal"></i></a> || <a href="#" style="color:black"><i class="far fa-trash-alt" @click="deleteTask(todo._id)"></i></a></td>
        
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id="formEdit">
                      <label>Task: </label><br>
                      <input type="text" v-model="todo.task"><br>
                      <label>Duedate: </label><br>
                      <input type="date" v-model="todo.dueDate"><br><br>
                      <select v-model="newStatus">
                        <option disabled value="">Please select the status</option>
                        <option value="uncomplete">Uncomplete</option>
                        <option value="completed">Completed</option>
                      </select>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnsave" @click="editTask({id: todo._id, task: todo.task, dueDate: todo.dueDate, status: newStatus})">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </tr>
      </tbody>
    </table>
  `,
  data () {
    return {
      todos: [],
      newStatus: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if(!token){
      alert('please login!')
      window.location='index.html'
    } else {
      this.getAllTodo()
    }
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
        this.todos = tasks.data.allTasks
        console.log(this.todos)
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    deleteTask(id){
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/tasks/delete/${id}`, {
        headers: {
          token: token
        }
      })
        .then(delTask => {
          alert('Delete Successfully!')
          window.location="home.html"
        })
        .catch(err => {
          swal(err.message)
        })
    },
    editTask (input) {
      let token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/tasks/edit/${input.id}`, {
        task: input.task,
        dueDate: input.dueDate,
        status: input.status
      }, {
        headers: {
          token: token
        }
      })
      .then(editedTask => {
        alert('Edit Successfully!')
        window.location="home.html"
      })
      .catch(err => {
        alert(err.message, 'Input required!')
      })
    },
    sendMail(){

      // axios.post('http://localhost:3000/users/sendmail', {
      //   email: this.todos[0].userId.email,
      //   yourDeadline: this.state.deadline
      // })
      // .then(emailSent => {
      //   console.log('email sent')
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    }
  }
})