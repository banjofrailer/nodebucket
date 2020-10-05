/**
 * Title: item.js
 * Author: Professor Krasso
 * Date: 30 September 2020
 * Modified By: Sarah Kovar
 * Description: Item model
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String }
});

module.exports = itemSchema;
