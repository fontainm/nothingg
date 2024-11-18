CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL
);

INSERT INTO products (title, price) VALUES ('Nothingg', 0), ('Nothingg+', 1.00);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  new_email VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  confirmed BOOLEAN DEFAULT false,
  product_id INTEGER DEFAULT 1 NOT NULL,
  verify_token VARCHAR(255),
  verify_token_expires TIMESTAMP,
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  last_email_sent TIMESTAMP,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT unique_username UNIQUE (username)
);

