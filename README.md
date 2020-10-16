# Comment Service

## Introduction
#### Technology Stacks & Packages:
 - NodeJS v12.19.0
 - TypeScript
 - Testing : Mocha & Chai
 - Logging : winston, winston-daily-rotate-file and morgan
 - Database: MongoDB v4.2
 - Swagger API Documentation
 - nyc (code coverage)
 - Docker

## API Documentation
Too see the API Documentation locally 
- install [reload](https://www.npmjs.com/package/reload) with `npm` or `yarn`

```bash
npm i -g reload
yarn global add reload
```
- Run `reload`. Default port is `8080` for specific port use flag `-p` with port
```bash 
$ reload -d apispec/

Reload web server:
listening on port 8080
monitoring dir apispec/

```
- open browser [http://localhost:8080](http://localhost:8080)


## Installation

- Run command `yarn` or `npm i`
- Create `.env` file from `.env.example` 

## .env

- `NODE_ENV`: development or production
- `APP_PORT`: app / server port
- `LOG_LEVEL`: level logging
- `LOG_DIR`: directory for write log
- `DATABASE_URL`: database url to mongodb
- `DATABASE_NAME`: mongodb database name mongodb
- `DOCKER_MONGO_PORT`: to specify host port that will be mapped by docker mongodb

## Run project 
- Start app `$ yarn start`
- For development `$ yarn dev` and `$ yarn test`
- Compile project `$ yarn compile`

### Run project using docker-compose
- Start app `$ docker-compose up -d`
- Running test `$ yarn test:docker`

if you got ERROR: Couldn't connect to Docker. Try with `sudo`

Example request:
`GET http://localhost/orgs/github/comments`

## License
[MIT](https://choosealicense.com/licenses/mit/)