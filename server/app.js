/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Sarah Kovar
 * Description: Server/APIs
 */

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { resolveSanitizationFn } = require('@angular/compiler/src/render3/view/template');
const Employee = require('./models/employee');
const EmployeeApi = require('./routes/employee-api'); //import the employee API
/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
//const conn = 'mongodb+srv://superadmin:s3cret@cluster0-lujih.mongodb.net/nodebucket?retryWrites=true&w=majority';
const conn = 'mongodb+srv://nodebucket_admin:sesame@buwebdev-cluster-2.ymhwp.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */

app.use('/api/employees', EmployeeApi); //localhost:3000/api/employees

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
