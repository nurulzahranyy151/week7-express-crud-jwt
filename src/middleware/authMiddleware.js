const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Access denied, token required"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            return res.status(400).json({
                success: false,
                message: "Invalid r Expired token"
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;