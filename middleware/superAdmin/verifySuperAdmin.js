import jwt from "jsonwebtoken"

const verifySuperAdmin = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify the token with the secret key
    const secretKey = process.env.JWT_SECRET; 
    const decoded = jwt.verify(token, secretKey);


    // Check for super admin role in the decoded token (adjust as per your token payload structure)
    if (decoded.userDetails.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied: Requires Super Admin' });
    }

    // Pass the decoded token to the request object for access in other routes or middlewares
    req.enterprise = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifySuperAdmin;
