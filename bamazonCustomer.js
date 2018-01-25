// npm install mysql
var mysql = require("mysql");

//npm install inquirer
var inquirer = require("inquirer");

//create a connection with my database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Chinitamax87*",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw (err);
  // console.log("connected as id " + connection.threadId);
  display();
 
});

//function to display all items from my database bamazon
function display() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    console.log("===============Welcome To Bamazon===============");
    console.log("==========Below is a list of our items==========");

    for (var i = 0; i < results.length; i++) {
      console.log("________________________________________________");
      console.log("");
      console.log("Id: " + results[i].item_id + " | Name: " + results[i].product_name + " | Price: " + results[i].price);
    }
    console.log("__________________________________________________");

    promptUser();
  });
}

// function to prompt user to enter a selection
function promptUser() {
  inquirer
    .prompt([{
      //prompt to select by ID
        name: "id",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }else{
          return false;
          }
        }
      },
      {
        //prompt to select how many units
        name: "units",
        type: "input",
        message: "How many units of the product would you like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }else{
          return false;
        }
      }
      }
    ])
    .then(function (answer) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === answer.id) {
          chosenItem = results[i];
          console.log(chosenItem);
        }
      }
    });
}

//adjust inventory ...
//  enough product?
//      No: 
//        -Insufficient quantity! (units - units entered by user)
//      Yes:
//        -update units in database
//        -show user total cost of purchase (number of units * price of item)

//would you like to make another purchase?
//  No:
//    -have a nice day
//  Yes:
//    -promptUser();