const jwt = require("jsonwebtoken");

const studentAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "saadsalman_student", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/student/login");
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/student/login");
  }
};

function extractUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "saadsalman_student", (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        // console.log("2 -", decoded);

        res.locals.user = decoded;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { extractUser, studentAuth };
