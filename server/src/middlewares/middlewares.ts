import expressJwt from "express-jwt";
import Experience from "../models/Experience";
import User from "../models/User";


const tokenSecret = process.env.JWT_SECRET;
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
