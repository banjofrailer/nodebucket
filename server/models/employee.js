/**
 * Title: employee.js
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Sarah Kovar
 * Description: Employee model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require ('./item');
/**
 * employee schema, sprint 1
 */
let employeeSchema = new Schema({
  empId: {type: String, unique: true, dropDups: true},
  firstName: {type: String},
  lastName : {type: String},
  todo: [Item],
  done: [Item]
}, { collection: 'employees'})

module.exports = mongoose.model('Employee', employeeSchema);
