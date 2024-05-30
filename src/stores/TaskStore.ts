import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {
                taskId: -1,
                taskName: "",
                taskStatus: "",
                taskStart: new Date(),
                taskEnd: new Date()
            }
        ]
    }),
    getters: {
        isNotStarted(): any {
            return this.tasks.filter(task => task.taskStatus === "Not Started")
        },
        isInProgress(): any {
            return this.tasks.filter(task => task.taskStatus === "In Progress")
        },
        isCompleted(): any {
            return this.tasks.filter(task => task.taskStatus === "Completed")
        }
    },
    actions: {
        addTask(task) {
            this.tasks.push(task);
        },
        deleteTask(tId:number) {
            const index = this.tasks.findIndex(task => task.taskId === tId);
            if (index !== -1) {
              this.tasks.splice(index, 1);
            }
        },
        editTask(taskEdit) {
            this.tasks.forEach(task => {
                if(task.taskId === taskEdit.taskId)
                {
                    task.taskName = taskEdit.taskName;
                    task.taskStatus = taskEdit.taskStatus;
                    task.taskStart = new Date(taskEdit.taskStart);
                    task.taskEnd = new Date(taskEdit.taskEnd);
                }
            })
        },
        searchTask(searchWord: string)
        {
            this.tasks.forEach(task => 
                {
                  const element = document.getElementById(task.taskId.toString());
                  if(element)
                  {
                    element.style.display = ""
                  }
                  if(!task.taskName.includes(searchWord))
                  {
                    const elem = document.getElementById(task.taskId.toString());
                    if(elem)
                    {
                      elem.style.display = "none"
                    }
                  }
                });
        },
        sortTask(): void
        {

        this.tasks = this.tasks.sort((a, b) => {
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
})