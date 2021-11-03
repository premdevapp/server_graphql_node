const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {ApolloServer} = require("apollo-server-express")

const connectDB = require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs: require('./graphql/schema'),
        resolvers: require('./graphql/resolvers'),
    })
    await server.start()
    server.applyMiddleware({app, path: '/graphql'})
}

startServer().then(() => {
    console.log(`Server ready on 3000`)
})
module.exports = app;
