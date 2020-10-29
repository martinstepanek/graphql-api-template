## Serve API

-   Create `ormconfig.json` based on `ormconfig.json.env` and `src/config.ts` on `src/config.ts.env`

```
$ docker-compose exec api npm i
$ docker-compose up
```

#### [GraphQL operations you can try](docs/OPERATIONS.md)

## URIs

-   GraphQL & GraphQL Playground http://localhost:4000/graphql
-   GraphQL metrics http://localhost:4000/graphql/metrics

## Commands

-   `npm run serve` - Run GraphQL API
-   `npm run migration` - Handy shortcut for migration cmd (see https://typeorm.io/#/migrations)
-   `npm run lint` - Run eslint fix on `./src`

## Configurations

-   `ormconfig.json` - Database
-   `nodemon.json` - For nodemon plugin for development
-   `docker-compose.yml` - Docker services
-   `tsconfig.json` - TypeScript compilation
-   `.eslintrc` - For eslint

## Directories in `./src`

-   `bootstrap` - Contains functions for API bootstraping
-   `migrations` - Contains all (non-)generated migrations
-   `resolvers` - Contains GraphQl resolvers
-   `models` - Contains GraphQL/Entity models, Repositories, Services and Input models, Args models - grouped by type

## Script types

-   `<Type>Resolver` - Resolver (GraphQL resolver can be compared with REST API controller)
-   `<Type>Service` - Service that provides data of `<Type>`
-   `<Type>Input` - Input data model, model that comes into resolver
-   `<Type>Args` - Argument model, defines arguments in queries for `<Type>`
-   `<Type>` - GraphQL model (model that goes out from API) and Entity database model at once

## Important Libraries

-   [Apollo Server](https://github.com/apollographql/apollo-server) - GraphQL server
-   [TypeGraphQL](https://typegraphql.com/) - Layer for generation GraphQL schema from TypeScript
-   [Type ORM](https://typeorm.io) - Database layer (supports MySQL, MariaDB, PostgreSQL, CockroachDB, SQLite, MSSQL, Oracle and MongoDB)
-   [DataLoader](https://github.com/graphql/dataloader) - Batching/Caching data layer
-   [Class Validator](https://github.com/typestack/class-validator) - Provides decorators for validating class properties
-   [Apollo Metrics](https://www.npmjs.com/package/apollo-metrics) - Plugin to export basic GraphQL metrics
-   [TS Node](https://github.com/TypeStrong/ts-node) - TypeScript executor for Node
-   [EsLint](https://eslint.org/) - Checking/Fixing code quality/standard tool

## Testing

Mocha or https://github.com/alsatian-test/alsatian

## TODO

-   Add unit tests
