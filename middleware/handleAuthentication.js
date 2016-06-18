
module.exports = function handleAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.json({
      message: 'Authentication required!',
    });
  }
};
