const express = require("express");
const router = express.Router();
const  {userLogin,registerUser,addToHistory,getUserHistory } = require("../controllers/UserController")

router.post("/singup", registerUser);
router.post("/login", userLogin);
router.post("/add_to_activity",addToHistory )
router.get("/get_all_activity", getUserHistory)

module.exports = router;
