<template>
  <div>
    <a href="#"><i class="fas fa-sign-out-alt" @click="logout" id="logout">Logout</i></a>
    <h3 id="welcome">Hi, {{name}}</h3><br>
        <AddTodo/><br><br>
    <label>Here's your todo list:</label>
    <table class="table" id="allTodos">
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
        <tr v-for="task in tasks" v-bind:key="task['.key']">
          <td>{{task.task}}</td>
          <td>{{task.createdAt.slice(0,10)}}</td>
          <td>{{task.dueDate.slice(0,10)}}</td>
          <td>{{task.status}}</td>
          <td><a href="#" style="color:black"><i class="far fa-edit" data-toggle="modal" data-target="#exampleModal"></i></a> || <a href="#" style="color:black"><i class="far fa-trash-alt" @click="deleteTask(task._id)"></i></a></td>
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
                      <input type="text" v-model="task.task" id="inputEdit"><br>
                      <label>Duedate: </label><br>
                      <input type="date" v-model="task.dueDate" id="inputEdit"><br><br>
                      <select v-model="newStatus" id="inputEdit">
                        <option disabled value="">Please select the status</option>
                        <option value="uncomplete">Uncomplete</option>
                        <option value="completed">Completed</option>
                      </select>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnsave" @click="editTask({id: task._id, task: task.task, dueDate: task.dueDate, status: newStatus})">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
        </tr>
      </tbody>
    </table>
    <br>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import swal from 'sweetalert'
import router from '../router'
import AddTodo from '@/components/AddTodo.vue'
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      newTask: '',
      newDuedate: '',
      newStatus: ''
    }
  },
  components: {
    AddTodo
  },
  computed: { // panggil state yg d store disini
    ...mapState([
      'tasks', 'deadline', 'isDeadline'
    ])
  },
  created () {
    let name = localStorage.getItem('name')
    let token = localStorage.getItem('token')
    if (token) {
      this.getAllTodo()
    }
  },
  methods: {
    ...mapActions([
      'getAllTodo', 'editTask', 'deleteTask', 'logout', 'sendEmail'
    ])
  },
  watch: {
    tasks (val) {
      let self = this
      val.forEach(el => {
        let now = new Date().getDate()
        let isDeadlineTrue = Number(el.dueDate.split('-')[2].split('T')[0]) - now
        if (isDeadlineTrue !== 0) {
          self.$store.commit('modifyDeadline', el)
          self.$store.commit('changeIsDeadline', true)
          self.sendEmail(el)
        }
      })
    }
  }
}
</script>

<style>
#formEdit {
    width: 80%;
    text-align: left;
    margin-left: 10px;
}

#inputEdit{
    width: 80%;
    border-radius: 5px;
}
#btnsave{
    background: #f7797d
}
#allTodos{
    width: 70%;
    margin-left: 15%;
    margin-top: 15px;
}
#logout{
  float: right;
  margin-right: 20px;
  color: black;
}
#welcome{
  text-align: left;
  margin-left: 20px;
}
</style>
