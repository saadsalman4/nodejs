const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "saadsalman_admin", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/admin/login");
      } else {
        // console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/admin/login");
  }
};

module.exports = adminAuth;
