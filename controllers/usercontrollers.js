const { Users, Posts, Category, Comments, Likes } = require("../models");

const authenticate = require("../helpers/encrypt");

class usercontroller {
  static async signIn(req, res) {
    try {
      const { full_name, email, password, role } = req.body;

      if (!full_name || !email || !password || !role) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      let checkEmail = await Users.findOne({
        where: { email },
      });
      if (checkEmail) {
        return res.status(500).json({
          message: "email already i use try with an other email",
        });
      }
      const encryptedPassword = authenticate.hashpassword(password);
      const newusername = authenticate.usenameGenetor(full_name);
      console.log(newusername);

      let user = await Users.create({
        full_name,
        username: newusername,
        email,
        password: encryptedPassword,
        role,
      });

      let token = authenticate.generateToken({
        user_id: user.user_id,
        role: user.role,
      });
      res.status(201).json({
        message: "User created",
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await Users.findOne({
        where: { email },
      });
      console.log(user);

      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      }

      let pass = await authenticate.comparepassword(user.password, password);

      if (!pass) {
        return res.status(404).json({
          message: "invalid email or password",
        });
      }

      let token = await authenticate.generateToken({
        user_id: user.user_id,
        role: user.role,
      });

      res.status(200).json({
        message: "loggin succefully",
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  static profile(req, res) {
    const { username, email, role } = req.currentUser;
    return res.status(200).json({
      message: "profile",
      profile: {
        username,
        email,
        role,
      },
    });
  }
  static async updateProfile(req, res) {
    try {
      const { currentUser } = req;
      const { body } = req;
      await Users.update(
        { ...body },
        { where: { user_id: currentUser.user_id } }
      );
      return res.status(200).json({
        message: "profile updated",
        profile: {
          username: body.username,
          email: body.email,
          role: body.role,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  static async getallusers(req, res) {
    try {
      const users = await Users.findAll({
        include: [
          {
            model: Posts,
            attributes: ["title", "content"],
            include: [
              {
                model: Category,
                attributes: ["category"],
              },
              {
                model: Comments,
                attributes: ["comments", "user_id"],
              },
              {
                model: Likes,
                attributes: ["reaction"],
              },
            ],
          },
        ],
      });
      res.status(200).json({
        message: "users",
        data: {
          users,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = usercontroller;
