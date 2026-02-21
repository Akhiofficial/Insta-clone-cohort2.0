const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
    const token = req.cookies.token;
    let decoded = null;

    // check user have token or not if not return this
    if (!token) {
        return res.status(401).json({
            message: "token not provided, Unauthorized Access",
        });
    }

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); //jwt secreate is used to verify token generated from our server or not
    } catch (error) {
        return res.status(401).json({
            message: "User not authorized",
        });
    }

    //   its contains the data of user who is login with valid token
    req.user = decoded

    next()

}

module.exports = {
    identifyUser
}
