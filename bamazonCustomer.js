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

  console.log("connected as id " + connection.threadId);
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
      name: "id",
      type: "input",
      message: "select the ID of the product you would like to purchase (1-10)",

      //validate id
      validate: function(value){
        if(value.match(/^[0-9]+$/)){
          return true
        }
          return 'Enter a numercal value between 1 and 10'
      }
    }]).then(function (answer) {

      var query = "SELECT * FROM products WHERE ?";

      connection.query(query, {item_id: answer.id}, function (err, results) {

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

      name: "quantity",
      type: "input",
      message: "How many would you like?",

      //validate id
      validate: function(value){
        if(value.match(/^[0-9]+$/)){
          return true
        }
          return 'Enter a value between 1 and 10'
      }
    }]).then(function(answer){

      var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {stock_quantity: answer.quantity}, function (err, results) {

          for (var i = 0; i < results.length; i++) {
  
            console.log("");
            console.log("Id:" + results[i].item_id + " || Name: " + results[i].product_name + " || Price: $" + results[i].price + ".00");
            console.log("");
  
            newPrompt();
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

function newPrompt(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to place another order?'
	}]).then(function(answer){
		if(answer.choice){
      promptUserId();
		}
		else{
			console.log('Thank you for visiting at Bamazon');
			connection.end();
		}
	})
};

// add category