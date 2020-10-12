/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Date: 7 October 2020
 * Modified By: Sarah Kovar
 * Description: Home Component
 */

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/task.service';
import { Item } from '../../shared/item.interface';
import { Employee } from 'src/app/shared/employee.interface';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  //todo: Array<Item>;  //carrot signifies the type - a generic type
  todo: Item[];         //[] indicates it's an array

  done: Item[];
  employee: Employee;

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user');  //get the active session user

    this.taskService.findAllTasks(this.empId).subscribe(res => {

      console.log('--Server response from findAllTasks--');

      console.log(res);

      this.employee = res.data;

      //this.todo = res['data'].todo;
      //this.done = res['data'].done;

      //console.log(this.todo);
      //console.log(this.done);

      console.log('--Employee object--');
      console.log(this.employee);

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('This is the complete function');
      console.log(this.todo);
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>)  {

    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the existing list of task items');

      this.updateTaskList(this.empId, this.todo, this.done); //commented out 10/10 11:12am

    } else {
      transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

      console.log('Moved task item to the new container');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done=this.employee.done;

    })
  }
openCreateTaskDialog(){
const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
  disableClose: true
})

dialogRef.afterClosed().subscribe(data => {
  if(data) {
    this.taskService.createTask(this.empId, data.text).subscribe(res => {
      this.employee=res.data;
      }, err=> {
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
  }
})
}

deleteTask(taskId: string) {
  if (taskId) {
    console.log(`Task item: ${taskId} was deleted`);

    this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }
}
}
