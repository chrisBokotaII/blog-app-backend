const { Category } = require("../models");

class categorycontroller {
  static async setCategory(req, res) {
    try {
      const post_id = req.params.post_id;
      const name = req.body.category;
      const postcathegory = await Category.create({
        post_id,
        category: name,
      });
      return res.status(200).json({
        message: "category set",
        data: {
          postcathegory,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = categorycontroller;
