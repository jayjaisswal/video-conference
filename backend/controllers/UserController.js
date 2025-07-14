const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Meeting = require("../models/meetingModel");



exports.userLogin = async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({  // 400 = Bad Request
                message: "Please enter both username and password",
                success: false

            })
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({ // 404 = Not Found
                message: "User not found",
                success: false
                })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ // 401 = Unauthorized
            message: "Invalid password",
            success: false,
        });
        }
        if(isPasswordValid){
            let token  = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            
            return res.status(200).json({ 
                message: "User logged in successfully",
                success: true,
                token: token
            })

        }


    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: `something went wrong ${error.message}`,
            success: false
            })

    }
}

exports.registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({  //409 conflict
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      password: hashedPassword,
      username: username,
    });
    await newUser.save();
    return res.status(201).json({   //201 = Created
      message: "User Registered succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ //// 500 for actual errors
        message: `Something Went Wrong ${error.message}`,
        success: false,
        });
  }
};

exports.getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

exports.addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(200).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
  }