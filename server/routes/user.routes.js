const { authJwt } = require("../middlewares");

module.exports = function (app) {
  const users = require("../controllers/user.controller");

  app.get("/api/users/all", users.findAllUsers);

  app.post("/api/users/:id", users.updateUser);
  app.get("/api/users/friends", users.findAllFriends);
  app.post("/api/users/friends/:id", users.addFriend);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
  );
};
