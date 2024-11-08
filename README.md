# Nothing

Sign up for nothing

## API

- Products
  - GET /products OK
  - GET /products/:id OK
- Users
  - GET /users OK
  - GET /users/total OK
  - GET /users/:id OK
  - DELETE /users/:id OK
  - DELETE /users OK
- User
  - GET /user/me
  - POST /users/signup
  - POST /user/login
  - POST /user/verify
  - POST /user/resend-email
  - POST /user/recover-password
  - POST /user/reset-password
  - PUT /user/username
  - PUT /user/email
  - PUT /user/password
  - DELETE /user/me

## TODO

- General

  - Upgrade & Downgrade
    - Add product, description, price in db
    - add Stripe
  - GitHub public

- Testing

  - Test email service?
  - Migration for test db
