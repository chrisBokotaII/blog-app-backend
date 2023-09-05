const express = require("express");
const Router = express.Router();
const postcontroller = require("../controllers/postcontrollers");
const { checkAuth, retrict } = require("../middlewares/checkAuth");
const categoricontroller = require("../controllers/categorycontrollers");
const commentcontroller = require("../controllers/commentcontrollers");
const likePost = require("../controllers/likescontrollers");
const asynchandler = require("../middlewares/asychandler");
//create posts
Router.post(
  "/post/create",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  postcontroller.createPost
);
//get all posts
Router.get(
  "/post/getall",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  postcontroller.getallposts
);
//get one post
Router.get(
  "/post/:post_id",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  asynchandler(postcontroller.getOnePost)
);
//update post
Router.put(
  "/post/update/:post_id",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  postcontroller.updatePost
);
//delete post
Router.delete(
  "/post/delete/:post_id",
  asynchandler(checkAuth),
  asynchandler(retrict("admin", "user")),
  postcontroller.deletePost
);
//caterorize posts
Router.post(
  "/post/:post_id/category",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  categoricontroller.setCategory
);
//comment on post
Router.post(
  "/post/:post_id/comment",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  commentcontroller.createComment
);
//like and unlike post
Router.post(
  "/post/:post_id/like",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  likePost.likeThispost
);
Router.delete(
  "/post/:post_id/unlike",
  asynchandler(checkAuth),
  asynchandler(retrict("user", "admin")),
  likePost.unlikeThispost
);

module.exports = Router;
