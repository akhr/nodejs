import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
const fetch = require('node-fetch');
const API_KEY = require('./api.key'); 

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
    }, {
       
    }
]

const schema = gql `
    type Query {
        user(id: Int): User!
        users: [User]
        validUsers: [User!]!
    }

    type User {
        id: Int
        name : String
    }
`;
const resolvers = {
    Query: {
        user: (parent, args) => {
            let userObj = null;
            dataArr.forEach( (user, index, array) => {
                if(user.id === args.id)
                    userObj = user; 
            });
            if(!userObj){
                console.log("No such User");
                return {};
            }else
                return userObj;
        },
        users: () => {
            return Object.values(dataArr);
        },
        validUsers: (parent) => {
            let validList = [];
            parent.forEach( (user)  => {
                if(user.id && user.name){
                    validList.push(user);
                }
                return validList;
            })
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
});



function test() {
    console.log("In test.js");
    GetGoodReadsJson.getBook("0441172717")
    .then((json) => {
        // console.log(`JSON resp : ${JSON.stringify(json)}`);
    }).catch((e) => {
        console.log("Error : "+e);
    });
    
}

test();