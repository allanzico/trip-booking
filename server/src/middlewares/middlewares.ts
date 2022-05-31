import expressJwt from "express-jwt";
import Experience from "../models/Experience";


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
