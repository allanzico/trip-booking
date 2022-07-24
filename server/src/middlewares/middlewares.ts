import expressJwt from "express-jwt";
import Experience from "../models/Experience";
import User from "../models/User";
import rateLimit from 'express-rate-limit'

const tokenSecret = process.env?.['JWT_SECRET'];
export const requireSignIn = expressJwt({ secret: <string>tokenSecret, algorithms: ["HS256"] })

export const expOwner = async (req:any, res: any, next: any) => {
    let experience = await Experience.findById(req.params.expId).exec()
    let owner = experience.postedBy._id == req.user._id;
    if (!owner) {
        return res.status(403).send("Unauthorized")
    }
    next()
}

export const authSeller = async (req: any, res: any, next: any) => {
    let user = await User.findById(req.user._id).exec()
    const userRole = user.role
    if (userRole === "seller") {
        next()
    }else {
        return res.status(401).json("Unauthorized")
    }

}

export const apiLimiter = rateLimit(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }
)

export const accountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

