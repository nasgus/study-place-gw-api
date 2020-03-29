module.exports = {
  checkUser(req, res, next) {
    if (req.session.userId) {
      res.setHeader('Authorized', req.session.userId);
      next()
    } else {
      res.sendStatus(401)
    }
  }
};