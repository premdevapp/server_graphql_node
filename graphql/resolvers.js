const Post = require('../model/post');
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAll: async () => {
            return await Post.find({});
        }
    }
}
module.exports = resolvers