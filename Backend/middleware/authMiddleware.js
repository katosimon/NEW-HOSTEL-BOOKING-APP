import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: 'Not authorized, token format invalid' });
      }

      // Verify token using your JWT_SECRET from the .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user ID to the request object
      req.user = decoded.id;

      next(); // Proceed to the controller
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no authorization header was provided at all
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
