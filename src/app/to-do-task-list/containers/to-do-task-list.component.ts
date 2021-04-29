import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-to-do-task-list',
  templateUrl: './to-do-task-list.component.html',
  styleUrls: ['./to-do-task-list.component.scss']
})

export class ToDoTaskListComponent implements OnInit {
  public title = 'to-do-list';
  public tasksList: Task[] = [];
  public waitingList: number = 0;
  public task: Task | undefined;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  addTask(taskList: Task[]) {
    this.tasksList.push(...taskList);

    let waitingListContainer = <HTMLDivElement>document.getElementById('waiting-tasks');
    this.waitingList = waitingListContainer.childElementCount + 1;
  }

  editTask(task: Task) {
    if (task) {
      this.openModal();
      this.task = task;
    }
  }

  deleteTask(task: Task) {
    for (let i = 0; i < this.tasksList.length; i++) {
      if (task.taskId == this.tasksList[i].taskId) {
        this.tasksList.splice(i, 1);
      }
    }
    this.ref.detectChanges();
  }

  editTaskList(tasksList: any) {
    this.tasksList = tasksList;
    this.closeModal();
  }

  openModal(): void {
    let editTaskModal = <HTMLDivElement>document.getElementById('editTaskModal');
    editTaskModal.classList.add("flex");
    editTaskModal.classList.remove("hidden");
  }

  closeModal(): void {
    let editTaskModal = <HTMLDivElement>document.getElementById('editTaskModal');
    editTaskModal.classList.remove("flex");
    editTaskModal.classList.add('hidden');
  }

}
