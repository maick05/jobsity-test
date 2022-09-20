# Node.js Challenge

## Description

This software was built in NestJS

[Nest](https://github.com/nestjs/nest) framework TypeScript for NodeJS.

## Technologies

- NodeJS
- NestJS
- Typescript
- MongoDB
- Docker
- JWT Auth

## Installation

- Stock Service
  ```bash
  $ cd stock-service
  $ npm install
  ```
- Api Service

  ```bash
  $ cd api-service
  $ npm install
  ```

## Running the app

- Stock Service

```bash
$ cd stock-service
# start server once
$ npm run start

# watch mode
$ npm run start:dev
```

- Api Service

```bash
$ cd api-service
# start server once
$ npm run start

# watch mode
$ npm run start:dev
```

OR

- Start with docker-compose
  ```bash
  $ docker-compose up --build
  ```

OBS: Wait until see "Nest Successfully started in both services" in the cmd log

## Test

- Stock Service

```bash
$ cd stock-service
# unit tests
$ npm run test:cov

# e2e tests
$ npm run test:e2e
```

- Api Service

```bash
$ cd api-service
# unit tests
$ npm run test:cov

# e2e tests
$ npm run test:e2e
# e2e tests stock route
$ npm run test:e2e-full
```

## Bonuses Features

- Add unit tests for the services.

  - go to the service folder (stock-service or api-servoce) and run:

  ```bash
  $ npm run test:cov
  ```

  - The coverage files are available in:
    - stock-service:
      - /stock-service/coverage/lcov-report/index.html
    - api-service:
      - /api-service/coverage/lcov-report/index.html

- Add contract/integration tests for the API service.

  - Stock Service
    ```bash
    $ cd stock-service
    $ npm run test:e2e
    ```
  - Api Service (Only run the test:e2e-full if stock-service is running)
    ```bash
    $ cd api-service
    $ npm run test:e2e
    # OBS: RUN ONLY e2e-full IF STOCK SERVICE IS RUNNING
    $ npm run test:e2e-full
    ```

- Use JWT instead of basic authentication for endpoints.
  - First register your user in the "http://localhost:3001/register" route
    - You will receive the email and password in json response
  - Then you can get your JWT token in the [POST] "http://localhost:3001/login" route
    - passing your user and password in basic auth header authorization
    - You will get a token in a json response if everything is correct
    - You must use this token as bearer authentication
- Use containers to orchestrate the services.

  - There is a docker-compose.yaml file in root dir and a Dockerfile in service folders
  - In the repository folder just run the command:
    ```bash
    $ docker-compose up --build
    ```
    OBS: Wait until see "Nest Successfully started in both services" in the cmd log

- Use OpenAPI/Swagger to document the API.

  - Start the services and access the route "/api" to get the swagger
    - Stock Service
      - route: "http://localhost:3002/api/"
      - file: "/stock-service/swagger-spec.json"
    - Api Service
      - route: "http://localhost:3001/api/"
      - file: "/api-service/swagger-spec.json"

- Add endpoint to reset user password sending an email with the new password.
  - You can reset your password accessing the route [POST] "http://localhost:3001/reset-password?email=your_email"
  - A new password will be sent to your email
    - Some times it can take one or two minutes, please just wait
    - Check the spam

## Routes

```bash
# Register User route and get random password
$ [POST] localhost:3001/register
# Logi route to get JWT token passing basic auth
$ [POST] localhost:3001/login
# Get Stock Quote
$ [GET] localhost:3001/stock?q={stock_code}
# Get User Request History of stock quotes
$ [GET] localhost:3001/history
# Get info stats of requests by admin
$ [GET] localhost:3001/stats
# Reset password route by e-email
$ [GET] localhost:3001/reset-password?email=your_email
# Get Stock Quote - internal service route
$ [POST] localhost:3002/stock/{stock_code}
```

## Support

maicksantos05@hotmail.com

## License

Nest is [MIT licensed](LICENSE).
