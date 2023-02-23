import User from "../models/users.js"
import Video from "../models/videos.js"
import bcrypt from "bcrypt"

export const updateUser = async (req, res) => {
    if (req.userId === req.params.id) {
        const pass = req.body.password
        const salt = pass && bcrypt.genSaltSync(10);
        const hash = pass && bcrypt.hashSync(pass, salt);
        const { password, ...others } = req.body
        try {
            const updateUser = await User.findByIdAndUpdate(req.userId, { $set: { password: hash, ...others } }, { new: true })
            return res.status(200).json(updateUser)
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json("you can update only your account")
    }
}
export const deleteUser = async (req, res) => {
    if (req.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.userId)
            return res.status(200).json("deleted")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json("you can delete only your account")
    }
}
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const subUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, { $addToSet: { subscribedUsers: req.params.channelId } })
        await User.findByIdAndUpdate(req.params.channelId, { $inc: { subscribers: 1 } })
        return res.status(200).json("sub successful")
    } catch (err) {
        return res.status(500).json(err.message)
    }
}
export const unsubUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, { $pull: { subscribedUsers: req.params.channelId } })
        await User.findByIdAndUpdate(req.params.channelId, { $inc: { subscribers: - 1 } })
        return res.status(200).json("un sub successful")
    } catch (err) {
        return res.status(500).json(err.message)
    }
}
export const likeVideo = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.body.videoId, { $addToSet: { likes: req.userId },  $pull: { dislikes: req.userId } })
        return res.status(200).json("like successful")
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const dislikeVideo = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.body.videoId, { $addToSet: { dislikes: req.userId }, $pull: { likes: req.userId } })
        return res.status(200).json("dislike successful")
    } catch (err) {
        return res.status(500).json(err)
    }
}