/**
 * Title: employee-api.js
 * Author: Professor Krasso
 * Date: 30 September 2020
 * Modified By: Sarah Kovar
 * Description: API for Employees
 */


const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

 /**
  * Find employees by ID
  */

router.get('/:empId', async(req, res) => {

  try {

    /**
     * Use the mongoose employee model to query MongoDB Atlas by employeeID
     */
    Employee.findOne({ 'empId': req.params.empId }, function(err, employee){

      /**
       * If there is a database level error, handle by returning a server 500 error
       */
      if (err) {
        console.log(err);

        //const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err); //new

        res.status(500).send({
          'message': 'Internal server error!'

        //res.status(500).send(mongoDbErrorResponse.toObject()) //new
        })
      } else {
        /**
         * If there are no database level errors, return the employee object
         * {}
         */
        console.log(employee);

        //const employeeTasksResponse = new BaseResponse('200', 'Query Successful', employee); //new
        //res.json(employeeTasksResponse.toObject()); //new

        res.json(employee);
      }
    })

    } catch (e) {
      /**
       * Catch any potential errors we didn't prepare for
       */
      console.log(e);

      res.status(500).send({
        'message': 'Internal server error!'
      })

     //const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message); //new
     //res.status(500).send(errorCatchResponse.toObject()); //new

  }
})

/**
class EmployeeResponse {
  statusCode
  constructor(message, statusCode, errorMessage) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;

  }
}
 */


/**
 * findAllTasks
 */
 router.get('/:empId/tasks', async(req, res) => {
   try{
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
      if(err) {
        console.log(err);
        //res.status(500).send({
        //  'message': 'Internal server error!'
        const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err); //new
        res.status(500).send(mongoDbErrorResponse.toObject()) //new

      //  })
      } else {
        console.log(employee);
        //res.json(employee);

        const employeeTasksResponse = new BaseResponse('200', 'Query Successful', employee); //new
        res.json(employeeTasksResponse.toObject()); //new

      }
      })

   }catch (e) {
    // res.status(500).send({
    //   'message': 'Internal server error!'
    console.log(e);  //new
    const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message); //new
    res.status(500).send(errorCatchResponse.toObject()); //new

    // })
   }
 })
 //you would want to segregate the task to its own file too
//then you'd have a task-api.js


/**
 * API: createTask
 */
router.post('/:empId/tasks', async(req, res) => {

  try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);
        const createTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(createTaskMongoDbErrorResponse.toObject());

      }else {
        console.log(employee);

        //create a new item object
        const item = {
          text: req.body.text
        };
        //push the new item to the todo array
        employee.todo.push(item);

        employee.save(function(err, updatedEmployee) {
          if (err)
            {
              console.log (err);
              const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server error', err);
              res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedEmployee);
              const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful Entry', updatedEmployee);
              res.json(createTaskOnSaveSuccessResponse.toObject());

            }
    })

  }
})

  } catch (e) {

      console.log(e);

      const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

      res.status(500).send(createTaskCatchErrorResponse.toObject());

  }
})


 /**
 * API: updateTask
 */
router.put('/:empId/tasks', async(req,res) => {
  try{

    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);
        const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(updateTaskMongoDbErrorResponse.toObject());

      }else {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });

        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);
            const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());

        } else {
          console.log(updatedEmployee);
          const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update Successful', updatedEmployee);
          res.json(updatedTaskOnSaveSuccessResponse.toObject());
        }
      })
      }
    })

  } catch (e) {

    console.log(e);

    const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

    res.status(500).send(updateTaskCatchErrorResponse.toObject());


  }
})




 /**
 * API: deleteTask
 */

router.delete('/:empId/tasks/:taskId', async(req, res) => {

  try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee){

      if (err) {
        console.log(err);
        const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());

      }else {
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err,updatedTodoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());

            }  else {

              console.log(updatedTodoItemEmployee);
              const deleteToDoItemSuccessResponse = new BaseResponse('200', 'Removed item from the todo list', updatedTodoItemEmployee);
              res.json(deleteToDoItemSuccessResponse.toObject());
            }
          })

        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err,updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());

            }  else {

              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from the done list', updatedDoneItemEmployee);
            //  res.json(updatedDoneItemEmployee.toObject());
             res.json(deleteDoneItemSuccessResponse.toObject());
            }
          })


        } else {
          console.log('Invalid task Id');

          const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Unable to locate the requested task', null);

          res.status(200).send(deleteTaskNotFoundResponse.toObject());
        }

        }

    })


  } catch (e) {

    console.log(e);

    const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

    res.status(500).send(deleteTaskCatchErrorResponse.toObject());


  }
})





module.exports = router;

