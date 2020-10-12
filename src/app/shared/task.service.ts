/**
 * Title: task.service.ts
 * Author: Professor Krasso
 * Date: 5 October 2020
 * Modified By: Sarah Kovar
 * Description: Task Service
 */


import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //sessionUser: string;
  //baseUrl: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {

  //  this.sessionUser = this.cookieService.get('session_user'); //get the logged in empId
  //  this.baseUrl = 'http://localhost:3000'; //testing url for our API layer

  }

  /**
   * findAllTasks
   */
  findAllTasks(empId: string): Observable<any> {
     return this.http.get('/api/employees/' + empId + '/tasks')
   // return this.http.get(this.baseUrl + '/api/employees/' + this.sessionUser + '/tasks')
  }

    /**
   * createTask
   */
  createTask(empId: string, task: string): Observable<any>{
      return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    } )


  }

    /**
   * updateTask
   */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any>  {
      return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })

  }

    /**
   * deleteTask
   */
  deleteTask(empId: string, taskId: string): Observable<any>  {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)

  }


}
