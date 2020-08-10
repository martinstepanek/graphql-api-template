## Serve API
```
npm i & docker-compose up -d
```

## Commands

- `npm run serve` - Run GraphQL API
- `npm run migration` - Handy shortcut for migration cmd (see https://typeorm.io/#/migrations)
- `npm run lint` - Run eslint fix on `./src`

## Configurations 
- `ormconfig.json` - Database 
- `nodemon.json` - For nodemon plugin for development
- `docker-compose.yml` - Docker services 
- `tsconfig.json` - TypeScript compilation 
- `.eslintrc` - For eslint

## Directories in `./src`
- `bootstrap` - Contains functions for API bootstraping
- `errors` - Contains basic GraphQl errors
- `migrations` - Contains all (non-)generated migrations
- `models` - Contains GraphQL/Entity models, Repositories, Resolvers, Services and Input models, Args models - grouped by type

## Script types
- `<Type>Resolver` - Resolver (GraphQL resolver can be compared with REST API controller)
- `<Type>Service` - Service that provides data of `<Type>`
- `<Type>Input` - Input data model, model that comes into resolver
- `<Type>Args` - Argument model, defines arguments in queries for `<Type>`
- `<Type>` - GraphQL model (model that goes out from API) and Entity database model at once

## Important Libraries 
- [Apollo Server](https://github.com/apollographql/apollo-server) - GraphQl server
- [TypeGraphQL](https://typegraphql.ml/) - Layer for generation GraphQL schema from TypeScript
- [Type ORM](https://typeorm.io) - Database layer (supports MySQL, MariaDB, PostgreSQL, CockroachDB, SQLite, MSSQL, Oracle and MongoDB)
- [Class Validator](https://github.com/typestack/class-validator) - Provides decorators for validating class properties
- [TS Node](https://github.com/TypeStrong/ts-node) - TypeScript executor for Node
- [EsLint](https://eslint.org/) - Checking/Fixing code quality/standard tool

## Testing
Mocha or https://github.com/alsatian-test/alsatian 

## Notes 
- Nested input validation is not possible until [this issue](https://github.com/19majkel94/type-graphql/issues/133) will be resolved and [TypeGraphQL](https://typegraphql.ml/) v1 will be released

## TODO
- Add middleware for showing validation errors
- Add unit tests