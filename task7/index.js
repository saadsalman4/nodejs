const userRoutes = require("./routes/userRoutes.js");
const teacherRoutes = require("./routes/teacherRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");

const routes = [userRoutes, teacherRoutes, courseRoutes];

module.exports = routes;
