<template>
    <div>
        <form id="formNewTodo">
            <h3>Create new Todo</h3>
            <input type="text" v-model="newTodo" class="form-control" placeholder="Your new todo...">
            <input type="date" v-model="newDuedate" class="form-control" placeholder="dd/mm/yyyy">
            <button type="submit" id="btnAddTodo" @click="addTodo({task: newTodo, dueDate: newDuedate})" class="btn btn-primary">Add New Todo</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data () {
        return {
            newTodo: '',
            newDuedate: ''
        }
    },
    methods: {
        ...mapActions([
            'addTodo'
        ])
    }
}
</script>

<style scoped>
.form-control {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 5px;
    background-color: antiquewhite
}
#btnAddTodo{
    width: 150px;
    border-radius: 5px;
    background-color: #C6FFDD;
    border: 1px;
    color: black;
}
#formNewTodo{
    width: 50%;
    border: 1px;
    padding: 10px;
    box-shadow: 3px 3px 3px 3px #888888;
    margin-left: 25%;
    background: transparent;
    border-radius: 5px;
    height: 250px;
    padding-top: 40px;
}
</style>


