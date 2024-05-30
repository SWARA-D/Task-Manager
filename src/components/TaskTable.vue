<template>
  <div class="divs">
    <div id="btn-div">
      <div>
        <input type="text" id="search-input" class="inputs" placeholder="Enter a keyword" v-model="searchWord"/>
        <button id="search-task" class="buttons" @click.prevent="taskStore.searchTask(searchWord)">Search</button>
      </div>
      
      <div>
        <select id="filter-task" class="inputs" @change="filterByStatus()" v-model="statusFilter">
          <option value="" disabled selected hidden>Filter by Status</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>All</option>
        </select>

        <button id="sort-by-name" class="buttons" @click.prevent="taskStore.sortTask()">Sort by Name</button>
      </div>
    </div>
    <br>
  <div id="table-div">
      <table id="task-table" class = "tables">
        <thead>
          <th id="name-col" class="table-head">Name</th>
          <th id="status-col" class="table-head">Status</th>
          <th id="start-col" class="table-head">Start Time</th>
          <th id="end-col" class="table-head">End Time</th>
          <th> </th>
          <th> </th>
        </thead>
        

        <tr> </tr>
        <tbody v-if="filter === 'all'">
            <tr class="table-row" v-for="task in taskStore.tasks" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
        </tbody>
          
          <tbody v-if="filter === 'not-started'">
            <tr class="table-row" v-for="task in taskStore.isNotStarted" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
          </tbody>

          <tbody v-if="filter === 'in-progress'">
            <tr class="table-row" v-for="task in taskStore.isInProgress" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
          </tbody>

          <tbody v-if="filter === 'completed'">
            <tr class="table-row" v-for="task in taskStore.isCompleted" :key="task.taskId" :id="task.taskId.toString()">
              <task-details :taskElem="task"/>
            </tr>
        </tbody>
      </table>
    </div>
    </div> 
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
import TaskDetails from './TaskDetails.vue'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
    setup() {
      const taskStore = useTaskStore()

      const temp = taskStore.tasks.forEach((task: Task, index) => {
        if(task.taskId === -1) {
          taskStore.tasks.splice(index, 1)
        }
      })

      const filter = ref('all')

      return { taskStore, filter }
    },
    components:
    {
      'task-details': TaskDetails
    },
    data() {
    return{
      statusFilter: '',
      searchWord: ''
    }
  },
    methods: 
    {
        filterByStatus() : void {
          if(this.statusFilter === "Not Started")
          {
            this.filter = "not-started";
          }
          else if(this.statusFilter === "In Progress")
          {
            this.filter = "in-progress";
          }
          else if(this.statusFilter === "Completed")
          {
            this.filter = "completed";
          }
          else 
          {
            this.filter = "all";
          }
        }
    }
})
</script>

<style scoped>
#table-div {
  display: flex;
  justify-content: space-around;
}
#filter-task, #search-input {
  margin-right: 20px; 
}
.tables
{
  width: 100%;
}
</style>