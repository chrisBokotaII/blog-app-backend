const { and } = require("sequelize");
const {
  Posts,
  Users,
  Category,
  Comments,
  Likes,
  sequelize,
} = require("../models");

class PostControllers {
  static async createPost(req, res) {
    const { title, content } = req.body;
    const { user_id } = req.currentUser;
    try {
      const post = await Posts.create({
        title,
        content,
        user_id,
      });
      return res.status(200).json({
        message: "post created",
        data: post,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  static async getallposts(req, res) {
    try {
      const posts = await Posts.findAll({
        include: [
          {
            model: Users,
            attributes: ["username"],
          },
          {
            model: Category,
            attributes: ["category"],
          },
          {
            model: Comments,
            attributes: ["comments", "user_id"],
            include: [
              {
                model: Users,
                attributes: ["username"],
              },
            ],
          },
          {
            model: Likes,
            count: true,
            attributes: ["reaction", "user_id"],
            include: [
              {
                model: Users,
                attributes: ["username"],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        message: "posts",
        data: {
          posts,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  static async getOnePost(req, res) {
    const { post_id } = req.params;
    const post = await Posts.findOne({
      where: { post_id },
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
        {
          model: Category,
          attributes: ["category"],
        },
        {
          model: Comments,
          attributes: ["comments", "user_id", "createdAt"],
          include: [
            {
              model: Users,
              attributes: ["username"],
            },
          ],
        },
        {
          model: Likes,
          count: true,
          attributes: ["reaction", "user_id", "createdAt"],
          include: [
            {
              model: Users,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    // count the numbers of like per reaction
    const like = await Likes.count({
      where: {
        post_id,
        reaction: "like",
      },
    });
    const dislike = await Likes.count({
      where: {
        post_id,
        reaction: "dislike",
      },
    });
    const haha = await Likes.count({
      where: {
        post_id,
        reaction: "haha",
      },
    });
    const wow = await Likes.count({
      where: {
        post_id,
        reaction: "wow",
      },
    });
    const sad = await Likes.count({
      where: {
        post_id,
        reaction: "sad",
      },
    });
    const angry = await Likes.count({
      where: {
        post_id,
        reaction: "angry",
      },
    });
    return res.status(200).json({
      message: "post",
      data: {
        post,
        like,
        dislike,
        haha,
        wow,
        sad,
        angry,
      },
    });
  }

  static async updatePost(req, res) {
    //check if the user is the owner of the post
    const { user_id } = req.currentUser;
    const { post_id } = req.params;
    const { title, content } = req.body;
    try {
      const post = await Posts.findOne({
        where: {
          post_id,
        },
      });
      if (!post) {
        return res.status(404).json({
          message: "post not found",
        });
      }
      if (post.user_id !== user_id) {
        return res.status(403).json({
          message: "forbidden",
        });
      }
      await post.update({
        title,
        content,
      });
      return res.status(200).json({
        message: "post updated",
        data: post,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  static async deletePost(req, res) {
    //check if the user is the owner of the post
    const { user_id } = req.currentUser;
    const { post_id } = req.params;
    try {
      const post = await Posts.findOne({
        where: {
          post_id,
        },
      });
      if (!post) {
        return res.status(404).json({
          message: "post not found",
        });
      }
      if (post.user_id !== user_id) {
        return res.status(403).json({
          message: "forbidden",
        });
      }
      await post.destroy();
      return res.status(200).json({
        message: "post deleted",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = PostControllers;
