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

- Create a `.env` file in `server` in the `main` branch with the following lines of code

```
PORT=8080
CORS=*
AWS
# mongo
DB_NAME=
DB_HOST=
DB_PORT=
DB_USER=
DB_USER_PWD=
DB_HOST_NAME=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
FRONT_END_URL=http://localhost:3000
```

- Create a `.env` file in `client` in the `main` branch with the following lines of code

```
PUBLIC_DEV_URL='http://localhost:8080'
```

Ask `kevinxu12` to fill in rest of `.env` variables specified in `.config` files.

- Run `npm install` in the base directory

#### Frontend

- Run `cd client`
- Run `npm install`
- Run `npm start` or `npm run lint:fix` or `npm run lint` for relevant commands.

#### Backend

- Run `cd server`
- Run `npm install`
- Run `npm start` to launch dev environment
- In dev, the frontend will be on `PORT` and backend will be `PORT/api/(route)`
- To load with the newest frontend, run `npm build` before `npm start`

### TO DOs

- Find TO-DOs in the issues tab of the codebase.

#### Style

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

- Link relevant issues in PR descriptions and vice versa, so that github can clean up issues.
- Pre-commit hooks require `es-lint` to pass basic requirements. See more information online

#### Helpful

- Run `npm run generate` to generate new components on the frontend
- Run `npm start` from `client` in one terminal tab, and `npm start` from `server` tab to develop faster.
- Delete remote branches after merging in the console
- Use Stacked PRs if necessary
- Update `README.md` actively
- Run `npx depcheck` to update `package.json` for unneeded requirements and dependencies
