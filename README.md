<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Пользователи:  
POST /auth/register: регистрация нового пользователя.  
POST /auth/login: вход в систему, возврат JWT.  
GET /users: список всех пользователей (доступен только для админов).  
Реализована пагинация, чтобы получить пользователей с 11 по 20 нужно указать "/users?offset=10&limit=10".  
Реализована фильтрация по email, чтобы получить только пользователей содержащих в email "test" нужно указать "/users?filter=test"  
GET /users/:id: профиль пользователя (доступен для админов и самого пользователя).  
PUT /users/:id: обновление профиля (доступно для админа и самого пользователя).  
DELETE /users/:id: удаление пользователя (доступно для админов и самого пользователя).  

Записи:  
POST /posts: создание новой записи (доступно для аутентифицированных пользователей).  
GET /posts: список всех записей (доступен всем пользователям).  
Реализована пагинация, чтобы получить посты с 11 по 20 нужно указать "/posts?offset=10&limit=10".  
Реализована фильтрация по заголовку, чтобы получить только посты содержащих в заголовке "Тест" нужно указать "/posts?filter=Тест"  
GET /posts/:id: детальная информация о записи (доступна всем пользователям).  
PUT /posts/:id: обновление записи (доступно для автора записи).  
DELETE /posts/:id: удаление записи (доступно для админов и автора записи).  


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

!!! Для запуска проекта у вас должен быть файл ".env" в корневой директории, вот пример его заполнения (также прикрепил свой):  
**DATABASE_URL='postgresql://postgres:12345678@localhost:5432/main-db?schema=public'  
JWT_SECRET='VeRySeCrEtKeY'  
MIN_PASSWORD_LENGTH = 8**

## Test

```bash
# e2e tests
$ npm run test:e2e
```

!!! Для запуска тестов у вас должен быть файл ".env.test" в корневой директории, вот пример его заполнения (также прикрепил свой): 
**DATABASE_URL='postgresql://postgres:12345678@localhost:5432/test-db?schema=public'  
JWT_SECRET='VeRySeCrEtKeY'  
MIN_PASSWORD_LENGTH = 8**

## License

Nest is [MIT licensed](LICENSE).
