import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
const GetGoodReadsJson = require('./getGoodReadsJson');
const fetch = require('node-fetch');
const API_KEY = require('./api.key');
const BASE_URL = 'https://www.goodreads.com/';
const BOOK_PATH = 'book/isbn/';
const AUTHOR_PATH = 'author/show/';
const QUERY_PARAM = "?"
const KEY_PARAM = 'key=';

const expressApp = express();

const schema = gql`
    type Query {
        author (id: Int): Author!
        book(isbn: String): Book!
    }

    type Book {
        title: String!
        isbn : String
        authors: [Author]
    }

    type Author {
        name: String!
        id: String
        books: [Book] 
    }
`;
const resolvers = {
    Query: {
        book: (parent, args) => {
            let { isbn } = args;
            let fetchUrl = BASE_URL + BOOK_PATH + isbn + QUERY_PARAM + KEY_PARAM + API_KEY.key;
            return GetGoodReadsJson.getData(fetchUrl)
                .then((json) => {
                    console.log("\nGR Book JSON : " + JSON.stringify(json));
                    return {
                        title: json.book.title,
                        isbn: json.book.isbn,
                        authors: [
                            {
                                id: json.author.author_id,
                                name: json.author.name
                            }
                        ]
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        author: (parent, args) => {
            let { id } = args;
            let fetchUrl = BASE_URL + AUTHOR_PATH + id + QUERY_PARAM + KEY_PARAM + API_KEY.key;
            console.log("\nGR Author URL"+fetchUrl);
            return GetGoodReadsJson.getData(fetchUrl)
                .then((json) => {
                    console.log("\nGR Author JSON : " + JSON.stringify(json));
                    return {
                        name: json.author.name,
                        id: json.author.author_id
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};

const apolloServer = new ApolloServer({
    typeDefs: schema,
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

expressApp.listen({ port: 8000 }, () => {
    console.log("Express Server listening in port 8000...");
});
