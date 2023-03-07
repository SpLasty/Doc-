const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).send({
                message:'Auth failed',
                success: false,
            });
        }
        else{
            req.body.userId = decodedToken.id;
            next();
        }
        ;
    });
    
  } catch (error) {
    res.status(401).send({ error: error | "Request not authenticated" });
  }
};
