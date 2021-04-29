import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {
  public taskForm!: FormGroup;
  public taskFormRequiredMsg: boolean = false;
  public taskFormMinLengthMsg: boolean = false;

  @Input() public tasksList?: Task[];
  @Input() public task?: Task;
  @Output() add = new EventEmitter<Task[]>();
  @Output() edit = new EventEmitter<Task[]>();

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['']
    });

    this.taskForm.valueChanges.subscribe(value => {
      if (!value || !value.taskName || !value.taskName.length) {
        this.taskFormRequiredMsg = true;
        this.taskFormMinLengthMsg = false;
      } else if (value.taskName.length < 3) {
        this.taskFormMinLengthMsg = true;
        this.taskFormRequiredMsg = false;
      } else {
        this.taskFormRequiredMsg = false;
        this.taskFormMinLengthMsg = false;
      }
    })
  }

  sendTask() {
    /* add Task */
    let tasksListArray: Task[] = [];
    if (this.task === undefined) {
      if (this.taskForm.dirty && this.taskForm.valid) {
        let randomNum = Math.random() * 1000;
        let taskRecord = {
          taskId: randomNum.toFixed(),
          taskName: this.taskForm.value.taskName
        }
        tasksListArray.push(taskRecord);
        this.taskForm.reset();
        this.add.emit(tasksListArray);
        this.taskFormRequiredMsg = false;
      } else {
        this.taskFormRequiredMsg = true;
      }
    } else {
      /* edit Task */
      if (this.tasksList) {
        if (this.taskForm.dirty && this.taskForm.valid) {
          for (let i = 0; i < this.tasksList.length; i++) {
            if (this.task.taskId == this.tasksList[i].taskId) {
              this.tasksList[i].taskName = this.taskForm.value.taskName;
            }
          }
          this.edit.emit(this.tasksList);
          this.ref.detectChanges();
        }
        else {
          this.taskFormRequiredMsg = true;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task && changes.task.currentValue) {
      this.task = changes.task.currentValue as Task;

      this.taskForm
        .patchValue({
          taskName: this.task.taskName,
        });
    }
    if (changes.tasksList && changes.tasksList.currentValue) {
      this.tasksList = changes.tasksList.currentValue as Task[];
    }
  }
}
