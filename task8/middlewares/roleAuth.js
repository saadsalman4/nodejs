function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    res.redirect("/");
    return res.status(403).json({ message: "Admin role required" });
  }
  next();
}

function isTeacher(req, res, next) {
  if (req.user.role !== "teacher" && req.user.role !== "admin") {
    res.redirect("/");
    return res.status(403).json({ message: "Admin/Teacher role required" });
  }
  next();
}

function isStudent(req, res, next) {
  if (
    req.user.role !== "teacher" &&
    req.user.role !== "admin" &&
    req.user.role !== "student"
  ) {
    res.redirect("/");
    return res
      .status(403)
      .json({ message: "Admin/Teacher/Student role required" });
  }
  next();
}

module.exports = { isAdmin, isTeacher, isStudent };
