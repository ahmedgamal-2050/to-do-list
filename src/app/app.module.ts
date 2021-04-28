import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoTaskModule } from './to-do-task-list/to-do-task.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToDoTaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
