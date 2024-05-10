const verifyAdminToken = require('./verifyAdminToken.js');

// Middleware to check authentication
const authenticate = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ success:false,message: 'Unauthorized - Missing token' });
    }

    const token = authorizationHeader.slice(7);

    // Verify and decode the token (you need to implement this function)
    
    const user = await verifyAdminToken(token);

    if (!user) {
        return res.status(401).json({ success:false,message: 'Unauthorized - Invalid token' });
    }

    // Attach the user to the request for later use
    req.user = user;
    console.log(user)
    next();
};

module.exports = authenticate;