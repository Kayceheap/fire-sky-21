const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function({ req }) {
    console.log("In server middlware")
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
    console.log("In server middlware  authorization header")

      token = token
        .split(' ')
        .pop()
        .trim();
    }

    console.log("In server middlware check token", token)

    if (!token) {
      return req;
    }

    console.log("Have a token")

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    console.log("In server middlware return req")

    return req;
  },
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
