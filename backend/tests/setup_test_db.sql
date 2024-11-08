CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL
);

INSERT INTO products (title, price) VALUES ('Nothing', 0), ('Nothing+', 1.00);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  confirmed BOOLEAN DEFAULT false,
  product_id INTEGER DEFAULT 1 NOT NULL,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT unique_username UNIQUE (username)  -- Table-level UNIQUE constraint
);