import express from "express"
import { updateUser, deleteUser, getUser, subUser, unsubUser, likeVideo, dislikeVideo } from "../controllers/users.js"
import { cookieCheck } from "../cookie.js"
const router = express.Router()


// updateUser
router.put("/:id", cookieCheck, updateUser)
// deleteUser
router.delete("/:id", cookieCheck, deleteUser)
// getUser
router.get("/find/:id", getUser)
// subUser
router.put("/sub/:channelId",cookieCheck, subUser)
// unsubUser
router.put("/unsub/:channelId",cookieCheck, unsubUser)
// likeVideo
router.put("/like/like",cookieCheck, likeVideo)
// dislikeVideo
router.put("/dislike/dislike",cookieCheck, dislikeVideo)


export default router