import Experience from "../models/Experience";
import fs from "fs";
import Order from "../models/Order";
import Favorites from "../models/Favorites";

export class ExperienceSetup {
  async createExperience(req: any, res: any) {
    try {
      let fields = req.fields;
      const ticketFields = JSON.parse(fields.tickets);
      let files = req.files;
      let experience = new Experience(fields);
      experience.postedBy = req.user._id;
      experience.tickets = ticketFields;

      //read Image data
      if (files.image) {
        experience.image.data = fs.readFileSync(files.image.path);
        experience.image.contentType = files.image.type;
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
      // let experiences = await Experience.find({startDate: {$gte: new Date()}})

      let experiences = await Experience.find({})
        .limit(24)
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
    try {
      let fields = req.fields;
      let files = req.files;
      const ticketFields = JSON.parse(fields.tickets);
      let data = { ...fields };
      if (ticketFields.length < 1) {
        return res.status(400).json({
          success: false,
          error: "Please add a ticket type",
        });
      } else {
        data.tickets = ticketFields;
      }

      if (files.image) {
        let image: any = { data: "", contentType: "" };
        image.data = fs.readFileSync(files.image.path);
        image.contentType = files.image.type;
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
    const { experience, favoritedBy } = req.body;
    const favorites = new Favorites({
      experience,
      favoritedBy,
    });

    //Save favorite
    await favorites.save();

    res.json({ success: true, favorites });
  }

  async isAlreadyFavorited(req: any, res: any) {
    const { expId } = req.body;
    const favorites = await Favorites.find({ favoritedBy: req.user._id })
      .select("experience")
      .exec();

    //check if ID exists in orders array
    let ids = [];
    for (let i = 0; i < favorites.length; i++) {
      ids.push(favorites[i].experience.toString());
    }
    res.json({
      ok: ids.includes(expId),
    });
  }

  async getUserFavorites(req: any, res: any) {
    try {
      const favorites = await Favorites.find({ favoritedBy: req.user._id })
        .populate("experience", "-image.data")
        .populate("favoritedBy", "_id name")
        .exec();
      res.json(favorites);
    } catch (error) {
      console.log(error);
    }
  }

  async getFavoriteNumber(req: any, res: any) {
    try {
      const favorites = await Favorites.find({
        experience: req.body.experience,
      }).exec();
      res.json({ success: true, favoriteNumber: favorites.length });
    } catch (error) {
      console.log(error);
    }
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
