import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }


  const bearerToken = token.split(' ')[1]; 
  if (!bearerToken) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
