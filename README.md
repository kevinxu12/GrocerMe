## Senior Design Project

### Introduction

Based off create-react-app, react-boilerplate github [See Here](https://github.com/react-boilerplate/react-boilerplate-cra-template]).

### Technologies

#### Frontend

- Jest (Out of date, haven't been testing - NICE TO HAVE)
- Redux
- Thunk
- Reselect
- Saga (Remove soon)
- Typescript

#### Backend

- Typescript
- Mongoose
- AWS SDK

### Instructions

- Create a `.env` file in `server` with the following lines of code

```
PORT=8080
CORS=*
```

Ask `kevinxu12` to fill in rest of `.env` variables specified in `.conig` files.

- Run `npm install` in the base directory

#### Frontend

- Run `cd client`
- Run `npm install`
- Run `npm start` or `npm run lint:fix` or `npm run lint` for relevant commands.

#### Backend

- Run `cd server`
- Run `npm install`
- Run `npm start`
- In dev, the frontend will be on `PORT` and backend will be `PORT/api/(route)`

### TO DOs

- Set up OAuth
- Clean up testing code
