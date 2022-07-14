import Experience from "../models/Experience";
import Order from "../models/Order";
import User from "../models/User";

export class OrderClass {
    async createOrder(req: any, res: any) {
        const { expId } = req.body;
        const user = await User.findById(req.user._id).exec();
    
        try {
              //Create new order
             await new Order({
                experience: expId,
                orderedBy: user._id,
              }).save();
              
              await User.findByIdAndUpdate(user._id, {
                $set: { stripeSession: {} },
              });
    
                //Edit tickets
            await Experience.findByIdAndUpdate(expId, {
              $inc: {booked: +1}, 
            }, { new: true })
    
              res.json({ success: true });

        } catch (error: any) {
          console.log(error);
        }
      }
}