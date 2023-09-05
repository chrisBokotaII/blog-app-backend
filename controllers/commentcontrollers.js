const { Comments } = require("../models");

class commentPost {
  static async createComment(req, res) {
    const { content } = req.body;
    const { post_id } = req.params;
    const { user_id } = req.currentUser;
    try {
      const comment = await Comments.create({
        post_id,
        user_id,
        comments: content,
      });
      return res.status(200).json({
        message: "comment created",
        data: comment,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = commentPost;
