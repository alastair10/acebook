/**
 * initiate Express and access the router method
 */
const express = require("express");
const router = express.Router();

// import posts controller (which contains post methods)
const PostsController = require("../controllers/posts");

// router.get("/:post_id", PostsController.Index);

// route equivalent to GET /posts/
router.get("/", PostsController.Index);

// route equivalent to POST /posts/
router.post("/", PostsController.Create);

router.get("/:id", PostsController.Get);

router.patch("/:id", PostsController.Update);



module.exports = router;
