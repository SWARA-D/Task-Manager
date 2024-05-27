<template>
  <header class="task-header" id="task-header">
    <h1 class="task-heading" id="task-heading">Task Manager</h1>
  </header>
  <br>
  <div class="divs" id="task-form">
    <div>
      <label for="task-name" class="labels" id="name-label">Name</label>
      <input id="task-name" class="inputs" v-model="newTask.taskName"/>
    </div>

    <div>
      <label for="task-status" class="labels" id="status-label">Status</label>
      <select id="status-select" class="inputs" v-model="newTask.taskStatus">
        <option id="not-started" class="select-status">Not Started</option>
        <option id="in-progress" class="select-status">In Progress</option>
        <option id="completed" class="select-status">Completed</option>
      </select>
    </div>

    <div>
      <label for="task-start" class="labels" id="start-label">Start Time</label>
      <input type="datetime-local" id="task-start" class="inputs" v-model="newTask.taskStart"/>
    </div>

    <div>
      <label for="task-end" class="labels" id="end-label">End Time</label>
      <input type="datetime-local" id="task-end" class="inputs" v-model="newTask.taskEnd"/>
    </div>

    <div>
      <button id="add-task" class="buttons" @click="addTask()">{{ btnText }}</button>
    </div>
  </div>

  <br>

  <div class="divs">
    <div id="btn-div">
      <div>
        <input type="text" id="search-input" class="inputs" placeholder="Enter a keyword" v-model="searchWord"/>
        <button id="search-task" class="buttons" @click="searchTask()">Search</button>
      </div>

      <div>
        <select id="filter-task" class="inputs" @change="filterByStatus()" v-model="statusFilter">
          <option value="" disabled selected hidden>Filter by Status</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>All</option>
        </select>

        <button id="sort-by-name" class="buttons" @click="sortByName()">Sort by Name</button>
      </div>
    </div>
    <br>
    <div id="table-div">
      <table id="task-tabel" class = "tabels">
        <th id="name-col" class="tabel-head">Name</th>
        <th id="status-col" class="tabel-head">Status</th>
        <th id="start-col" class="tabel-head">Start Time</th>
        <th id="end-col" class="tabel-head">End Time</th>
        <th> </th>
        <th> </th>
        
        <tr class="tabel-row" v-for="task in tasks" :key="task.taskId" :id="task.taskId.toString()">
          <td>{{ task.taskName }}</td>
          <td>{{ task.taskStatus }}</td>
          <td>{{ new Date(task.taskStart).toLocaleString() }}</td>
          <td>{{ new Date(task.taskEnd).toLocaleString() }}</td>
          <td><button id="edit-task" class="buttons" @click="editTask(task.taskId)">Edit</button></td>
          <td><button id="delete-task" class="buttons" @click="deleteTask(task.taskId)">Delete</button></td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Task {
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
  name: 'App',
  data(): {newTask: Task, tasks: Task[], btnText: string, currentID: number, searchWord: string, statusFilter: string} {
    return {
      newTask: {
        taskId: 0,
        taskName: '',
        taskStatus: '',
        taskStart: new Date(),
        taskEnd: new Date()
      },
      tasks: [],
      btnText: "Add Task",
      currentID: -1,
      searchWord: '',
      statusFilter: ''
    }
  },
  methods:
  {
    addTask() : void {
      if (this.newTask.taskStart > this.newTask.taskEnd) {
        alert("Start date must be before end date.");
        return; 
      }
      
      if(this.currentID === -1)
      {
        this.tasks.push(this.newTask);
        this.newTask.taskId++
      }
      else
      {
        this.tasks[this.currentID] = this.newTask;
      }
      
      this.btnText = "Add Task"

      this.newTask = {
        taskId: this.newTask.taskId,
        taskName: '',
        taskStatus: '',
        taskStart: new Date(),
        taskEnd: new Date()
      };
    },
    editTask(tId: number): void {
      this.btnText = "Edit Task"
      const index = this.tasks.findIndex(task => task.taskId === tId);

      this.currentID = index
      if(index !== -1)
      {
        this.newTask.taskName = this.tasks[index].taskName;
        this.newTask.taskStatus = this.tasks[index].taskStatus;
        this.newTask.taskStart = this.tasks[index].taskStart;
        this.newTask.taskEnd = this.tasks[index].taskEnd;
      }
    },
    deleteTask(tId: number): void {
      const index = this.tasks.findIndex(task => task.taskId === tId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
    searchTask(): void {
      this.tasks.forEach(task => 
      {
        var element = document.getElementById(task.taskId.toString());
        if(element)
        {
          element.style.display = ""
        }
        if(!task.taskName.includes(this.searchWord))
        {
          var elem = document.getElementById(task.taskId.toString());
          if(elem)
          {
            elem.style.display = "none"
          }
        }
      });
    },
    filterByStatus():void {
      this.tasks.forEach(task => 
      {
        var element = document.getElementById(task.taskId.toString());
        if(element)
        {
          element.style.display = ""
        }

        if(task.taskStatus !== this.statusFilter && this.statusFilter !== "All")
        {
          var elem = document.getElementById(task.taskId.toString());
          if(elem)
          {
            elem.style.display = "none"
          }
        }
      });
    },
    sortByName(): void {
      this.tasks.sort((a, b) => {
        const nameA = a.taskName.toUpperCase();
        const nameB = b.taskName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  }
});
</script>

<style>
#app
{
  font-family: 'Times New Roman', Times, serif;
}
body
{
  background-color: lightgrey;
}
.task-header
{
  background-color: darkmagenta;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.task-heading
{
  color: beige;
}
.divs
{
  background-color: beige;
  padding: 30px;
  box-shadow: 10px 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}
#table-div, #task-form {
  display: flex;
  justify-content: space-around;
}
#btn-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#filter-task, #search-input {
  margin-right: 20px; 
}
.labels
{
  margin-top: 8px;
  font-size: large;
}
.inputs
{
  padding: 5px 5px;
  margin-left: 10px;
  font-size: medium;
}
.buttons
{
  background-color: darkmagenta;
  padding: 10px;
  color: beige;
  font-size: medium;
  border: none;
  border-radius: 5px;
  margin-top: -5px;
}
.tabels
{
  width: 100%;
}
td
{
  text-align: center;
  padding-bottom: 10px;
}
</style>
