const jwt = require("jsonwebtoken")
require('dotenv').config()


const auth = (req, res, next) => {

    const fullToken = req.headers.authorization

    if (!fullToken) {
        return res.status(400).send({ msg: "Authorization Header Missign" })
    }

    if (fullToken.startsWith("Bearer ")) {
        const token = fullToken.split(" ")[1]
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded
            return next()
        } catch (error) {
            return res.status(401).send({ msg: "Invalid or expired token" })

        }
    }
    return res.status(400).send({ msg: "Bearer not found" })
}


const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next()
    }
    return res.status(403).send({ msg: "Not Authorised" })

}







module.exports = { auth, admin }