import User from "../models/users.js"
import Video from "../models/videos.js"

export const addVideo = async (req, res) => {
    try {
        const newVideo = new Video({ userId: req.userId, ...req.body })
        const dataSaved = await newVideo.save()
        return res.status(200).json(dataSaved)
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const updateVideo = async (req, res) => {

    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).json("video not found")
        if (req.userId === video.userId) {
            const videoUpdated = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            return res.status(200).json(videoUpdated)
        } else {
            return res.status(403).json("you can update only your video")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).json("video not found")
        if (req.userId === video.userId) {
            await Video.findByIdAndDelete(req.params.id)
            return res.status(200).json("video deleted")
        } else {
            return res.status(403).json("you can delete only your video")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        return res.status(200).json(video)
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const viewVideo = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
        return res.status(200).json("viewed")
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const random = async (req, res) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        return res.status(200).json(videos)
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const trend = async (req, res) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        return res.status(200).json(videos)
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const subVideos = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const videos = await Promise.all(user.subscribedUsers.map((cId) => {
            return Video.find({ userId: cId })
        }))
        return res.status(200).json(videos.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
        return res.status(500).json(err)
    }
}
export const searchVideo = async (req, res) => {
    const query = req.query.q
    try {
        const videos= await Video.find({title: {$regex: query, $options: "i"}}).limit(40)
        return res.status(200).json(videos)
    } catch (err) {
        return res.status(500).json(err.message)
    }
}
export const tagsVideo = async (req, res) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({tags: {$in: tags}}).limit(20)
        return res.status(200).json(videos)
    } catch (err) {
        return res.status(500).json(err)
    }
}
