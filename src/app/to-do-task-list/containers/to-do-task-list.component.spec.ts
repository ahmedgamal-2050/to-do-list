import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTaskListComponent } from './to-do-task-list.component';

describe('ToDoTaskListComponent', () => {
  let component: ToDoTaskListComponent;
  let fixture: ComponentFixture<ToDoTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
