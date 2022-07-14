import Experience from "../models/Experience";
import fs from "fs";
import Order from "../models/Order";

export class ExperienceSetup {
  async createExperience(req: any, res: any) {
    const data = req.body;
    try {
      let experience = await new Experience(data);
      experience.postedBy = req.user._id;

      //read Image data
      if (data.image) {
        experience.image.data = fs.readFileSync(data.image.path);
        experience.image.contentType = data.image.type;
      }
      experience.save((error: any, result: any) => {
        if (error) {
          console.log(error);
          res.status(400).send("Error saving");
        }
        res.json(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  }

  async getExperiences(req: any, res: any) {
    try {
      let experiences = await Experience.find({})
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
      res.json(experiences);
    } catch (error) {
      console.log(error);
    }
  }

  async getImages(req: any, res: any) {
    try {
      let experience = await Experience.findById(
        req.params.experienceId
      ).exec();
      if (experience && experience.image && experience.image.data !== null) {
        res.set("Content-Type", experience.image.contentType);

        return res.send(experience.image.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSellerExperiences(req: any, res: any) {
    let all = await Experience.find({ postedBy: req.user._id })
      .select("-image.data")
      .populate("postedBy", "_id name")
      .exec();
    res.send(all);
  }

  async getSingleExperience(req: any, res: any) {
    let experience = await Experience.findById(req.params.expId)
      .populate("postedBy", "_id name")
      .populate({
        path: "reviews",
        populate: {
          path: "reviewedBy",
        },
      })
      .select("-image.data")
      .exec();
    res.json(experience);
  }

  async updateExperience(req: any, res: any) {
    const data = req.body;
    console.log(data);
    try {

      if (data.tickets.length < 1) {
        return res.status(400).json({
          success: false,
          error: "Please add a ticket type",
        });
      } 

      if (data.image) {
        let image: any = { data: "", contentType: "" };
        image.data = fs.readFileSync(data.image.path);
        image.contentType = data.image.type;
        data.image = image;
      }

      let updated = await Experience.findByIdAndUpdate(req.params.expId, data, {
        new: true,
      }).select("-image.data");
      res.json(updated);
    } catch (error) {
      console.log(error);
      res.status(400).send("Update failed");
    }
  }

  async deleteExperience(req: any, res: any) {
    await Experience.findByIdAndDelete(req.params.expId);
  }

  async deleteTicket(req: any, res: any) {
    const { ticketId } = req.body;
    const expId = req.params.expId;
    try {
      await Experience.updateOne(
        { _id: expId },
        { $pull: { tickets: { _id: ticketId } } }
      );
      const newTickets = await Experience.findById(expId)
        .select("tickets -_id")
        .exec();
      res.status(200).send({ success: true, tickets: newTickets });
    } catch (error) {
      console.log(error);
      res.status(400).send(" failed");
    }
  }

  async getUserBookings(req: any, res: any) {
    try {
      const all = await Order.find({ orderedBy: req.user._id })
        .select("session")
        .populate("experience", "-image.data")
        .populate({
          path: "experience",
          populate: {
            path: "postedBy",
          },
        })
        .populate("orderedBy", "_id name")
        .exec();
      res.json(all);
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleBooking(req: any, res: any) {
    try {
      let booking = await Order.findById(req.params.bookingId)
        .select("session")
        .populate("experience", "-image.data")
        .populate({
          path: "experience",
          populate: {
            path: "postedBy",
          },
        })
        .populate("orderedBy", "_id name")
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
      ids.push(userOrders[i].experience.toString());
    }

    res.json({
      ok: ids.includes(expId),
    });
  }

  async searchListings(req: any, res: any) {
    const { location, date } = req.body;
    // const dates = date.split(",");
    // console.log(dates);
    // let result = await Experience.find({
    //   startDate: { $gte: dates[0] },
    //   endDate: { $lte: dates[1] },
    //   location: new RegExp(location, "i"),
    // })
    //   .select("-image.data")
    //   .exec();

    let result = await Experience.find({
      startDate: { $gte: date },
      location: new RegExp(location, "i"),
    })
      .select("-image.data")
      .exec();
    res.json(result);
  }

  async reviewExperience(req: any, res: any) {
    const { rating, comment } = req.fields;

    const experience = await Experience.findById(req.params.expId).select(
      "-image.data"
    );
    try {
      if (experience) {
        const alreadyReviewed = experience.reviews.find(
          (review: any) => review.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Experience already Reviewed");
        }

        const review = {
          rating: Number(rating),
          comment,
          reviewedBy: req.user._id,
        };

        experience.reviews.push(review);
        experience.numReviews = experience.reviews.length;
        experience.rating =
          experience.reviews.reduce(
            (acc: any, item: any) => item.rating + acc,
            0
          ) / experience.reviews.length;

        await experience.save();
        res.status(201).json("Review added");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async favoriteExperience(req: any, res: any) {

    console.log(req.body);

    res.json({ success: true, });
  }


  async createItenerary(req: any, res: any) {
    const itenerary = req.body;
    try {
      const updatedExperience = await Experience.findByIdAndUpdate(req.params.expId, {itenerary: itenerary}, {
        new: true,
      })
      res.status(201).json({ success: true, updatedExperience });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  }
}
