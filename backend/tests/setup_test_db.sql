CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL
);

INSERT INTO products (title, price) VALUES ('Nothing', 0), ('Nothing+', 1.00);