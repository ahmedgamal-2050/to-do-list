import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoTaskListComponent } from './containers/to-do-task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';

const toDoRoutes: Routes = [
  { path: '', component: ToDoTaskListComponent }
];

@NgModule({
  declarations: [
    ToDoTaskListComponent,
    EditTaskComponent,
    TaskListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(toDoRoutes),
    CommonModule
  ],
})
export class ToDoTaskModule { }
