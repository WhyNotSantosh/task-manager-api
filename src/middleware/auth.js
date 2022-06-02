const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '').trim()
        //console.log("token: "+token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log("decoded: "+decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        //console.log("After user find: ", user)
        req.token = token
        //console.log("After token add: ",req.token)
        req.user = user
        next()
    }
    catch (e) {
        res.status(401).send({ error: 'Please Authenticate' })
    }
}

module.exports = auth