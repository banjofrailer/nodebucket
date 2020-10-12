/**
 * Title: employee.interface.ts
 * Author: Professor Krasso
 * Date: 7 October 2020
 * Modified By: Sarah Kovar
 * Description: Employee Interface
 */

import { Item } from './item.interface';


 export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
 }
