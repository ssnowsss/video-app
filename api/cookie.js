import jwt from "jsonwebtoken"

export const cookieCheck = (req, res, next) => {
    const cookie = req.cookies.access
    if(!cookie) return res.status(401).json("Un Authorized")
    jwt.verify(cookie, process.env.ACSESSPASS, (err, user) => {
        if(err) return res.status(404).json("Unvalid cookies")
        req.userId = user.id
        return next()
    })
}