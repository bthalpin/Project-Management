const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    loginRequired:function(req, res, next) {
        if (req.user) {
          next();
        } else {
      
          return res.status(401).json({ message: 'Unauthorized user!!' });
        }
      },
    // can add userName to signToken function and payload if needed
    signToken: function ({ email, _id }) {
        const payload = { email, _id };
        console.log(payload,secret)
        return jwt.sign({ data: payload}, secret, { expiresIn: expiration });
    },
};