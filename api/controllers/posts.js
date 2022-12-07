const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

/**
 * Actions for Posts
 * Index: ***
 * Create: ***
 */
const PostsController = {
  Index: (req, res) => {
    // use the post schema with find query **What is sent?**
    Post.find({})
      .populate({ path :'user_id', select : 'full_name profile_pic'})
      .exec(async (err, posts) => {
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
  // WIP - update to accommodate comments
  Update: async (req, res) => {
    const data = req.body;
    // the post id
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate({"_id": id}, {$addToSet: { likes: data.likes, comments: data.comments} }, {new: true});
    // TODO: error: if same then post will return the same info
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(202).json({ message: "OK", token: token, post: post });
  },

  // finds a single post
  Get: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ message: "OK", token: token, post: post });
  }
};

module.exports = PostsController;
