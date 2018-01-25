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
    console.log("");

    promptUserId();
  });
}

// function to prompt user to enter a selection
function promptUserId() {
  inquirer
    .prompt([{
      //prompt to select by ID
      name: "item_id",
      type: "input",
      message: "What is the ID of the product you would like to buy?",
    }])
    .then(function (answer) {
      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, {
        item_id: answer.item_id
      }, function (err, results) {
        for (var i = 0; i < results.length; i++) {
          console.log("");
          console.log("Id:" + results[i].item_id + " || Name: " + results[i].product_name + " || Price: $" + results[i].price + ".00");
          console.log("");

          promptUserQuantity();
        }

      });
    });
}

// function to prompt user to enter a selection
function promptUserQuantity() {
  inquirer
    .prompt([{
      name: "stock_quantity",
      type: "input",
      message: "How many would you like?",
    }])
    .then(function (answer) {
      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, {
        item_id: answer.item_id
      }, function (err, results) {
        for (var i = 0; i < results.length; i++) {
          console.log("");
          console.log(+stock_quantity, results[i].product_name + "for " + results[i].price + ".00 /each");
        }

      });
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

// add category