const {User} = require('../models')

const resolvers = {
    Query: {
      User: async (parent, {username}) => {
        return User.findOne({username});
      }
    }
  };
  
  module.exports = resolvers;