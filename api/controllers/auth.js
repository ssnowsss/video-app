import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const user = await User.find({ name: req.body.name })
        if (user.length !== 0) {
            return res.status(400).json("user already exist")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })
        await newUser.save()
        return res.status(200).json("user has been created")
    } catch (err) {
        return res.status(500).json(err.message)
    }
}
export const login = async (req, res) => {
    try {
        const user = await User.find({ name: req.body.name })
        if (user.length === 0) {
            return res.status(404).json("user not found")
        }
        const result = user[0]
        const ifPassCorrect = await bcrypt.compare(req.body.password, result.password)
        if (!ifPassCorrect) {
            return res.status(403).json("wrong name or password")
        }
        const { password, ...others } = result._doc
        const token = jwt.sign({ id: result._id }, process.env.ACSESSPASS)
        return res.cookie("access", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1739914302000
        }).status(200).json(others)
    } catch (err) {
        new Error(err)
        return res.status(500).json(new Error(err).message)
    }
}
export const googleSign = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            const newUser = new User({ ...req.body, withGoogle: true })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.ACSESSPASS)
            return res.cookie("access", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1739914302000
            }).status(200).json(newUser)
        }
        const token = jwt.sign({ id: user._id }, process.env.ACSESSPASS)
        return res.cookie("access", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1739914302000
        }).status(200).json(user)

    } catch (err) {
        return res.status(500).json(err)
    }
}

export const logout = (req, res) => {
    res.clearCookie("access", {
        secure: true, 
        sameSite: "none"
    }).status(200).json("user has been logged out")
}