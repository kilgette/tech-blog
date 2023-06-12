const router = require("express").Router();
const { User, Blog } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      isAuthenticated: req.session.isAuthenticated,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login", { isAuthenticated: req.session.isAuthenticated });
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    let blogs = [];
    console.log(User);
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["name"] }],
    });

    if (blogData.length !== 0) {
      blogs = blogData.map((blog) => blog.get({ plain: true }));
    }

    res.render("dashboard", { blogs, isAuthenticated: req.session.isAuthenticated });

  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  res.render("logout", { isAuthenticated: req.session.isAuthenticated });
});

module.exports = router;