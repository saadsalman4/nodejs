const jwt = require("jsonwebtoken");

const teacherAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "saadsalman_teacher", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/teacher/login");
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/teacher/login");
  }
};

function extractUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "saadsalman_teacher", (err, decoded) => {
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

module.exports = { extractUser, teacherAuth };
