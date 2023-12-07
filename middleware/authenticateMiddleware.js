const jwt = require('jsonwebtoken');

const secretKey = 'todolistadmin2002';

const authenticateMiddleware = (req, res, next) => {
   const token = req.headers.authorization || req.query.token || req.cookies.token;

   if (!token) {
     return res.status(401).json({ message: 'Unauthorized' });
   }

   try {
     const decoded = jwt.verify(token, secretKey);
     req.user = decoded.user;
     next();
   } catch (error) {
     console.error('JWT verification failed:', error);
     return res.status(401).json({ message: 'Unauthorized' });
   }
 };

 module.exports = authenticateMiddleware;
