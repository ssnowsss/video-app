import express from "express"
import { addComment, getComments, deleteComment } from "../controllers/comments.js"
import { cookieCheck } from "../cookie.js"
const router = express.Router()

router.post("/", cookieCheck,addComment)
router.get("/:videoId",getComments)
router.delete("/:commentId",cookieCheck,deleteComment)


export default router