module.exports = (req, res, next) => {
    const { token } = req.cookie;
    console.log(token)
    if (!token) {
        return res.status(401).json(authError)
    }
    console.log(1)
    jwt.verify(token, process.env.JWT_KEYCODE, (err) => {
        if (err) {
            return res.status(401).json(authError)
        }
        console.log(2)
        next()
        console.log(3)
    )}}

const jwt = require('jsonwebtoken');

function restrict() {
    const authError = {
        errorMessage: "You Shall Not Pass..."
    };

    return async (req, res, next) => {
        try {
            const { token } = req.cookie;
            console.log(token)
            if (!token) {
                return res.status(401).json(authError)
            }
            console.log(1)
            jwt.verify(token, process.env.JWT_KEYCODE, (err) => {
                if (err) {
                    return res.status(401).json(authError)
                }
                console.log(2)
                next()
                console.log(3)
            })
        } catch (e) {
            next(e)
        }
    }
}
