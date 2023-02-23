import Comment from "../models/comments.js"
import Video from "../models/videos.js"

export const addComment = async (req, res) => {
    const newComment = new Comment({
        userId: req.userId, ...req.body
    })
    try {
        await newComment.save()
        return res.status(200).json("comment added successfully")
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        return res.status(200).json(comments)
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        const video = await Video.findById(comment.videoId)
        if (req.userId === comment.userId || req.userId === video.userId) {
            await Comment.findByIdAndDelete(req.params.commentId)
            return res.status(200).json("comment deleted")
        } else {
            return res.status(403).json("you can delete only your comment")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}