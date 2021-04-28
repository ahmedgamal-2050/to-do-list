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

  @Input() public tasksList: string[] = [];
  @Output() add = new EventEmitter<any>();
  @Input() public task?: Task;
  @Output() edit = new EventEmitter<string[]>();

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

  addTask() {
    if (this.task === undefined) {
      if (this.taskForm.dirty && this.taskForm.valid) {
        this.tasksList.push(this.taskForm.value.taskName);
        this.taskForm.reset();
        this.add.emit();
      } else {
        this.taskFormRequiredMsg = true;
      }
    } else {
      if (this.taskForm.dirty && this.taskForm.valid) {
        for (let i = 0; i <= this.tasksList.length; i++) {
          if (this.tasksList[this.task.taskIndex] === this.tasksList[i]) {
            this.tasksList[i] = this.taskForm.value.taskName;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task && changes.task.currentValue) {
      this.task = changes.task.currentValue as Task;

      this.taskForm
        .patchValue({
          taskName: this.task.taskName,
        });
    }
    if (changes.tasksList && changes.tasksList.currentValue) {
      this.tasksList = changes.tasksList.currentValue as any;
    }
  }
}
