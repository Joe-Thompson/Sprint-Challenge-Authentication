const router = require('express').Router();
const helpers = require('./authModel');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res, next) => {
    try {
        const user = req.body;
        res.status(201).json(await helpers.add(user))
    } catch (e) {
        next(e)
    }
});

router.post('/login', async (req, res, next) => {

    const authError = {
        errorMessage: 'Invalid Credentials'
    };

    try {
        const { username, password } = req.body;

        const user = await helpers.findBy({ username }).first();
            if (!user) {
                return res.status(401).json(authError)
            }

        const passwordValid = await compare(password, user.password);
            if (!passwordValid) {
                return res.status(401).json(authError)
            }

        const payload = {
                userId: user.id,
                username: user.username
        };

        const token = jwt.sign(payload, process.env.JWT_KEYCODE);
            res.cookie('token', token);

        res.json({
            message: `Welcome to Dad Jokes ${user.username}`
        })

    } catch (e) {
        next(e)
    }
});

module.exports = router;
