const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      errorMessage: 'YOU SHALL NOT PASS'
    })
  }

  jwt.verify(token, process.env.JWT_KEYCODE, (err) => {
    if (err) {
      return res.status(401).json({
        errorMessage: 'YOU SHALL NOT PASS'
      })
    } else  {
    next()
    }
  })
};
