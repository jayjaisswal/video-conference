const express = require("express");
const router = express.Router();
const  {userLogin,registerUser } = require("../controllers/UserController")

router.post("/singup", registerUser);
router.post("/login", userLogin);

module.exports = router;
