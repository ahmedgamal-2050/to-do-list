import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public processingList: number = 0;
  public finishedList: number = 0;
  public task?: Task;

  @Input() public waitingList: number = 0;
  @Input() public tasksList?: Task[];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  editTask(task: Task) {
    this.task = task;
    this.edit.emit(this.task);
    this.refreshAllStateListsCount();
    this.ref.detectChanges();
  }

  deleteTask(task: Task) {
    this.delete.emit(task);
    this.refreshAllStateListsCount();
  }

  drag(event: any) {
    event.dataTransfer.setData("text", event.target.id);
  }

  drop(event: any) {
    event.preventDefault();
    if (event.target.className.indexOf('prevent-drop') > -1) {
      return;
    }
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    this.refreshAllStateListsCount();
    this.ref.detectChanges();
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  preventDrop(event: any) {
    if (event.target.className.indexOf('prevent-drop') > -1) {
      event.target.style.cursor = "dragging";
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.waitingList && changes.waitingList.currentValue) {
      this.waitingList = changes.waitingList.currentValue as number;
    }
  }

  refreshAllStateListsCount() {
    let taskListContainers = document.querySelectorAll('.tasks-list');
    for (let i = 0; i < taskListContainers.length; i++) {
      this.waitingList = taskListContainers[0].childElementCount;
      this.processingList = taskListContainers[1].childElementCount;
      this.finishedList = taskListContainers[2].childElementCount;
    }
  }

}
