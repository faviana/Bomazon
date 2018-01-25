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

connection.connect(function(err) {
  if (err) throw (err);
  // console.log("connected as id " + connection.threadId);
  
  display();
});

function display() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    console.log("===============Welcome To Bamazon===============");
    console.log("==========Below is a list of our items==========");

    for (var i = 0; i < results.length; i++) {
      console.log("________________________________________________");
      console.log("");
      console.log("Item Id: " + results[i].item_id + " | Name: " + results[i].product_name + " | Price: " + results[i].price);
    }
    console.log("__________________________________________________");
  });
}