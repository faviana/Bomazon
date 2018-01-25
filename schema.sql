CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(225) NULL,
  department_name VARCHAR (225) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES 

('Dresses', 'Clothe', 25.00, 20), 
('Pants', 'Clothe', 30.00, 15),
('T-Shirts', 'Clothe', 15.00, 25), 
('Cardigan', 'Clothe', 20.00, 10), 
('Jackets', 'Clothe', 35.00, 5), 
('Play Station 4', 'Video Games', 300.00, 3), 
('PS Vita', 'Video Game', 210.00, 1)
('Xbox One X', 'Video Game', 500.00, 4), 
('Wii U', 'Video Game', 280.00, 5), 
('Nintendo Switch', 'Video Game', 300.00, 2);