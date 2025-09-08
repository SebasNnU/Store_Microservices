CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    lastName VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    state VARCHAR(50) NOT NULL,
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    total DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    productId INT,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);
