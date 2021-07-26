const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next)=>{
    const token = req.header("token");
    if(!token){
        return res.status(401).json({msg: "Authentication error"});
    }

    try{
        const tkn = jwt.verify(token, "randomString");
        req.user = tkn.user;
        next();
    }catch (err){
       console.log(err);
       res.status(500).send({msg: "Token is invalid!"});
    }
};

module.exports = authMiddleware;