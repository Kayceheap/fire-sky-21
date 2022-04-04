const { User } = require('../models')
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            console.log("INside me")
            return User.findOne({ username });
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
            console.log("IN login")

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
            console.log("IN Save book", args)
            if (context.user) {
                const newUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: { ...args } } },
                    { new: true }
                );

                console.log("Return user", newUser)
                return newUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, args, context) => {
            console.log("IN remove book", args)
            if (context.user) {
                console.log(context.user);
                const username = context.user.username;

                const newUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { ...args } } },
                    { new: true }
                );

                console.log("Return user", newUser)
                return newUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;