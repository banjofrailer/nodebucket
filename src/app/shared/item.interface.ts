/**
 * Title: item.interface.ts
 * Author: Professor Krasso
 * Date: 5 October 2020
 * Modified By: Sarah Kovar
 * Description: Item Interface
 */

import { ObjectUnsubscribedError } from 'rxjs';

 export interface Item {
    _id: string;
    text: string;
 }
