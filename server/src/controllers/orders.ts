import EmailSender from "../lib/sendEmail";
import Experience from "../models/Experience";
import Order from "../models/Order";
import User from "../models/User";

export class OrderClass {
  async createOrder(req: any, res: any, next: any) {
    const { experience, cart } = req.body;
    const totalSold = cart.reduce(
      (acc: any, curr: any) => acc + curr.quantity,
      0
    );

    const exp = await Experience.findById(experience)
      .populate("postedBy", "_id firstName lastName")
      .select({})
      .exec();

      // cart.map( async (item: any)  => {
      // const exists = exp.tickets.map((ticket: any) => 
      //  ticket
      // );
      // console.log(exists);
      // })

    const user = await User.findById(req.user._id).exec();
    const email = user?.email;
    const emailSender = new EmailSender();
    const message = `
        <h1> Thank you for your order </h1>
        <p> ${exp?.postedBy?.firstName || undefined} can't wait to see You there! </p>
        `;

    try {
      if (!user) {
        return next(new ErrorResponse("Email could not be sent", 404));
      }
      //Create new order
      await new Order({
        experience,
        cart,
        orderedBy: user._id,
      }).save();

      //send email
      emailSender.sendEmail({
        to: email,
        subject: "Order confirmation",
        text: message,
      });

      // await User.findByIdAndUpdate(user._id, {
      //   $set: { stripeSession: {} },
      // });

      
      //Edit tickets
      await Experience.findByIdAndUpdate(
        experience,
        {
          $inc: { booked: +totalSold },
        },
        { new: true }
      );

      res.json({ success: true });
    } catch (error: any) {
      console.log(error);
    }
  }

  async getUserBookings(req: any, res: any) {
    try {
      const all = await Order.find({ orderedBy: req.user._id })
        .select({})
        .populate("experience")
        .populate({
          path: "experience",
          populate: {
            path: "postedBy",
            select: "_id firstName lastName",
          },
        })
        .populate("orderedBy", "_id firstName lastName")
        .exec();
      res.json(all);
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleBooking(req: any, res: any) {
    try {
      let booking = await Order.findById(req.params.bookingId)
        .select({})
        .populate("experience")
        .populate({
          path: "experience",
          populate: {
            path: "postedBy",
            select: "_id firstName lastName",
          },
        })
        .populate("orderedBy", "_id firstName lastName")
        .exec();
      res.json(booking);
    } catch (error) {}
  }

  async isAlreadyBooked(req: any, res: any) {
    const { expId } = req.params;
    const userOrders = await Order.find({ orderedBy: req.user._id })
      .select("experience")
      .exec();

    //check if ID exists in orders array
    let ids = [];
    for (let i = 0; i < userOrders.length; i++) {
      ids?.push(userOrders[i]?.experience?.toString());
    }

    res.json({
      ok: ids?.includes(expId),
    });
  }
}
