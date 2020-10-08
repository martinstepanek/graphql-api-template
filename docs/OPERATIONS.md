# Operations

-   GraphQL Playground http://localhost:4000/graphql

## Mutations

### Login using Google tokenId

```graphql
mutation {
    login(user: { tokenId: $tokenId }) {
        userId
        name
        accessToken
        email
        picture
    }
}
```

## Queries

### Paginated users

```graphql
query {
    users {
        totalCount
        edges {
            cursor
            node {
                userId
                name
                accessToken
                email
                picture
            }
        }
    }
}
```

### User detail by userId

```graphql
query {
    user(userId: $userId) {
        userId
        name
        accessToken
        email
        picture
    }
}
```
