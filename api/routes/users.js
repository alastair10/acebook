/**
 * initiate Express and access the router method
 */
const express = require("express");
const router = express.Router();

// import users controller (which contains user methods)
const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:id", UsersController.Get);
router.patch("/:id", UsersController.Update);

module.exports = router;
