const { authJwt } = require("../middlewares");

module.exports = function (app) {
  const users = require("../controllers/user.controller");

  app.get("/api/users/all", users.findAllUsers);

  app.post("/api/users/friends/:id", users.addFriend);

  app.get("/api/users/friends", users.findAllFriends);

  app.get("/api/users/:id", users.getUser);

  app.put("/api/users/:id", users.updateUser);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/api/users/all", users.allAccess);
  //app.get("/api/users/user", [authJwt.verifyToken], users.userBoard);
  app.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
  );
};
