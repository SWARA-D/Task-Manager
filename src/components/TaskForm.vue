<template>
  <transition name="toast">
    <toast v-if="showToast">Start date must be before end date!</toast>
  </transition>
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
import ToastError from './ToastError.vue'

interface Task{
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
  components: {
    'toast': ToastError
  },
  created() {
    EventBus.on('edit-task',(tempTask: any) => {
      this.editTask(tempTask)
    })
  },
  data(): {newTask: Task, btnName: string, showToast: boolean}
  {
    return {
      newTask: {
            taskId: 0,
            taskName: '',
            taskStatus: '',
            taskStart: new Date(),
            taskEnd: new Date()
      },
      btnName: 'Add Task',
      showToast: false
    }
  },
    methods:
    {
      addTask() {
        if (this.newTask.taskStart > this.newTask.taskEnd) {
          this.showToast = true
          setTimeout(() => this.showToast = false, 3000)
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
.toast-enter-active {
  animation: wobble 0.5s ease;
}
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  @keyframes wobble {
    0% { transform: translateY(-100px); opacity: 0 }
    50% { transform: translateY(0px); opacity: 1 }
    60% { transform: translateX(8px); opacity: 1 }
    70% { transform: translateX(-8px); opacity: 1 }
    80% { transform: translateX(4px); opacity: 1 }
    90% { transform: translateX(-4px); opacity: 1 }
    100% { transform: translateX(0px); opacity: 1 }
  }
</style>