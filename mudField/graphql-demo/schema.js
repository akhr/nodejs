const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString } = require('graphql')

/* fetch('https://www.goodreads.com/author/show.xml?id=4432&key=9IzYbluHza0yMhNSsfWJQ')
.then(response => response.text())
.then(parseXML);
 */

const AuthorType = new GraphQLObjectType({
    name: 'author',
    description: '...',

    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    })
}) 

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        author: {
            type: AuthorType,
            args: 
        }
    })
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt }
                }
            }
        })
    })
});
