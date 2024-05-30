<template>
  <form>
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
        <button id="add-task" class="buttons" @click.prevent="addTask()" >{{ btnName }}</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { useTaskStore } from '@/stores/TaskStore';
import { defineComponent, ref } from 'vue';
import EventBus from '../main'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
  created() {
    EventBus.on('edit-task',(tempTask: any) => {
      this.editTask(tempTask)
    })
  },
  data(): {newTask: Task, btnName: string}
  {
    return {
      newTask: {
            taskId: 0,
            taskName: '',
            taskStatus: '',
            taskStart: new Date(),
            taskEnd: new Date()
      },
      btnName: 'Add Task'
    }
  },
    methods:
    {
      addTask() {
        if (this.newTask.taskStart > this.newTask.taskEnd) {
          alert("Start date must be before end date.");
          return; 
        }

        const taskStore = useTaskStore()
        
        if(this.newTask.taskId < taskStore.tasks.length)
        {
          taskStore.editTask(this.newTask)
        }
        else
        {
          taskStore.addTask({
            taskId: taskStore.tasks.length,
            taskName: this.newTask.taskName,
            taskStatus: this.newTask.taskStatus,
            taskStart: new Date(this.newTask.taskStart),
            taskEnd: new Date(this.newTask.taskEnd)
          })
        }

        this.newTask.taskId = taskStore.tasks.length
        this.newTask.taskName= ''
        this.newTask.taskStatus= ''
        this.newTask.taskStart= new Date()
        this.newTask.taskEnd= new Date()
      },
      editTask(tempTask: Task)
      {
        this.newTask.taskId = tempTask.taskId;
          this.newTask.taskName= tempTask.taskName;
          this.newTask.taskStatus= tempTask.taskStatus;
          this.newTask.taskStart= new Date(tempTask.taskStart);
          this.newTask.taskEnd= new Date(tempTask.taskEnd);

          this.btnName = 'Edit Task'
      }
    }
})
</script>

<style scoped>
#task-form {
  display: flex;
  justify-content: space-around;
}
</style>