const authenticate = (req, res, next) => {
  if (!req.session || !req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = authenticate;