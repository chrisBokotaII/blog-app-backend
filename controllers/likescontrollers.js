const { Likes } = require("../models");

class likePost {
  static async likeThispost(req, res) {
    const { post_id } = req.params;
    const { user_id } = req.currentUser;
    const { reaction } = req.body;
    // a user can not like is own post
    if (user_id === post_id) {
      return res.status(400).json({
        message: "you can not like your own post",
      });
    }
    try {
      await Likes.create({ post_id, user_id, reaction });
      return res.status(200).json({
        message: "post liked",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async unlikeThispost(req, res) {
    const { post_id } = req.params;
    const { user_id } = req.currentUser;
    try {
      await Likes.destroy({
        where: {
          post_id,
          user_id,
        },
      });
      return res.status(200).json({
        message: "post unliked",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = likePost;
