## Senior Design Project

### Introduction

Our Senior Design Project

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
- Socket.js
- Jest
- S3
- Cookie Session
- Passport.js
- Winston
- Morgan
- Github Workflows

## Instructions

- Create a `.env` file in `server` in the `main` branch with the following lines of code

```
PORT=8080
CORS_URL=*
IS_STAGING=staging # toggle if we're in a staging environment. I.e we're running npm run build -> npm start

# mongo
DB_NAME=dev
DB_PORT=8080
DB_USER=
DB_USER_PWD=
DB_HOST_NAME=SeniorDesign

# AWS
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=

FRONT_END_DEV_CORS_URL=http://localhost:3000

# google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=/google/callback

GOOGLE_MAIL_NAME=
GOOGLE_MAIL_PASSWORD=

```

- Create a `.env` file in `client` in the `main` branch with the following lines of code

```
REACT_APP_PUBLIC_SERVER_DEV_URL=http://localhost:8080 # notice in create-react-app, env variables start with REACT_APP app prefix
```

Ask `kevinxu12` to fill in rest of `.env` variables specified in `.config` files.

- Run `npm install` in the base directory

### Cross Origin Testing

This is probably the fastest method of testing where the client and server are on different domains. To run this,

#### Frontend

- Run `cd client`
- Run `npm install`
- Run `npm start`
- The frontend will run off of `localhost:3000`

#### Backend

- Run `cd server`
- Run `npm install`
- Run `npm start` to launch dev environment
- The backend will run off of `localhost:8080`

### Same-Origin Testing / Deployment

#### Backend

- Run `cd server`
- Run `npm run build`
- Run `npm start` to launch dev environment.
- The frontend and backend will be on `localhost:8080`

### Backend Logging

- Import the `logger` client from `app` and use anyone of

```
logger.info
logger.http
logger.warn
logger.debug
logger.error
```

### TO DOs

- Find TO-DOs in the issues tab of the codebase.

### Style

- Put static constants or urls in the corresponding `client/constants` or `server/constants` file.
  Instead of

```
<img url="test-url.png"/>
```

We can use

```
<img url={Constants.TEST_URL}/>
```

where `Constants` is defined in the top-level, corresponding `constants` file.

- Skew toward not calling `process.env` directly, and adding a relevant constant to the corresponding `config.ts` file
- Link relevant issues in PR descriptions and vice versa, so that github can clean up issues.
- Run `npm run lint:fix` in both `client` and `server` before pushing.
- Try to write tests (bad with this?)

### Helpful

- Run `npm run generate` to generate new components on the frontend
- Run `npm start` from `client` in one terminal tab, and `npm start` from `server` tab to develop faster.
- Delete remote branches after merging in the console
- Use Stacked PRs if necessary
- Update `README.md` actively
- Run `npx depcheck` to update `package.json` for unneeded requirements and dependencies
