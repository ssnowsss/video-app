import express from "express"
import { addVideo,searchVideo,tagsVideo,random,subVideos,trend, updateVideo,viewVideo, deleteVideo, getVideo } from "../controllers/videos.js"
import { cookieCheck } from "../cookie.js"
const router = express.Router()

router.post("/", cookieCheck,addVideo)
router.put("/:id", cookieCheck,updateVideo)
router.delete("/:id", cookieCheck,deleteVideo)
router.get("/find/:id",getVideo)
router.put("/view/:id",viewVideo)
router.get("/random",random)
router.get("/trend",trend)
router.get("/subvideos",cookieCheck,subVideos)
router.get("/search",searchVideo)
router.get("/tags",tagsVideo)


export default router