import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const expressApp = express();

const dataArr = [
    {
        id: 1,
        name: "test1"
    },
    {
        id: 2,
        name: "test2"
    },
    {
        id: 3,
        name: "test3"
    },
    {
        id: 4,
        name: "test4"
    }
]

const schema = gql `
    type Query {
        user(id: Int): User
        allUsers: [User]
    }

    type User {
        id: Int
        name : String
    }
`;
const resolvers = {
    Query: {
        user: (parent, args) => {
            let userObj;
            dataArr.forEach( (user, index, array) => {
                if(user.id === args.id)
                    userObj = user; 
            });
            return userObj;
        },
        allUsers: () => {
            return dataArr;
        }
    }
};

const apolloServer = new ApolloServer({
    typeDefs : schema,
    resolvers: resolvers,
    playground: {
        settings: {
          'editor.theme': 'light'
        }
      }
});

apolloServer.applyMiddleware({
    app: expressApp,
    path: '/akhql'
})

expressApp.listen({port: 8000}, () => {
    console.log("Express Server listening in port 8000...");
})