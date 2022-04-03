const {User} = require('../models')
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, {username}) => {
        return User.findOne({username});
      }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log("Adding user args", args);
            const user = await User.create(args);
            console.log("Adding user", user);

            const token = signToken(user);
            console.log("Return user", token);


            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {             
                const username = context.user.username;

                 await User.findByIdAndUpdate(
                     { _id: context.user._id },
                     { $push: { books: { ...args } } },
                     { new: true }
                 );

                 return User.findOne({username});
             }

             throw new AuthenticationError('You need to be logged in!');
        }
    }
  };
  
  module.exports = resolvers;