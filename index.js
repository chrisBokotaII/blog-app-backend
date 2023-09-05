const express = require("express");
const { sequelize } = require("./models");
const users_routes = require("./routes/user_routes");
const posts_routes = require("./routes/post_routes");
const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/auth", users_routes);

app.use("/api/auth", posts_routes);

app.get("*", (req, res) => {
  res.status(404).send("bad request");
});

app.listen(port, async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(`Server running on port ${port}`);
});
