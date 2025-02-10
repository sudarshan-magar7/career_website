const jwt = require("jsonwebtoken");

const JWT_SECRET = 'thisIsMyKey'; 

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with 'Bearer '
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ message: 'Authorization token missing or malformed' });
    // }
    if (!authHeader ) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    // Extract the token from the Authorization header
    const token = authHeader
    // .split(' ')[1];


    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Attach userId to the request object for further use in route handlers
        req.userId = decoded._id;
        value=decoded.userId;
        console.log(value);

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // In case of any errors with the token (e.g., invalid or expired)
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;