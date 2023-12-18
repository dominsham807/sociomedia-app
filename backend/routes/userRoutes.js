import express from "express"
import path from "path"
import { acceptRequest, changePassword, friendRequest, getFriendRequest, getUser, profileViews, requestPasswordReset, resetPassword, sentFriendRequest, suggestedFriends, updateUser, verifyEmail } from "../controllers/userController.js"
import userAuth from "../middlewares/authMiddleware.js"

const router = express.Router()
const __dirname = path.resolve(path.dirname(""))
console.log(__dirname)

// Email Verification
router.get("/verify/:userId/:token", verifyEmail)

//Password Reset
router.post("/request-password/reset", requestPasswordReset)
router.get("/reset-password/:userId/:token", resetPassword)
router.post("/reset-password", changePassword)

router.post("/get-user/:id?", userAuth, getUser)
router.put("/update-user", userAuth, updateUser)

//Friend Request
router.post("/friend-request", userAuth, friendRequest)
router.get("/sent-friend-request", userAuth, sentFriendRequest)
router.post("/get-friend-request", userAuth, getFriendRequest)

//Accept or Deny Friend Request
router.post("/accept-request", userAuth, acceptRequest)

//View Profile
router.post("/profile-view", userAuth, profileViews)

//Suggested Friends
router.post("/suggested-friends", userAuth, suggestedFriends)

router.get("/verified", (req,res) => { 
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
})

router.get("/resetpassword", (req,res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})

export default router