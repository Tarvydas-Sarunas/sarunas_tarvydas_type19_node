-- Create users table

CREATE TABLE users (
  user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT UNSIGNED
);

-- Create shop_items table
CREATE TABLE shop_items (
  shop_item_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  shop_item_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
  description TEXT,
  image VARCHAR(255) NOT NULL,
  item_type_id INT UNSIGNED
);

-- Create item_types table
CREATE TABLE item_types (
  item_type_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  item_type_name VARCHAR(255) NOT NULL
);

-- Create orders table--
CREATE TABLE orders (
  order_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  shop_item_id INT UNSIGNED NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(255)
);

-- Create user_roles table
CREATE TABLE user_roles (
  role_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  role_name VARCHAR(255) NOT NULL
);


-- Add all posts
INSERT INTO posts (title, author, date, body) VALUES
('Post 1', 'James Band', '2023-12-20', 'This is body of Post 1'),
('Post 2', 'Jane Dow', '2023-12-01', 'Body of post 2'),
('POST 3', 'James Band', '2023-12-04', 'Body about post 3'),
('Post 4', 'Mike T', '2023-12-14', 'Post about Boxing from T. '),
('Post 5', 'Mike T', '2023-12-15', 'Post about Boxing from T. '),
('Post 6', 'Jane Dow', '2023-11-05', 'Post 6 about Jane');

-- Create one post
INSERT INTO posts 
  (title, author, date, body) 
  VALUES ('Post 5', 'Mike T', '2023-12-15', 'Post about Boxing from T. ');

