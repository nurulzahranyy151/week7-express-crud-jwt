CREATE DATABASE week6_express_db;
USE week6_express_db;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100),
    model VARCHAR(100),
    year INT,
    price DECIMAL(20,2)
);

INSERT INTO cars (brand, model, year, price) VALUES
('Toyota', 'Avanza', 2015, 12500000.00),
('Toyota', 'Hilux', 2012, 24500000.00),
('Honda', 'Civic', 2023,45000000.00);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
