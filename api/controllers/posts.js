const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const { post } = require("../routes/posts");

/**
 * Actions for Posts
 * Index: ***
 * Create: ***
 */
const PostsController = {
  Index: (req, res) => {
    // use the post schema with find query **What is sent?**
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      // use token model (imported above from models)
      // create a JWT by passing the request sender's user id
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      // response is successful
      // currently only sends back json object with following details
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    // create a new instance of a post using information from the request
    const post = new Post(req.body);
    // use save method to store on the database
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      // create a JWT by passing the request sender's user id
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      // response is successful created (notice 201)
      // currently only sends back json object with following details
      res.status(201).json({ message: "OK", token: token });
    });
  },

  Update: async (req, res) => {
    const data = req.body;

    const { id } = req.params;
    console.log(Post)
    const post = await Post.findByIdAndUpdate(id, data)
      console.log(post)
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      console.log(res.body)
      res.status(202).json({ message: "OK", token: token, post: post });
    },

    Get: async (req, res) => {
      // const post = new Post(req.body);
  
      const { id } = req.params;
      console.log(Post)
      const post = await Post.findById(id)
        console.log(post)
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        console.log(res.body)
        res.status(202).json({ message: "OK", token: token, post: post });
      }
    // Post.findByIdAndUpdate(id, post, async (err) => {
    //   if (err) {
    //     throw err;
    //   }
    //   const token = await TokenGenerator.jsonwebtoken(req.user_id);
    //   res.status(202).json({ message: "OK", token: token });
    // });
  }

module.exports = PostsController;
