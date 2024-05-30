<template>
  <header class="task-header" id="task-header">
    <h1 class="task-heading" id="task-heading">Task Manager</h1>
  </header>
  <br>

  <task-form />

  <br>

  <task-table />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from './components/TaskForm.vue'
import TaskTable from './components/TaskTable.vue'
import { useTaskStore } from './stores/TaskStore';

interface Task {
  taskId: number,
  taskName: string;
  taskStatus: string;
  taskStart: Date;
  taskEnd: Date;
}

export default defineComponent({
  setup() {
    const taskStore = useTaskStore()

    return { taskStore }
  },
  name: 'App',
  components: { 'task-form' : TaskForm, 'task-table' : TaskTable}
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
#btn-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
